import InstructionCategory.*

val wordSize = 4

val bit4 = 4..4
val bit7 = 7..7

val bBit = 22..22
val condBits = 28..31
val iBit = 25..25
val immed8Bits = 0..7
val lBit20 = 20..20
val lBit24 = 24..24
val offset12Bits = 0..11
val opcodeBits = 21..24
val pBit = 24..24
val prefixBits = 26..27
val rotateImmBits = 8..11
val rdBits = 12..15
val rmBits = 0..3
val rnBits = 16..19
val sBit = 20..20
val shiftImmBits = 7..11
val shiftBits = 5..6
val shifterOperandBits = 0..11
val signedImmed24Bits = 0..23
val uBit = 23..23
val wBit = 21..21

data class Mask(val andMask: Int, val xorMask: Int) {
    fun toMInt(): MInt = MInt(andMask, xorMask)
}

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

val loadAndStoreMask = Mask(
        0b00001100010000000000000000000000,
        0b00000100000000000000000000000000
)

enum class InstructionCategory {
    BRANCH,
    DATA_PROCESSING,
    LOAD_AND_STORE
}

enum class Instruction(
        val category: InstructionCategory,
        val opcode: Int = -1,
        val args: Int = -1
) {
    B(category = BRANCH),
    ADC(category = DATA_PROCESSING, opcode = 0b0101, args = 3),
    ADD(category = DATA_PROCESSING, opcode = 0b0100, args = 3),
    AND(category = DATA_PROCESSING, opcode = 0b0000, args = 3),
    BIC(category = DATA_PROCESSING, opcode = 0b1110, args = 3),
    CMN(category = DATA_PROCESSING, opcode = 0b1011, args = 2),
    CMP(category = DATA_PROCESSING, opcode = 0b1010, args = 2),
    EOR(category = DATA_PROCESSING, opcode = 0b0001, args = 3),
    MOV(category = DATA_PROCESSING, opcode = 0b1101, args = 2),
    MVN(category = DATA_PROCESSING, opcode = 0b1111, args = 2),
    ORR(category = DATA_PROCESSING, opcode = 0b1100, args = 3),
    RSB(category = DATA_PROCESSING, opcode = 0b0011, args = 3),
    RSC(category = DATA_PROCESSING, opcode = 0b0111, args = 3),
    SBC(category = DATA_PROCESSING, opcode = 0b0110, args = 3),
    SUB(category = DATA_PROCESSING, opcode = 0b0010, args = 3),
    TEQ(category = DATA_PROCESSING, opcode = 0b1001, args = 2),
    TST(category = DATA_PROCESSING, opcode = 0b1000, args = 2),
    LDR(category = LOAD_AND_STORE),
    STR(category = LOAD_AND_STORE)
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

val mnemonics: Map<String, Pair<Instruction, InstructionCaps>> = Instruction.values().flatMap { inst ->
    val condList = listOf(null) + Condition.values().toList()

    val combinations: List<Pair<String, Pair<Instruction, InstructionCaps>>> = when (inst.category) {
        BRANCH -> {
            val lList = listOf(false, true)

            lList.combine(condList).map { (l, cond) ->
                val lInfix = if (l) "L" else ""
                val condPostfix = cond?.name ?: ""
                val fullMnemonic = inst.name + lInfix + condPostfix
                fullMnemonic to Pair(inst, InstructionCaps(cond, s = false))
            }
        }
        DATA_PROCESSING -> {
            val sList = listOf(false, true)

            condList.combine(sList).map { (cond, s) ->
                val condInfix = cond?.name ?: ""
                val sPostfix = if (s) "S" else ""
                val fullMnemonic = inst.name + condInfix + sPostfix
                fullMnemonic to Pair(inst, InstructionCaps(cond, s))
            }
        }
        LOAD_AND_STORE -> listOf(inst.name to Pair(inst, InstructionCaps(null, s = false)))
    }
    combinations
}.toMap()

enum class ShiftOperator(val opcode: Int) {
    LSL(0b00),
    LSR(0b01),
    ASR(0b10),
    ROR(0b11),
    RRX(0b11) // Encoding: ROR #0
}

val shiftOperators = ShiftOperator.values().map { it.name }
