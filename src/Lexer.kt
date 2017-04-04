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
    SHIFT_OPERATOR
}

data class Token(val kind: TokenKind, val range: IntRange, val stringValue: String = "", val intValue: Int = -1)

class LexerException(s: String) : Exception(s)

val inlineWhitespace = listOf(' ', '\t')

val registerRegex = Regex("""[rR](\d+)""")

class Lexer(private val input: String) : Iterable<Token> {
    private var inputOffset = 0

    private fun readChar(): Char? {
        if (inputOffset < input.length) {
            return input[inputOffset++]
        } else return null
    }

    private fun peekChar(): Char? {
        if (inputOffset < input.length) {
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

    private fun readIdentAlike(): Token {
        var name = ""
        val range = makeRange {
            while (peekChar()?.isLetter() == true || peekChar()?.isDigit() == true) {
                name += readChar()
            }
        }

        val m = registerRegex.matchEntire(name)

        if(m != null) {
            val index = m.groups[1]!!.value.toInt()
            return Token(TokenKind.REGISTER, range, intValue = index)
        } else {
            val kind = when {
                name in mnemonics -> TokenKind.MNEMONIC
                name in shiftOperators -> TokenKind.SHIFT_OPERATOR
                else -> TokenKind.IDENT
            }
            return Token(kind, range, stringValue = name)
        }
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
            c == ',' -> readComma()
            c == ';' -> readComment()
            c == '#' -> readConst()
            c == '\n' -> readEol()
            c.isLetter() -> readIdentAlike()
            c in inlineWhitespace -> readWhitespace()
            else -> throw LexerException("Unexpected character: `$c`")
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
