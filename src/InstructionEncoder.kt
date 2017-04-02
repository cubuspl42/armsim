fun <T1, T2> Collection<T1>.combine(other: Iterable<T2>): List<Pair<T1, T2>> {
    return combine(other, { thisItem: T1, otherItem: T2 -> Pair(thisItem, otherItem) })
}

fun <T1, T2, R> Collection<T1>.combine(other: Iterable<T2>, transformer: (thisItem: T1, otherItem: T2) -> R): List<R> {
    return this.flatMap { thisItem -> other.map { otherItem -> transformer(thisItem, otherItem) } }
}

fun <T> combine3(
        iter1: Iterable<T>,
        iter2: Iterable<T>,
        iter3: Iterable<T>
): List<List<T>> {
    val rv = mutableListOf<List<T>>()
    for (a in iter1) {
        for (b in iter2) {
            for (c in iter3) {
                rv.add(listOf(a, b, c))
            }
        }
    }
    return rv
}


data class InstructionCaps(
        val cond: Condition?,
        val s: Boolean
)

class InstructionEncoder(
        private val handlers: Map<Instruction, (ArglistAst, InstructionCaps) -> Int>
) {
    fun encode(instAst: InstructionAst): Int {
        val fullMnemonic = instAst.mnemonic.value
        val (inst, caps) = mnemonics[fullMnemonic]!!
        val handler = handlers[inst]!!
        return handler(instAst.arglist, caps)
    }
}
