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

fun notC(c: Int)  = if(c == 1) 0 else 1

data class AluOut(val result: Int, val c: Int, val v: Int)

class Vm(private val program: Program) {
    private val r = (0..15).map { 0 }.toMutableList()

    var cpsr = Cpsr(0, 0, 0, 0)

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
            EQ.opcode -> cpsr.z == 1
            NE.opcode -> cpsr.z == 0
            LT.opcode -> cpsr.n != cpsr.v
            GT.opcode -> cpsr.z == 0 && cpsr.n == cpsr.v
            else -> throw VmException("cond")
        }
    }

    private fun alu(
            opcode: Int, lhs: Int, rhs: Int, shifterCarryOut: Int
    ): AluOut = when (opcode) {
        MOV.opcode -> AluOut(rhs, c = shifterCarryOut, v = cpsr.v)
        MVN.opcode -> AluOut(rhs.inv(), c = shifterCarryOut, v = cpsr.v)
        ADD.opcode -> AluOut(lhs + rhs, c = 0, v = 0) // FIXME: c, v
        ADC.opcode -> AluOut(lhs + rhs + cpsr.c, c = 0, v = 0) // FIXME: c, v
        AND.opcode -> AluOut(lhs and rhs, c = 0, v = 0) // FIXME: c, v
        BIC.opcode -> AluOut(lhs and rhs.inv(), c = 0, v = 0) // FIXME: c, v
        CMN.opcode -> AluOut(lhs + rhs + cpsr.c, c = 0, v = 0) // FIXME: c, v
        CMP.opcode -> AluOut(lhs - rhs, c = 0, v = 0) // FIXME: c, v
        EOR.opcode -> AluOut(lhs xor rhs, c = 0, v = 0) // FIXME: c, v
        ORR.opcode -> AluOut(lhs or rhs, c = 0, v = 0) // FIXME: c, v
        RSB.opcode -> AluOut(rhs - lhs, c = 0, v = 0) // FIXME: c, v
        SBC.opcode -> AluOut(lhs - rhs - notC(cpsr.c), c = 0, v = 0)
        SUB.opcode -> AluOut(lhs - rhs, c = 0, v = 0) // FIXME: c, v
        TEQ.opcode -> AluOut(lhs xor rhs, c = 0, v = 0) // FIXME: c, v
        TST.opcode -> AluOut(lhs and rhs, c = 0, v = 0) // FIXME: c, v
        else -> throw VmException("opcode")
    }

    fun execDataProcessingOp(inst: Int, shifterOperand: Int, shifterCarryOut: Int) {
        val opcode = decodeComponent(inst, opcodeBits)
        val s = decodeComponent(inst, sBit)
        val rn = decodeComponent(inst, rnBits)
        val rd = decodeComponent(inst, rdBits)

        val (aluOut, c, v) = alu(opcode, r[rn], shifterOperand, shifterCarryOut)

        if (opcode !in TST.opcode..CMN.opcode) {
            r[rd] = aluOut
        }

        if (s == 1) {
            cpsr.n = aluOut.bit(31)
            cpsr.z = if (aluOut == 0) 1 else 0
            cpsr.c = c
            cpsr.v = v
        }
    }

    fun execDataProcessingImmediateShiftInstruction(inst: Int) {
        val cond = decodeComponent(inst, condBits)
        if (conditionPassed(cond)) {
            val shiftImm = decodeComponent(inst, shiftImmBits)
            val shift = decodeComponent(inst, shiftBits)
            val rm = decodeComponent(inst, rmBits)

            val shifterOperand = when (shift) {
                ShiftOperator.LSL.opcode -> r[rm] shl shiftImm
                ShiftOperator.ASR.opcode -> r[rm] shr shiftImm
                else -> throw VmException("shift")
            } // FIXME: rest

            val shifterCarryOut = r[rm].bit(32 - shiftImm)

            execDataProcessingOp(inst, shifterOperand, shifterCarryOut)
        }
    }

    fun execDataProcessingImmediateInstruction(inst: Int) {
        val cond = decodeComponent(inst, condBits)
        if (conditionPassed(cond)) {
            val rotateImm = decodeComponent(inst, rotateImmBits)
            val immed8 = decodeComponent(inst, immed8Bits)

            val shifterOperand = immed8 shr (rotateImm * 2)
            val shifterCarryOut = if (rotateImm == 0) cpsr.c else shifterOperand.bit(31)

            execDataProcessingOp(inst, shifterOperand, shifterCarryOut)
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

    fun setRegisterValue(index: Int, data: Int) {
        r[index] = data
    }
}
