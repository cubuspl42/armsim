val condBits = 28..31
val iBit = 25..25
val immed8Bits = 0..7
val rotateImmBits = 8..11
val rdBits = 12..15
val rmBits = 0..3
val rnBits = 16..19
val sBit = 20..20
val shiftImmBits = 7..11
val shiftBits = 5..6
val shifterOperandBits = 0..11

val mnemonics = listOf(// FIXME: sync with Isa
        "ADC",
        "ADD",
        "AND",
        "B",
        "BL",
        "BNE",
        "MOV",
        "SUB",
        "SUBS"
)

enum class Instruction(
        val andMask: Int,
        val eqMask: Int,
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
            cond = true, s = true
    ),
    AND(
            0b00001101111000000000000000000000,
            0b00000000000000000000000000000000,
            cond = true, s = true
    ),
    B(
            0b00001110000000000000000000000000,
            0b00001010000000000000000000000000,
            l = true
    ),
    MOV(
            0b00001101111000000000000000000000,
            0b00000001101000000000000000000000,
            cond = true, s = true
    ),
    SUB(
            0b00001101111000000000000000000000,
            0b00000000010000000000000000000000,
            cond = true, s = true
    )
}
