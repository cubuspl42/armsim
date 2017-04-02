inline fun assert(value: Boolean, lazyMessage: () -> String) {
    if (!value) {
        val message = lazyMessage()
        throw AssertionError(message)
    }
}

fun assert(value: Boolean) {
    assert(value) { "Assertion failed" }
}

fun <T> assertEq(value: T, expectedValue: T) {
    assert(value == expectedValue, { "Expected $expectedValue, got $value" })
}

fun assemble(src: String): Vm = Vm(Assembler(src).assemble())

fun test_vm() {
    val vm = assemble("")
    (0..15).forEach {
        assert(vm.getRegisterValue(it) == 0)
    }
}

val src_mov1 = """
MOV r0, #123
"""

fun test_mov1() {
    val vm = assemble(src_mov1)
    vm.step()
    assert(vm.getRegisterValue(0) == 123)
}

val src_add1 = """
MOV r1, #2
MOV r2, #5
ADD r0, r1, r2
"""

fun test_add1() {
    val vm = assemble(src_add1)
    vm.step()
    vm.step()
    vm.step()
    assertEq(vm.getRegisterValue(0), 7)
}

fun test() {
    test_vm()
    test_mov1()
    test_add1()
}
