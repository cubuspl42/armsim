class InstructionEncoder(pattern: Int) {
    private var instruction: Int = pattern

    private fun encodeData(
            offset: Int, @Suppress("UNUSED_PARAMETER") length: Int, data: Int
    ): InstructionEncoder {
        instruction = instruction or (data shl offset)
        return this
    }

    fun encode() = instruction

    fun cond(data: Int) = encodeData(28, 4, data)

    fun i(data: Int) = encodeData(25, 1, data)

    fun immediate(rotateImm: Int, immed: Int) =
            encodeData(8, 4, rotateImm).encodeData(0, 8, immed)

    fun immediateShift(shiftImm: Int, shift: Int, rm: Int) =
            encodeData(7, 5, shiftImm)
                    .encodeData(5, 2, shift)
                    .encodeData(0, 4, rm)

    fun registerShift(rs: Int, shift: Int, rm: Int) =
            encodeData(8, 4, rs)
                    .encodeData(5, 2, shift)
                    .encodeData(0, 4, rm)

    fun rd(data: Int) = encodeData(12, 4, data)

    fun s(data: Int) = encodeData(20, 1, data)
}
