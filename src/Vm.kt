import Instruction.*
import Condition.*

class VmException(s: String) : Throwable(s)

class InstructionDecoder(private val handlers: List<Pair<Mask, (Int) -> Unit>>) {
    fun decode(instruction: Int) {
        val handler = handlers.firstOrNull { (mask, _) ->
            ((instruction and mask.andMask) xor mask.xorMask) == 0
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

private fun op(opcode: Int, rnData: Int, shifterOperand: Int): Int {
    return when (opcode) {
        MOV.opcode -> shifterOperand
        ADD.opcode -> rnData + shifterOperand
        AND.opcode -> rnData and shifterOperand
        SUB.opcode -> rnData - shifterOperand
        else -> throw VmException("opcode")
    } // FIXME: rest
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

    fun execDataProcessingImmediateShiftInstruction(inst: Int) {
        val cond = decodeComponent(inst, condBits)
        if (conditionPassed(cond)) {
            val opcode = decodeComponent(inst, opcodeBits)
            val s = decodeComponent(inst, sBit)
            val rn = decodeComponent(inst, rnBits)
            val rd = decodeComponent(inst, rdBits)
            val shiftImm = decodeComponent(inst, shiftImmBits)
            val shift = decodeComponent(inst, shiftBits)
            val rm = decodeComponent(inst, rmBits)

            val shifterOperand = when (shift) {
                ShiftOperator.LSL.opcode -> r[rm] shl shiftImm
                ShiftOperator.ASR.opcode -> r[rm] shr shiftImm
                else -> throw VmException("shift")
            } // FIXME: rest

            val shifterCarryOut = r[rm].bit(32 - shiftImm)

            r[rd] = op(opcode, r[rn], shifterOperand)

            if (s == 1) {
                cpsr_r.n = r[rd].bit(31)
                cpsr_r.z = if (r[rd] == 0) 1 else 0
                cpsr_r.c = shifterCarryOut
                // V Flag = unaffected
            }
        }
    }

    fun execDataProcessingImmediateInstruction(inst: Int) {
        val cond = decodeComponent(inst, condBits)
        if (conditionPassed(cond)) {
            val opcode = decodeComponent(inst, opcodeBits)
            val s = decodeComponent(inst, sBit)
            val rn = decodeComponent(inst, rnBits)
            val rd = decodeComponent(inst, rdBits)
            val rotateImm = decodeComponent(inst, rotateImmBits)
            val immed8 = decodeComponent(inst, immed8Bits)

            val shifterOperand = immed8 shr (rotateImm * 2)
            val shifterCarryOut = if (rotateImm == 0) cpsr_r.c else shifterOperand.bit(31)

            r[rd] = op(opcode, r[rn], shifterOperand)

            if (s == 1) {
                cpsr_r.n = r[rd].bit(31)
                cpsr_r.z = if (r[rd] == 0) 1 else 0
                cpsr_r.c = shifterCarryOut
                // V Flag = unaffected
            }
        }
    }

    fun execBranchInstruction(inst: Int) {
        val cond = decodeComponent(inst, condBits)
        if (conditionPassed(cond)) {
            // FIXME: L
            val signedImmed24 = decodeComponent(inst, signedImmed24Bits)

            val deltaPc = signExtend(signedImmed24) shl 2
            val deltaIp = deltaPc / 4 // FIXME: PC/r15

            ip += deltaIp
            --ip // FIXME
        }
    }

    private val decoder = InstructionDecoder(listOf(
            dataProcessingImmediateShiftMask to this::execDataProcessingImmediateShiftInstruction,
            dataProcessingImmediateMask to this::execDataProcessingImmediateInstruction,
            branchMask to this::execBranchInstruction
    ))

    fun step() {
        val inst = program.instructions[ip++]
        decoder.decode(inst)
        printRegisters()
    }

    fun run() {
        while (ip in program.instructions.indices) {
            step()
        }
    }

    fun getRegisterValue(index: Int): Int {
        return r[index]
    }

    val cpsr: Cpsr
        get() = cpsr_r.copy()
}
