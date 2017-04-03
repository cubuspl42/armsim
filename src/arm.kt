val wordSize = 4

val condBits = 28..31
val iBit = 25..25
val immed8Bits = 0..7
val opcodeBits = 21..24
val rotateImmBits = 8..11
val rdBits = 12..15
val rmBits = 0..3
val rnBits = 16..19
val sBit = 20..20
val shiftImmBits = 7..11
val shiftBits = 5..6
val shifterOperandBits = 0..11
val signedImmed24Bits = 0..23

data class Mask(val andMask: Int, val xorMask: Int)

val dataProcessingImmediateShiftMask = Mask(
        0b00001110000000000000000000010000,
        0b00000000000000000000000000000000
)

val dataProcessingRegisterShiftMask = Mask(
        0b00001110000000000000000010010000,
        0b00000000000000000000000000010000
)

val dataProcessingImmediateMask = Mask(
        0b00001110000000000000000000000000,
        0b00000010000000000000000000000000
)

val branchMask = Mask(
        0b00001110000000000000000000000000,
        0b00001010000000000000000000000000
)

enum class Instruction(
        val andMask: Int,
        val eqMask: Int,
        val opcode: Int = -1,
        val l: Boolean = false,
        val cond: Boolean = false,
        val s: Boolean = false
) {
    ADC(
            0b00001101111000000000000000000000,
            0b00000000101000000000000000000000,
            cond = true, s = true
    ),
    ADD(
            0b00001101111000000000000000000000,
            0b00000000100000000000000000000000,
            opcode = 0b0100,
            cond = true, s = true
    ),
    AND(
            0b00001101111000000000000000000000,
            0b00000000000000000000000000000000,
            opcode = 0b0000,
            cond = true, s = true
    ),
    B(
            0b00001110000000000000000000000000,
            0b00001010000000000000000000000000,
            l = true, cond = true
    ),
    MOV(
            0b00001101111000000000000000000000,
            0b00000001101000000000000000000000,
            opcode = 0b1101,
            cond = true, s = true
    ),
    SUB(
            0b00001101111000000000000000000000,
            0b00000000010000000000000000000000,
            opcode = 0b0010,
            cond = true, s = true
    )
}

enum class Condition(
        val opcode: Int
) {
    EQ(0b0000),
    NE(0b0001),
    LT(0b1011),
    GT(0b1100),
    AL(0b1110)
}

val mnemonics = Instruction.values().flatMap { inst ->
    val condList = if (inst.cond) {
        listOf(null) + Condition.values().toList()
    } else listOf(null)

    val sList = if (inst.s) listOf(false, true) else listOf(false)

    condList.combine(sList).map { (cond, s) ->
        val condInfix = cond?.name ?: ""
        val sPostfix = if (s) "S" else ""
        val fullMnemonic = inst.name + condInfix + sPostfix
        fullMnemonic to Pair(inst, InstructionCaps(cond, s))
    }
}.toMap()

enum class ShiftOperator(val opcode: Int) {
    LSL(0b00),
    LSR(0b01),
    ASR(0b10),
    ROR(0b11),
    RRX(0b11) // Encoding: ROR #0
}

val shiftOperators = ShiftOperator.values().map { it.name }
