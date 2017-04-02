import Instruction.*

class InstructionDecoder(private val handlers: List<Pair<Instruction, (Int) -> Unit>>) {
    fun decode(instruction: Int) {
        val handler = handlers.firstOrNull { (inst, _) ->
            (instruction and inst.andMask) == inst.eqMask
        }?.second ?: throw Exception("Unrecognized instruction")
        handler(instruction)
    }
}

fun decodeComponent(inst: Int, bits: IntRange): Int {
    val len = bits.last - bits.first + 1
    val mask = (1 shl len) - 1
    return (inst shr bits.first) and mask
}

class Vm(private val program: Program) {
    private val r = (0..15).map { 0 }.toMutableList()

    private var ip = 0 // FIXME: r15

    private fun printRegisters() {
        println(r
                .mapIndexed { i, data -> "r$i = $data" }
                .joinToString(" / "))
    }

    fun add(inst: Int) {
        val rd = decodeComponent(inst, rdBits)
        val rn = decodeComponent(inst, rnBits)
        val rm = decodeComponent(inst, rmBits)

        println(">> ADD r$rd, r$rn, r$rm")
        r[rd] = r[rn] + r[rm]
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
        val shifterOperand = if(i > 0) immed8 else r[rm]

        if(i > 0) println(">> SUB r$rd, r$rn, #$immed8")
        else println(">> SUB r$rd, r$rn, r$rm")

        r[rd] = r[rn] - shifterOperand
    }

    private val decoder = InstructionDecoder(listOf(
            ADD to this::add,
            MOV to this::mov,
            SUB to this::sub
    ))

    fun step() {
        val inst = program.instructions[ip++]
        decoder.decode(inst)
        printRegisters()
    }
}
