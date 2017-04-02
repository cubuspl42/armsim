import Instruction.*
import Condition.*

class VmException(s: String) : Throwable(s)

class InstructionDecoder(private val handlers: List<Pair<Instruction, (Int) -> Unit>>) {
    fun decode(instruction: Int) {
        val handler = handlers.firstOrNull { (inst, _) ->
            (instruction and inst.andMask) == inst.eqMask
        }?.second ?: throw VmException("Unrecognized instruction")
        handler(instruction)
    }
}

fun decodeComponent(inst: Int, bits: IntRange): Int {
    val len = bits.last - bits.first + 1
    val mask = (1 shl len) - 1
    return (inst shr bits.first) and mask
}

data class Cpsr(
        var n: Int, // negative
        var z: Int, // zero
        var c: Int, // carry
        var v: Int // overflow
)

fun Int.bit(index: Int): Int {
    val mask = 1 shl index
    return if ((this and mask) != 0) 1 else 0
}

fun Long.bit(index: Int): Int {
    val mask = 1L shl index
    return if ((this and mask) != 0L) 1 else 0
}


fun willAdditionOverflow(left: Int, right: Int): Boolean {
    if (right < 0 && right != Int.MIN_VALUE) {
        return willSubtractionOverflow(left, -right)
    } else {
        return (left xor right).inv() and (left xor left + right) < 0
    }
}

fun willSubtractionOverflow(left: Int, right: Int): Boolean {
    if (right < 0) {
        return willAdditionOverflow(left, -right)
    } else {
        return left xor right and (left xor left - right) < 0
    }
}

fun signExtend(i24: Int): Int {
    return (i24 shl 8) shr 8
}

class Vm(private val program: Program) {
    private val r = (0..15).map { 0 }.toMutableList()

    private var cpsr_r = Cpsr(0, 0, 0, 0)

    var ip = 0 // FIXME: r15
        private set

    private fun printRegisters() {
        println(r
                .mapIndexed { i, data -> "r$i = $data" }
                .joinToString(" / "))
    }

    private fun conditionPassed(cond: Int): Boolean {
        return when (cond) {
            AL.opcode -> true
            EQ.opcode -> cpsr_r.z == 1
            NE.opcode -> cpsr_r.z == 0
            LT.opcode -> cpsr_r.n != cpsr_r.v
            GT.opcode -> cpsr_r.z == 0 && cpsr_r.n == cpsr_r.v
            else -> throw VmException("cond")
        }
    }

    fun add(inst: Int) {
        val cond = decodeComponent(inst, condBits)
        if (conditionPassed(cond)) {
            val rd = decodeComponent(inst, rdBits)
            val rn = decodeComponent(inst, rnBits)
            val rm = decodeComponent(inst, rmBits)
            val s = decodeComponent(inst, sBit)

            val lhs = r[rn]
            val rhs = r[rm]
            val resultLong = lhs.toLong() + rhs.toLong()

            println(">> ADD r$rd, r$rn, r$rm")
            r[rd] = lhs + rhs

            if (s == 1) {
                cpsr_r.n = if (r[rd] < 0) 1 else 0
                cpsr_r.z = if (r[rd] == 0) 1 else 0
                cpsr_r.c = resultLong.bit(32)
                cpsr_r.v = if (willAdditionOverflow(lhs, rhs)) 1 else 0
            }
        }
    }

    fun and(inst: Int) {
        val cond = decodeComponent(inst, condBits)
        if (conditionPassed(cond)) {
            val rd = decodeComponent(inst, rdBits)
            val rn = decodeComponent(inst, rnBits)
            val rm = decodeComponent(inst, rmBits)
            val s = decodeComponent(inst, sBit)

            val lhs = r[rn]
            val rhs = r[rm]

            println(">> AND r$rd, r$rn, r$rm")
            r[rd] = lhs and rhs

            if (s == 1) {
                cpsr_r.n = if (r[rd] < 0) 1 else 0
                cpsr_r.z = if (r[rd] == 0) 1 else 0
                cpsr_r.c = 0 // FIXME
            }
        }
    }

    fun b(inst: Int) {
        val cond = decodeComponent(inst, condBits)
        if (conditionPassed(cond)) {
            val signedImmed24 = decodeComponent(inst, signedImmed24Bits)
            val deltaPc = signExtend(signedImmed24) shl 2
            val deltaIp = deltaPc / 4 // FIXME: PC/r15

            println(">> B $deltaPc")

            ip += deltaIp
            --ip // FIXME
        }
    }

    fun mov(inst: Int) {
        val rd = decodeComponent(inst, rdBits)
        val immed8 = decodeComponent(inst, immed8Bits)

        println(">> MOV r$rd, #$immed8")
        r[rd] = immed8
    }

    fun sub(inst: Int) {
        val rd = decodeComponent(inst, rdBits)
        val rn = decodeComponent(inst, rnBits)
        val i = decodeComponent(inst, iBit)
        val rm = decodeComponent(inst, rmBits)
        val immed8 = decodeComponent(inst, immed8Bits)
        val s = decodeComponent(inst, sBit)

        val lhs = r[rn]
        val rhs = if (i > 0) immed8 else r[rm]

        if (i > 0) println(">> SUB r$rd, r$rn, #$immed8")
        else println(">> SUB r$rd, r$rn, r$rm")

        r[rd] = lhs - rhs

        if (s == 1) {
            cpsr_r.n = if (r[rd] < 0) 1 else 0
            cpsr_r.z = if (r[rd] == 0) 1 else 0
            cpsr_r.c = 0 // FIXME
            cpsr_r.v = if (willSubtractionOverflow(lhs, rhs)) 1 else 0
        }
    }

    private val decoder = InstructionDecoder(listOf(
            ADD to this::add,
            AND to this::and,
            B to this::b,
            MOV to this::mov,
            SUB to this::sub
    ))

    fun step() {
        val inst = program.instructions[ip++]
        decoder.decode(inst)
        printRegisters()
    }

    fun getRegisterValue(index: Int): Int {
        return r[index]
    }

    val cpsr: Cpsr
        get() = cpsr_r.copy()
}
