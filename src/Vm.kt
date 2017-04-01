class InstructionDecoder(private val handlers: List<Pair<InstructionMask, (Int) -> Unit>>) {
    fun decode(instruction: Int) {
        val handler = handlers.first { (mask, _) ->
            (instruction and mask.andMask) == mask.eqMask
        }.second
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

    private val decoder = InstructionDecoder(listOf(
            addMask to this::add,
            movMask to this::mov
    ))

    fun step() {
        val inst = program.instructions[ip++]
        decoder.decode(inst)
        printRegisters()
    }
}
