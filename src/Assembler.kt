import Instruction.*

data class Program(val instructions: List<Int>)

class AssemblerException(s: String) : Throwable(s)

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
    } else throw Exception()
}

private fun emitAdd(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args
    checkArgsSize(args, 3)

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rn = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15
    val rm = castExpr<RegisterAst>(args[2]).index // FIXME: check 0-15

    return encodeInstruction(ADD, listOf(
            condBits to 0,
            iBit to 0,
            sBit to 0,
            rnBits to rn,
            rdBits to rd,
            rmBits to rm
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

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rn = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15
    val (shifterOperand, i) = encodeShifterOperand(args[2])

    return encodeInstruction(SUB, listOf(
            condBits to 0,
            iBit to i,
            sBit to if(caps.s) 1 else 0,
            rnBits to rn,
            rdBits to rd,
            shifterOperandBits to shifterOperand
    ))
}

class Assembler(input: String) {
    private val ast = Parser(Lexer(input)).parse()

    private val encoder = InstructionEncoder(mapOf(
            ADD to ::emitAdd,
            MOV to ::emitMov,
            SUB to ::emitSub
    ))

    fun assemble(): Program {
        val instructions = ast.instructions.map { encoder.encode(it) }
        return Program(instructions)
    }
}
