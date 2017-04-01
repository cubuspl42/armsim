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

val mnemonics = listOf(
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

val MASK1 = 0b00001101111000000000000000000000

val ADC_MASK = MASK1
val ADC_PATTERN = 0b00000000101000000000000000000000

val ADD_MASK = MASK1
val ADD_PATTERN = 0b00000000100000000000000000000000

val AND_MASK = MASK1

val B_MASK = 0b00001110000000000000000000000000

val MOV_MASK = MASK1
val MOV_PATTERN = 0b00000001101000000000000000000000
