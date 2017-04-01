data class Program(val instructions: List<Int>)

private fun encodeData(inst: Int, bits: IntRange, data: Int): Int {
    val offset = bits.first
    return inst or (data shl offset)
}

fun encodeInstruction(pattern: Int, components: List<Pair<IntRange, Int>>): Int {
    return components.foldRight(pattern, { p, acc ->
        val (bits, data) = p
        encodeData(acc, bits, data)
    })
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

private fun emitAdd(instAst: InstructionAst): Int {
    val args = instAst.arglist.args
    checkArgsSize(args, 3)

    val rn = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rd = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15
    val rm = castExpr<RegisterAst>(args[2]).index // FIXME: check 0-15

    return encodeInstruction(ADD_PATTERN, listOf(
            condBits to 0,
            iBit to 0,
            sBit to 0,
            rnBits to rn,
            rdBits to rd,
            rmBits to rm
    ))
}

private fun emitMov(instAst: InstructionAst): Int {
    val args = instAst.arglist.args
    checkArgsSize(args, 2)

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val immed = castExpr<ConstAst>(args[1]).value // FIXME: check 8b

    return encodeInstruction(MOV_PATTERN, listOf(
            condBits to 0,
            iBit to 0,
            sBit to 0,
            rdBits to rd,
            immed8Bits to immed
    ))
}

class Assembler(input: String) {
    private val ast = Parser(Lexer(input)).parse()

    fun assemble(): Program {
        val instructions = ast.instructions.map {
            when (it.mnemonic.value) {
                "ADD" -> emitAdd(it)
                "MOV" -> emitMov(it)
                else -> 0
            }
        }
        return Program(instructions)
    }
}
