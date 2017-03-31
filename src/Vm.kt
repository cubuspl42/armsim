data class InstructionPattern(val mask: Int, val pattern: Int, val function: (Int) -> Unit)

class InstructionDecoder(private val instructionPatterns: List<InstructionPattern>) {
    fun decode(instruction: Int) {
        val function = instructionPatterns.first {
            (instruction and it.mask) == it.pattern
        }.function
        function(instruction)
    }
}

class Vm(private val program: Program) {
    private val registers = (0..15).map { 0 }.toMutableList()

    private var ip = 0

    fun add(instruction: Int) {
        println("ADD")
    }

    fun mov(instruction: Int) {
        println("MOV")
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
