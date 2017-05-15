import InstructionCategory.*

data class Program(val instructions: List<Int>)

class AssemblerException(s: String) : Throwable(s)

private fun maskFromRange(bits: IntRange): Int {
    val offset = bits.first
    val len = bits.last - bits.first + 1
    val mask = ((1 shl len) - 1) shl offset
    return mask
}

/***
 * Masked Integer
 */
data class MInt(val mask: Int = 0, val value: Int = 0) {
    init {
        if (value and mask.inv() != 0)
            throw AssemblerException("Mask $mask does not cover $value")
    }

    infix fun or(mInt: MInt): MInt {
        if (mask and mInt.mask != 0)
            throw AssemblerException("Mask $mask overlaps ${mInt.mask}")
        return MInt(mask or mInt.mask, value or mInt.value)
    }
}

fun Int.trim(nBits: Int): Int {
    return this and ((1 shl nBits) - 1)
}

private fun encodeComponent(inst: MInt, bits: IntRange, value: Int): MInt {
    val offset = bits.first
    val mask = maskFromRange(bits)
    return inst or MInt(mask, value shl offset)
}

fun encodeData(components: List<Pair<IntRange, Int>>): MInt {
    return components.foldRight(MInt(), { p, acc ->
        val (bits, data) = p
        encodeComponent(acc, bits, data)
    })
}

fun encodeData(vararg components: Pair<IntRange, Int>): MInt =
        encodeData(components.toList())

fun encodeCond(cond: Condition?): MInt =
        encodeData(condBits to (cond?.opcode ?: Condition.AL.opcode))

fun encodePrefix(prefix: Int) =
        encodeData(prefixBits to prefix)

fun encodeSbz(rnBits: IntRange): MInt =
        encodeData(rnBits to 0)

fun encodeInstruction(mask: Mask, components: List<Pair<IntRange, Int>>): MInt {
    return mask.toMInt() or encodeData(components)
}

inline fun <reified TExprAst> castExpr(node: ExprAst): TExprAst {
    if (node is TExprAst) {
        return node
    } else throw AssemblerException("Expected ${TExprAst::class.simpleName}, got ${node::class.simpleName}")
}

fun encodeRegisterIndex(rBits: IntRange, r: RegisterAst): MInt {
    if (r.index !in 0..15) throw AssemblerException("r.index")
    return encodeData(listOf(rBits to r.index))
}

fun encodeRegister(rBits: IntRange, r: RegisterAst): MInt {
    // if(r.sign != null) throw
    return encodeRegisterIndex(rBits, r)
}

fun encodeRegisterOpt(rBits: IntRange, r: RegisterAst?): MInt =
        r?.let { encodeRegister(rBits, it) } ?: MInt()

private fun encodeRegisters(
        rd: RegisterAst? = null,
        rn: RegisterAst? = null,
        rm: RegisterAst? = null
): MInt {
    return encodeRegisterOpt(rdBits, rd) or
            encodeRegisterOpt(rnBits, rn) or
            encodeRegisterOpt(rmBits, rm)
}

private fun encodeCaps(inst: Instruction, caps: InstructionCaps): MInt {
    val condData = caps.cond?.opcode ?: Condition.AL.opcode
    val s = if (inst.category == DATA_PROCESSING && caps.s) 1 else 0
    return encodeData(listOf(
            condBits to condData,
            sBit to s
    ))
}

private fun encodeShift(shifterOperand: List<ExprAst>): MInt {
    return when (shifterOperand.size) {
        1 -> {
            val onlyArg = shifterOperand.first()
            when (onlyArg) {
                is RegisterAst -> {
                    val rm = asRegister(onlyArg)
                    encodeRegisters(rm = rm)
                }
                is ConstAst -> {
                    val rotateImm = 0 // FIXME
                    val immed = castExpr<ConstAst>(onlyArg).value
                    encodeData(
                            iBit to 1,
                            rotateImmBits to rotateImm,
                            immed8Bits to immed
                    )
                }
                else -> throw AssemblerException("Expected register or constant")
            }
        }
        2 -> {
            val rm = castExpr<RegisterAst>(shifterOperand[0]).index
            val shift = castExpr<ShiftAst>(shifterOperand[1])
            val shiftOperator = ShiftOperator.valueOf(shift.operator)
            when (shift.arg) {
                is RegisterAst -> {
                    val rs = asRegister(shift.arg) // FIXME: rs
                    encodeData(rmBits to rm) // FIXME: bits[4], bits[7]
                }
                is ConstAst -> {
                    val shiftImm = castExpr<ConstAst>(shift.arg).value
                    encodeData(
                            iBit to 0,
                            shiftImmBits to shiftImm,
                            shiftBits to shiftOperator.opcode,
                            bit4 to 0,
                            rmBits to rm
                    )
                }
                else -> throw AssemblerException("Expected register or constant")
            }
        }
        else -> throw AssemblerException("Too many arguments")
    }
}

private fun encodeIpuwBits(i: Int = 0, p: Int = 0, u: Int = 0, w: Int = 0): Int {
    return 0
}

fun encodeSignedRm(rm: RegisterAst): MInt {
    // val u = rm.sign
    val u = 1
    return encodeData(uBit to u) or encodeRegisterIndex(rmBits, rm)
}

private fun encodeAddressingMode(addressingModeArgs: List<ExprAst>): MInt {
    val bracketArgs = castExpr<BracketAst>(addressingModeArgs[0]).arglist.args

    val bRn =
            bracketArgs.getOrNull(0) as? RegisterAst
    val bOffset =
            bracketArgs.getOrNull(1) as? ConstAst
    val bRm =
            bracketArgs.getOrNull(1) as? RegisterAst
    val bShift =
            bracketArgs.getOrNull(2) as? ShiftAst

    val tOffset =
            addressingModeArgs.getOrNull(1) as? ConstAst
    val tRm =
            addressingModeArgs.getOrNull(1) as? RegisterAst
    val tShift =
            addressingModeArgs.getOrNull(2) as? ShiftAst

    val bArgs = bracketArgs.size
    val tArgs = addressingModeArgs.size - 1

    if (bRn == null) throw AssemblerException("addressing mode")

    if (tArgs == 0) when {
        bArgs == 1 || (bArgs == 2 && bOffset != null) -> {
            // 1. [<Rn>]
            // 1. [<Rn>, #+/-<offset_12>]
            // 4. [<Rn>, #+/-<offset_12>]!
            val offset = bOffset?.let { castExpr<ConstAst>(bOffset).value } ?: 0
            val p = 0 // FIXME: !
            val u = 1 // FIXME: +/-
            return encodeRegisters(rn = bRn) or
                    encodeData(iBit to 0, pBit to p, uBit to u, offset12Bits to offset)
        }
        bArgs == 2 && bRm != null -> {
            // 2. [<Rn>, +/-<Rm>]
            // 5. [<Rn>, +/-<Rm>]!
            return encodeRegisters(rn = bRn) or
                    encodeSignedRm(bRm)
        }
        bArgs == 2 && bRm != null && bShift != null -> {
            // 3. [<Rn>, +/-<Rm>, <shift> #<shift_imm>]
            // 6. [<Rn>, +/-<Rm>, <shift> #<shift_imm>]!
        }
        else -> throw AssemblerException("addressing mode")
    } else if (bArgs == 1) when {
        tArgs == 1 && tOffset != null -> {
            // 7. [<Rn>], #+/-<offset_12>
        }
        tArgs == 1 && tRm != null -> {
            // 8. [<Rn>], +/-<Rm>
        }
        tArgs == 2 && tRm != null && tShift != null -> {
            // 9. [<Rn>], +/-<Rm>, <shift> #<shift_imm>
        }
        else -> throw AssemblerException("addressing mode")
    } else throw AssemblerException("addressing mode")
    return MInt() // FIXME
}

private fun emitDataProcessingInstruction2Arg(
        inst: Instruction, arglist: ArglistAst, caps: InstructionCaps
): MInt {
    val args = arglist.args

    val rd = args[0] as RegisterAst

    return encodeData(prefixBits to 0b00, opcodeBits to inst.opcode) or
            encodeSbz(rnBits) or
            encodeRegisters(rd = rd) or
            encodeCaps(inst, caps) or
            encodeShift(args.drop(1))
}

private fun emitDataProcessingInstruction3Arg(
        inst: Instruction, arglist: ArglistAst, caps: InstructionCaps
): MInt {
    val args = arglist.args

    val rd = args[0] as RegisterAst
    val rn = args[1] as RegisterAst

    return encodeData(prefixBits to 0b00, opcodeBits to inst.opcode) or
            encodeRegisters(rd = rd, rn = rn) or
            encodeCaps(inst, caps) or
            encodeShift(args.drop(2))
}

private fun emitLoadAndStoreInstruction(
        inst: Instruction, arglist: ArglistAst, caps: InstructionCaps
): MInt {
    val args = arglist.args

    val rd = asRegister(args[0])
    val l = if(inst == Instruction.LDR) 1 else 0

    return encodeCond(caps.cond) or
            encodePrefix(0b01) or
            encodeData(bBit to 0, lBit20 to l, wBit to 1) or
            encodeRegisters(rd = rd) or
            encodeAddressingMode(args.drop(1))
}

fun asRegister(exprAst: ExprAst): RegisterAst {
    if (exprAst !is RegisterAst)
        throw AssemblerException("Expected register, got ${exprAst::class.simpleName}")
    return exprAst
}

class Assembler(input: String) {
    private val ast = Parser(Lexer(input)).parse()

    private val labels = ast.instructions.mapIndexedNotNull { index, instructionAst ->
        instructionAst.label?.let { it.name to index }
    }.toMap()

    private var locationCounter = 0

    private fun emitB(arglist: ArglistAst, caps: InstructionCaps): MInt {
        val args = arglist.args

        val cond = caps.cond?.opcode ?: Condition.AL.opcode
        val l = 0 // FIXME
        val label = castExpr<IdentAst>(args[0]).name

        val targetAddress = labels[label]!!
        val signedImmed24 = (targetAddress - locationCounter).trim(24)

        return encodeInstruction(branchMask, listOf(
                condBits to cond,
                lBit24 to l,
                signedImmed24Bits to signedImmed24
        ))
    }

    fun encodeNextInstruction(instAst: InstructionAst): Int {
        val mnemonic = instAst.mnemonic.value
        val arglist = instAst.arglist

        val (inst, caps) = mnemonics[mnemonic] ?:
                throw AssemblerException("Unrecognized mnemonic $mnemonic")

        val encodedInst: MInt = when (inst.category) {
            BRANCH -> emitB(arglist, caps)
            DATA_PROCESSING -> {
                when (inst.args) {
                    2 -> emitDataProcessingInstruction2Arg(inst, arglist, caps)
                    3 -> emitDataProcessingInstruction3Arg(inst, arglist, caps)
                    else -> throw AssemblerException("inst.args")
                }
            }
            LOAD_AND_STORE -> {
                emitLoadAndStoreInstruction(inst, arglist, caps)
            }
        }

        if (encodedInst.mask != 0.inv())
            throw AssemblerException("Instruction not fully encoded")

        ++locationCounter
        return encodedInst.value
    }

    fun assemble(): Program {
        val instructions = ast.instructions.map(this::encodeNextInstruction)
        return Program(instructions)
    }
}
