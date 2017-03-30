class ArglistAst(val args: List<ExprAst>) {
    override fun toString() = args.joinToString(", ")
}

open class ExprAst

class ConstAst(val value: Int) : ExprAst() {
    override fun toString() = "#$value"
}

class IdentAst(val name: String) : ExprAst() {
    override fun toString() = name
}

class RegisterAst(val index: Int) : ExprAst() {
    override fun toString() = "R$index"
}

class InstructionAst(
        val label: IdentAst?,
        val mnemonic: MnemonicAst,
        val arglist: ArglistAst
) {
    override fun toString() = "$label: $mnemonic ($arglist)"
}

class MnemonicAst(val value: String) {
    override fun toString() = value
}

class ProgramAst(val instructions: List<InstructionAst>) {
    override fun toString(): String {
        return instructions.map { it.toString() }.joinToString("\n")
    }
}

class Parser(private val lexer: Lexer) {
    private fun skipIrrelevantTokens() {
        while (lexer.peekToken()?.kind in listOf(TokenKind.WHITESPACE, TokenKind.COMMENT)) {
            lexer.readToken()
        }
    }

    private fun readToken(): Token? {
        skipIrrelevantTokens()
        return lexer.readToken()
    }

    private fun peekToken(): Token? {
        skipIrrelevantTokens()
        return lexer.peekToken()
    }

    private fun readExpectedToken(expectedTokenKind: TokenKind): Token {
        val token = readToken()
        if (token?.kind != expectedTokenKind) {
            throw Exception("Expected $expectedTokenKind, got ${token?.kind}")
        }
        return token
    }

    private fun readTokenOptionally(tokenKind: TokenKind): Token? =
            if (peekToken()?.kind == tokenKind) {
                readToken()
            } else null

    private fun parseExpr(): ExprAst {
        val token = readToken()
        return when (token?.kind) {
            TokenKind.CONST -> ConstAst(token.intValue)
            TokenKind.IDENT -> IdentAst(token.stringValue)
            TokenKind.REGISTER -> RegisterAst(token.intValue)
            else -> throw Exception("Expected expression, got ${token?.kind}")
        }
    }

    private fun parseArglist(): ArglistAst {
        val args = mutableListOf(parseExpr())
        while (peekToken()?.kind == TokenKind.COMMA) {
            readExpectedToken(TokenKind.COMMA)
            args.add(parseExpr())
        }
        return ArglistAst(args)
    }

    private fun parseInstruction(): InstructionAst {
        val label = readTokenOptionally(TokenKind.IDENT)?.let { IdentAst(it.stringValue) }
        readTokenOptionally(TokenKind.EOL)
        val mnemonicToken = readExpectedToken(TokenKind.MNEMONIC)
        val mnemonic = MnemonicAst(mnemonicToken.stringValue)
        val arglist = parseArglist()
        readTokenOptionally(TokenKind.EOL)
        return InstructionAst(label, mnemonic, arglist)
    }

    fun parse(): ProgramAst {
        val instructions = mutableListOf<InstructionAst>()
        while (peekToken() != null) {
            instructions.add(parseInstruction())
        }
        return ProgramAst(instructions)
    }
}
