import org.w3c.dom.Element
import org.w3c.dom.get
import kotlin.browser.document

private val asmCodeId = "asm-code"

private fun <E> List<E>.splitBy(predicate: (E) -> Boolean): List<List<E>> {
    val list = mutableListOf(mutableListOf<E>())
    for (element in this) {
        if (predicate(element)) {
            list.add(mutableListOf<E>())
        } else {
            list.last().add(element)
        }
    }
    return list
}

fun makeCodeElement(input: String): Element {
    val code = document.createElement("code")
    Lexer(input).toList()
            .splitBy { it.kind == TokenKind.EOL }
            .forEach { lineTokens ->
                code.appendChild({
                    val lineDiv = document.createElement("div")
                    lineDiv.className = "line"
                    lineTokens.forEach { token ->
                        lineDiv.appendChild({
                            val span = document.createElement("span")
                            val tokenString = input.substring(token.range).replace(" ", "\u00A0")
                            span.textContent = tokenString
                            span.className = token.kind.toString()
                            span
                        }())
                    }
                    lineDiv
                }())
            }
    return code
}

fun main(args: Array<String>) {
//    test()

    val input = document.getElementById(asmCodeId)!!.textContent!!.substring(1)

    val codeWrapper = document.getElementById("code-wrapper")!!
    codeWrapper.appendChild(makeCodeElement(input))

    codeWrapper.children[0]!!.children[0]!!.classList.add("selected")

    println(Parser(Lexer(input)).parse())

    val program = Assembler(input).assemble()
    program.instructions.forEach {
        println(it.toString())
    }

    val vm = Vm(program)
    (1..32).forEach { vm.step() }
}
