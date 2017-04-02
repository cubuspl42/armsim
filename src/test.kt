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

val src_addeq1 = """
MOV r1, #5
MOV r2, #2
SUBS r0, r0, r0
ADDEQ r0, r1, r2
"""

fun test_addeq1() {
    val vm = assemble(src_addeq1)
    vm.step()
    vm.step()
    vm.step()
    vm.step()
    assertEq(vm.getRegisterValue(0), 7)
}

val src_addeq2 = """
MOV r1, #5
MOV r2, #2
SUBS r0, r2, r0
ADDEQ r0, r1, r2
"""

fun test_addeq2() {
    val vm = assemble(src_addeq2)
    vm.step()
    vm.step()
    vm.step()
    vm.step()
    assertEq(vm.getRegisterValue(0), 2)
}

val src_and1 = """
ANDS r0, r0, #1
"""

fun test_and1() {
    val vm = assemble(src_and1)
    vm.step()
    assertEq(vm.getRegisterValue(0), 0)
}

val src_b1 = """
B foo
MOV r0, #123
foo MOV r1, #0
"""

fun test_b1() {
    val vm = assemble(src_b1)
    vm.step()
    vm.step()
    assertEq(vm.getRegisterValue(0), 0)
}

val src_bne1 = """
MOV r1, #3
foo SUBS r1, r1, #1
ADD r2, r2, #1
BNE foo
MOV r3, #123
"""

fun test_bne1() {
    val vm = assemble(src_bne1)
    (1..11).forEach { vm.step() }
    assertEq(vm.getRegisterValue(1), 0)
    assertEq(vm.getRegisterValue(2), 3)
    assertEq(vm.getRegisterValue(3), 123)
}

val src_sub1 = """
MOV r1, #7
MOV r2, #3
SUB r0, r1, r2
"""

fun test_sub1() {
    val vm = assemble(src_sub1)
    vm.step()
    vm.step()
    vm.step()
    assertEq(vm.getRegisterValue(0), 4)
}

val src_subs1 = """
MOV r1, #1
MOV r2, #1
SUBS r0, r1, r2
"""

fun test_subs1() {
    val vm = assemble(src_subs1)
    vm.step()
    vm.step()
    vm.step()
    assertEq(vm.cpsr.n, 0)
    assertEq(vm.cpsr.z, 1)
    assertEq(vm.cpsr.c, 0)
    assertEq(vm.cpsr.v, 0)
}

val src_program1 = """
        MOV  R0, #5         ; R0 is current number
        MOV  R1, #0         ; R1 is count of number of iterations
again   ADD  R1, R1, #1     ; increment number of iterations
        ANDS R0, R0, #1     ; test whether R0 is odd
        BEQ  even
        ADD  R0, R0, R0, LSL #1 ; if odd, set R0 = R0 + (R0 << 1) + 1
        ADD  R0, R0, #1     ; and repeat (guaranteed R0 > 1)
        B    again
even    MOV  R0, R0, ASR #1 ; if even, set R0 = R0 >> 1
        SUBS R7, R0, #1     ; and repeat if R0 != 1
        BNE  again
halt    B    halt           ; infinite loop to stop computation
"""

fun test_program1() {
    val vm = assemble(src_program1)
    (1..64).forEach { vm.step() }
}

fun test() {
    test_vm()
    test_mov1()
    test_add1()
    test_addeq1()
    test_addeq2()
    test_and1()
    test_b1()
    test_bne1()
    test_sub1()
    test_subs1()
    test_program1()
}
