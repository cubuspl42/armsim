fun Char.isLetter(): Boolean {
    return (this in ('a'..'z')) or (this in ('A'..'Z'))
}

fun Char.isDigit(): Boolean {
    return (this in ('0'..'9'))
}

enum class TokenKind {
    COMMA,
    COMMENT,
    CONST,
    EOL,
    IDENT,
    MNEMONIC,
    REGISTER,
    WHITESPACE,
}

data class Token(val kind: TokenKind, val range: IntRange, val stringValue: String = "", val intValue: Int = -1)

val mnemonics = listOf(
        "ADD",
        "SUB",
        "MOV",
        "SUBS",
        "BNE",
        "B"
)

val inlineWhitespace = listOf(' ', '\t')

class Lexer(private val input: String) : Iterable<Token> {
    private var inputOffset = 0

    private fun readChar(): Char? {
        if (inputOffset < input.size) {
            return input[inputOffset++]
        } else return null
    }

    private fun peekChar(): Char? {
        if (inputOffset < input.size) {
            return input[inputOffset]
        } else return null
    }

    private fun expectChar(expected: Char) {
        val actual = readChar()
        if (actual != expected) {
            throw Exception()
        }
    }

    private fun makeRange(function: () -> Unit): IntRange {
        val start = inputOffset
        function()
        val last = inputOffset - 1
        return (start..last)
    }

    private fun readNumber(): Int {
        var digits = ""
        while (peekChar()?.isDigit() == true) {
            digits += readChar()
        }
        return digits.toInt()
    }

    private fun readCharToken(kind: TokenKind, c: Char): Token {
        expectChar(c)
        return Token(kind, (inputOffset - 1..inputOffset - 1))
    }

    private fun readComma() = readCharToken(TokenKind.COMMA, ',')

    private fun readComment(): Token {
        return Token(TokenKind.COMMENT, makeRange {
            expectChar(';')
            while (peekChar() !in listOf('\n', null)) {
                readChar()
            }
        })
    }

    private fun readConst(): Token {
        var value = 0
        return Token(TokenKind.CONST, makeRange {
            expectChar('#')
            value = readNumber()
        }, intValue =  value)
    }

    private fun readEol() = readCharToken(TokenKind.EOL, '\n')

    private fun readIdentOrMnemonic(): Token {
        var name = ""
        val range = makeRange {
            while (peekChar()?.isLetter() == true) {
                name += readChar()
            }
        }
        val kind = when {
            name in mnemonics -> TokenKind.MNEMONIC
            else -> TokenKind.IDENT
        }
        return Token(kind, range, stringValue = name)
    }

    private fun readRegister(): Token {
        var value = 0
        return Token(TokenKind.REGISTER, makeRange {
            val r = readChar()
            if (r?.toLowerCase() != 'r') {
                throw Exception()
            }
            value = readNumber()
        }, intValue = value)
    }

    private fun readWhitespace(): Token {
        return Token(TokenKind.WHITESPACE, makeRange {
            while (peekChar() in inlineWhitespace) {
                readChar()
            }
        })
    }

    fun readToken(): Token? {
        val c = peekChar()

        return when {
            c == null -> null
            c.toLowerCase() == 'r' -> readRegister()
            c == ',' -> readComma()
            c == ';' -> readComment()
            c == '#' -> readConst()
            c == '\n' -> readEol()
            c.isLetter() -> readIdentOrMnemonic()
            c in inlineWhitespace -> readWhitespace()
            else -> throw Exception()
        }
    }

    fun peekToken(): Token? {
        val offset = inputOffset
        val token = readToken()
        inputOffset = offset
        return token
    }

    override fun iterator(): Iterator<Token> {
        return object : Iterator<Token> {
            override fun hasNext() = peekChar() != null
            override fun next() = readToken()!!
        }
    }
}