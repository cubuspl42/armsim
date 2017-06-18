import org.w3c.dom.Element
import org.w3c.dom.HTMLInputElement
import org.w3c.dom.events.Event
import org.w3c.dom.get
import org.w3c.files.File
import org.w3c.files.FileReader
import org.w3c.files.get
import kotlin.browser.document
import kotlin.dom.clear

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

fun makeStatusElement(vm: Vm): Element {
    val statusDiv = document.createElement("div")
    statusDiv.className = "status"

    (0..15).forEach {
        val span = document.createElement("span")
        span.textContent = "r$it: "
        val i = document.createElement("i")
        i.textContent =  "${vm.getRegisterValue(it)}"
        span.appendChild(i)
        statusDiv.appendChild(span)
    }

    val span = document.createElement("span")
    val cpsr = vm.cpsr
    span.textContent = "cpsr: c=${cpsr.c}, n=${cpsr.n}, v=${cpsr.v}, z=${cpsr.z}"
    statusDiv.appendChild(span)

    return statusDiv
}

fun main(args: Array<String>) {
//    test()

    val input = document.getElementById(asmCodeId)!!.textContent!!.substring(1)

    val errorWrapper = document.getElementById("error-wrapper")!!
    val codeWrapper = document.getElementById("code-wrapper")!!
    val statusWrapper = document.getElementById("status-wrapper")!!

    val stepButton = document.getElementById("step-button")!!
    val sourceInput = document.getElementById("source-input")!!

    var vm: Vm? = null
    var code: Element? = null

    fun updatePresentation() {
        code!!.getElementsByClassName("selected")[0]?.classList?.remove("selected")
        code!!.children[vm!!.ip]!!.classList.add("selected")
        statusWrapper.clear()
        statusWrapper.appendChild(makeStatusElement(vm!!))
    }

    fun loadSource(source: String) {
        codeWrapper.clear()
        errorWrapper.clear()
        statusWrapper.clear()

        try {
            val program = Assembler(source).assemble()
            val vm_ = Vm(program)
            val code_ = makeCodeElement(source)

            codeWrapper.appendChild(code_)

            vm = vm_
            code = code_

            updatePresentation()
        } catch(e: Exception) {
            val errorSpan = document.createElement("span")
            errorSpan.textContent = e.message
            errorWrapper.appendChild(errorSpan)
        }
    }

    loadSource(input)

    stepButton.addEventListener("click", {
        vm?.step()
        updatePresentation()
    })

    sourceInput.addEventListener("change", { ev ->
        (ev.target as? HTMLInputElement)?.files?.let { files ->
            val reader = FileReader()
            reader.onload = { event ->
                loadSource(reader.result as String)
                Unit
            }
            reader.readAsText(files[0]!!)
        }
    })
}
