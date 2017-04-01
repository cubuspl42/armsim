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

private fun emitAdd(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args
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

private fun emitMov(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args
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

private fun emitSub(arglist: ArglistAst, caps: InstructionCaps): Int {
    val args = arglist.args
    checkArgsSize(args, 3)

    val rn = castExpr<RegisterAst>(args[0]).index // FIXME: check 0-15
    val rd = castExpr<RegisterAst>(args[1]).index // FIXME: check 0-15
    val rm = castExpr<RegisterAst>(args[2]).index // FIXME: check 0-15

    return encodeInstruction(Isa.sub.eqMask, listOf(
            condBits to 0,
            iBit to 0,
            sBit to if(caps.s) 1 else 0,
            rnBits to rn,
            rdBits to rd,
            rmBits to rm
    ))
}
class Assembler(input: String) {
    private val ast = Parser(Lexer(input)).parse()

    private val encoder = InstructionEncoder(listOf(
            Isa.add to ::emitAdd,
            Isa.mov to ::emitMov,
            Isa.sub to ::emitSub
    ))

    fun assemble(): Program {
        val instructions = ast.instructions.map { encoder.encode(it) }
        return Program(instructions)
    }
}
