import org.w3c.dom.Element
import kotlin.browser.document

private val asmCodeId = "asm-code"

fun main(args: Array<String>) {
    test()

    val input = document.getElementById(asmCodeId)!!.textContent!!.substring(1)

    val code = document.getElementById("code")!!
    Lexer(input).forEach { token ->
        val element: Element = when(token.kind) {
            TokenKind.EOL -> document.createElement("br")
            else -> {
                val span = document.createElement("span")
                val tokenString = input.substring(token.range).replace(" ", "\u00A0")
                span.textContent = tokenString
                span.className = token.kind.toString()
                span
            }
        }
        code.appendChild(element)
    }

    println(Parser(Lexer(input)).parse())

    val program = Assembler(input).assemble()
    program.instructions.forEach {
        println(it.toString())
    }

    val vm = Vm(program)
    (1..32).forEach { vm.step() }
}
