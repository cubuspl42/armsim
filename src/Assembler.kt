data class Program(val instructions: List<Int>)

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

private fun emitMov(instAst: InstructionAst): Int {
    val args = instAst.arglist.args
    checkArgsSize(args, 2)

    val rd = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val immed = castExpr<ConstAst>(args[1]).value // FIXME: check 8b

    return InstructionEncoder(MOV_PATTERN)
            .cond(0)
            .i(0)
            .s(0)
            .rd(rd)
            .immediate(0, immed)
            .encode()
}

class Assembler(input: String) {
    private val ast = Parser(Lexer(input)).parse()

    fun assemble(): Program {
        val instructions = ast.instructions.map {
            when (it.mnemonic.value) {
                "MOV" -> emitMov(it)
                else -> 0
            }
        }
        return Program(instructions)
    }
}
