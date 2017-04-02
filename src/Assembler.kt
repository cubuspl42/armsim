import Instruction.*

data class Program(val instructions: List<Int>)

class AssemblerException(s: String) : Throwable(s)

fun Int.trim(nBits: Int): Int {
    return this and ((1 shl nBits) - 1)
}

private fun encodeComponent(inst: Int, bits: IntRange, data: Int): Int {
    val len = bits.last - bits.first + 1
    val mask = (1 shl len) - 1
    if(data and mask.inv() != 0) throw AssemblerException("Data overlap")
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

fun checkArgsSize(args: List<ExprAst>, expectedSize: Int) {
    if (args.size != expectedSize) {
        throw Exception()
    }
}

inline fun <reified TExprAst> castExpr(node: ExprAst): TExprAst {
    if (node is TExprAst) {
        return node
    } else throw AssemblerException("Expected ${TExprAst::class.simpleName}, got ${node::class.simpleName}")
}

private fun emitAdd(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args
    checkArgsSize(args, 3)

    val cond = caps.cond?.opcode ?: Condition.AL.opcode
    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rn = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15
    val (shifterOperand, i) = encodeShifterOperand(args[2])
    val s = if(caps.s) 1 else 0

    return encodeInstruction(ADD, listOf(
            condBits to cond,
            iBit to i,
            sBit to s,
            rnBits to rn,
            rdBits to rd,
            shifterOperandBits to shifterOperand
    ))
}

private fun emitMov(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args
    checkArgsSize(args, 2)

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val immed = castExpr<ConstAst>(args[1]).value // FIXME: check 8b

    return encodeInstruction(MOV, listOf(
            condBits to 0,
            iBit to 0,
            sBit to 0,
            rdBits to rd,
            immed8Bits to immed
    ))
}

private fun encodeShifterOperand(exprAst: ExprAst): Pair<Int, Int> {
    return when(exprAst) {
        is RegisterAst -> {
            val rm = castExpr<RegisterAst>(exprAst).index // FIXME: check 0-15
            Pair(encodeData(listOf(rmBits to rm)), 0)
        }
        is ConstAst -> {
            val immed = castExpr<ConstAst>(exprAst).value
            Pair(encodeData(listOf(immed8Bits to immed)), 1)
        }
        else -> throw Exception("Expected register or constant")
    }
}

private fun emitSub(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args
    checkArgsSize(args, 3)

    val cond = caps.cond?.opcode ?: Condition.AL.opcode
    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rn = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15
    val (shifterOperand, i) = encodeShifterOperand(args[2])

    return encodeInstruction(SUB, listOf(
            condBits to cond,
            iBit to i,
            sBit to if(caps.s) 1 else 0,
            rnBits to rn,
            rdBits to rd,
            shifterOperandBits to shifterOperand
    ))
}

class Assembler(input: String) {
    private val ast = Parser(Lexer(input)).parse()

    private val labels = ast.instructions.mapIndexedNotNull { index, instructionAst ->
        instructionAst.label?.let { it.name to index}
    }.toMap()

    private var locationCounter = 0

    private fun emitB(arglist: ArglistAst, caps: InstructionCaps): Int {
        val args = arglist.args
        checkArgsSize(args, 1)

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
