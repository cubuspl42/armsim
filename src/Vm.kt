data class InstructionPattern(val mask: Int, val pattern: Int, val function: (Int) -> Unit)

class InstructionDecoder(private val instructionPatterns: List<InstructionPattern>) {
    fun decode(instruction: Int) {
        val function = instructionPatterns.first {
            (instruction and it.mask) == it.pattern
        }.function
        function(instruction)
    }
}

fun decodeComponent(inst: Int, bits: IntRange): Int {
    val len = bits.last - bits.first + 1
    val mask = (1 shl len) - 1
    return (inst shr bits.first) and mask
}

class Vm(private val program: Program) {
    private val r = (0..15).map { 0 }.toMutableList()

    private var ip = 0

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
        printRegisters()
    }

    fun mov(inst: Int) {
        val rd = decodeComponent(inst, rdBits)
        val immed8 = decodeComponent(inst, immed8Bits)

        println(">> MOV r$rd, #$immed8")
        r[rd] = immed8
        printRegisters()
    }

    private val decoder = InstructionDecoder(listOf(
            InstructionPattern(ADD_MASK, ADD_PATTERN, this::add),
            InstructionPattern(MOV_MASK, MOV_PATTERN, this::mov)
    ))

    fun step() {
        val inst = program.instructions[ip++]
        decoder.decode(inst)
    }
}
