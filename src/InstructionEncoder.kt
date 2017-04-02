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
        val condCode: ConditionCode?,
        val s: Boolean
)

enum class ConditionCode {
    EQ {
        override val opcode = 0b0000
    },
    NE {
        override val opcode = 0b0001
    },
    CS {
        override val opcode = 0b0010
    },
    HS {
        override val opcode = 0b0010
    },
    CC {
        override val opcode = 0b0011
    },
    LO {
        override val opcode = 0b0011
    },
    AL {
        override val opcode = 0b1110
    };

    open val opcode = 0b1111
}

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
