import Instruction.*

data class Program(val instructions: List<Int>)

class AssemblerException(s: String) : Throwable(s)

fun Int.trim(nBits: Int): Int {
    return this and ((1 shl nBits) - 1)
}

private fun encodeComponent(inst: Int, bits: IntRange, data: Int): Int {
    val len = bits.last - bits.first + 1
    val mask = (1 shl len) - 1
    if (data and mask.inv() != 0) throw AssemblerException("Data overlap")
    val offset = bits.first
    return inst or (data shl offset)
}

fun encodeData(components: List<Pair<IntRange, Int>>): Int {
    return components.foldRight(0, { p, acc ->
        val (bits, data) = p
        encodeComponent(acc, bits, data)
    })
}

fun encodeInstruction(inst: Instruction, components: List<Pair<IntRange, Int>>): Int {
    return inst.eqMask or encodeData(components)
}

inline fun <reified TExprAst> castExpr(node: ExprAst): TExprAst {
    if (node is TExprAst) {
        return node
    } else throw AssemblerException("Expected ${TExprAst::class.simpleName}, got ${node::class.simpleName}")
}

private fun encodeRegisters(rd: Int = 0, rn: Int = 0): Int {
    return encodeData(listOf(
            rdBits to rd,
            rnBits to rn
    ))
}

private fun encodeCaps(inst: Instruction, caps: InstructionCaps): Int {
    val condData = if (inst.cond) caps.cond?.opcode ?: Condition.AL.opcode else Condition.AL.opcode
    val s = if (inst.s && caps.s) 1 else 0
    return encodeData(listOf(
            condBits to condData,
            sBit to s
    ))
}

private fun encodeShift(shifterOperand: List<ExprAst>): Int {
    return when (shifterOperand.size) {
        1 -> {
            val onlyArg = shifterOperand.first()
            when (onlyArg) {
                is RegisterAst -> {
                    val rm = castExpr<RegisterAst>(onlyArg).index // FIXME: check 0-15
                    encodeData(listOf(rmBits to rm))
                }
                is ConstAst -> {
                    val immed = castExpr<ConstAst>(onlyArg).value
                    encodeData(listOf(iBit to 1, immed8Bits to immed)) // FIXME: rotate
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
                    val rs = castExpr<RegisterAst>(shift.arg).index // FIXME: check 0-15
                    encodeData(listOf(rmBits to rm)) // FIXME: bits[4], bits[7], rs
                }
                is ConstAst -> {
                    val shiftImm = castExpr<ConstAst>(shift.arg).value
                    encodeData(listOf(
                            shiftImmBits to shiftImm,
                            shiftBits to shiftOperator.opcode,
                            rmBits to rm
                    ))
                }
                else -> throw AssemblerException("Expected register or constant")
            }
        }
        else -> throw AssemblerException("Too many arguments")
    }
}

private fun emitAdd(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rn = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15

    return ADD.eqMask or
            encodeRegisters(rd = rd, rn = rn) or
            encodeCaps(ADD, caps) or
            encodeShift(args.drop(2))
}


private fun emitAnd(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rn = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15

    return AND.eqMask or
            encodeRegisters(rd = rd, rn = rn) or
            encodeCaps(AND, caps) or
            encodeShift(args.drop(2))
}

private fun emitMov(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15

    return MOV.eqMask or
            encodeRegisters(rd = rd) or
            encodeCaps(MOV, caps) or
            encodeShift(args.drop(1))
}

private fun emitSub(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rn = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15

    return SUB.eqMask or
            encodeRegisters(rd = rd, rn = rn) or
            encodeCaps(SUB, caps) or
            encodeShift(args.drop(2))
}

class Assembler(input: String) {
    private val ast = Parser(Lexer(input)).parse()

    private val labels = ast.instructions.mapIndexedNotNull { index, instructionAst ->
        instructionAst.label?.let { it.name to index }
    }.toMap()

    private var locationCounter = 0

    private fun emitB(arglist: ArglistAst, caps: InstructionCaps): Int {
        val args = arglist.args

        val cond = caps.cond?.opcode ?: Condition.AL.opcode
        val label = castExpr<IdentAst>(args[0]).name

        val targetAddress = labels[label]!!
        val signedImmed24 = (targetAddress - locationCounter).trim(24)

        return encodeInstruction(B, listOf(
                condBits to cond,
                signedImmed24Bits to signedImmed24
        ))
    }

    private val encoder = InstructionEncoder(mapOf(
            ADD to ::emitAdd,
            AND to ::emitAnd,
            B to this::emitB,
            MOV to ::emitMov,
            SUB to ::emitSub
    ))

    fun encodeNextInstruction(instAst: InstructionAst): Int {
        val inst = encoder.encode(instAst)
        ++locationCounter
        return inst
    }

    fun assemble(): Program {
        val instructions = ast.instructions.map(this::encodeNextInstruction)
        return Program(instructions)
    }
}
