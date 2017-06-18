if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'armsim'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'armsim'.");
}
var armsim = function (_, Kotlin) {
  'use strict';
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var Enum = Kotlin.kotlin.Enum;
  var listOf = Kotlin.kotlin.collections.listOf_mh5how$;
  var toList = Kotlin.kotlin.collections.toList_us0mfu$;
  var plus = Kotlin.kotlin.collections.plus_mydzjv$;
  var listOf_0 = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var Pair = Kotlin.kotlin.Pair;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var toMap = Kotlin.kotlin.collections.toMap_6hr0sd$;
  var Throwable = Error;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var getOrNull = Kotlin.kotlin.collections.getOrNull_yzln2o$;
  var drop = Kotlin.kotlin.collections.drop_ba2ldo$;
  var CharRange = Kotlin.kotlin.ranges.CharRange;
  var Exception = Kotlin.kotlin.Exception;
  var Regex = Kotlin.kotlin.text.Regex_61zpoe$;
  var generateSequence = Kotlin.kotlin.sequences.generateSequence_9ce4rd$;
  var joinToString = Kotlin.kotlin.sequences.joinToString_853xkz$;
  var drop_0 = Kotlin.kotlin.text.drop_6ic1pp$;
  var toInt = Kotlin.kotlin.text.toInt_6ic1pp$;
  var startsWith = Kotlin.kotlin.text.startsWith_7epoxm$;
  var toInt_0 = Kotlin.kotlin.text.toInt_pdl1vz$;
  var NumberFormatException = Kotlin.kotlin.NumberFormatException;
  var contains_0 = Kotlin.kotlin.collections.contains_2ws7j4$;
  var Iterator = Kotlin.kotlin.collections.Iterator;
  var Iterable = Kotlin.kotlin.collections.Iterable;
  var joinToString_0 = Kotlin.kotlin.collections.joinToString_fmv235$;
  var mutableListOf_0 = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var toList_0 = Kotlin.kotlin.sequences.toList_veqyi0$;
  var IntCompanionObject = Kotlin.kotlin.js.internal.IntCompanionObject;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var get_indices = Kotlin.kotlin.collections.get_indices_gzk92b$;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_4c7yge$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var toList_1 = Kotlin.kotlin.collections.toList_7wnvza$;
  var substring = Kotlin.kotlin.text.substring_fc3b62$;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var clear = Kotlin.kotlin.dom.clear_asww5s$;
  var kotlin_0 = Kotlin.kotlin;
  InstructionCategory.prototype = Object.create(Enum.prototype);
  InstructionCategory.prototype.constructor = InstructionCategory;
  Instruction.prototype = Object.create(Enum.prototype);
  Instruction.prototype.constructor = Instruction;
  Condition.prototype = Object.create(Enum.prototype);
  Condition.prototype.constructor = Condition;
  ShiftOperator.prototype = Object.create(Enum.prototype);
  ShiftOperator.prototype.constructor = ShiftOperator;
  AssemblerException.prototype = Object.create(Throwable.prototype);
  AssemblerException.prototype.constructor = AssemblerException;
  TokenKind.prototype = Object.create(Enum.prototype);
  TokenKind.prototype.constructor = TokenKind;
  LexerException.prototype = Object.create(Exception.prototype);
  LexerException.prototype.constructor = LexerException;
  ParserException.prototype = Object.create(Exception.prototype);
  ParserException.prototype.constructor = ParserException;
  ConstAst.prototype = Object.create(ExprAst.prototype);
  ConstAst.prototype.constructor = ConstAst;
  IdentAst.prototype = Object.create(ExprAst.prototype);
  IdentAst.prototype.constructor = IdentAst;
  RegisterAst.prototype = Object.create(ExprAst.prototype);
  RegisterAst.prototype.constructor = RegisterAst;
  ShiftAst.prototype = Object.create(ExprAst.prototype);
  ShiftAst.prototype.constructor = ShiftAst;
  BracketAst.prototype = Object.create(ExprAst.prototype);
  BracketAst.prototype.constructor = BracketAst;
  VmException.prototype = Object.create(Throwable.prototype);
  VmException.prototype.constructor = VmException;
  var wordSize;
  var bit4;
  var bit7;
  var bBit;
  var condBits;
  var iBit;
  var immed8Bits;
  var lBit20;
  var lBit24;
  var offset12Bits;
  var opcodeBits;
  var pBit;
  var prefixBits;
  var rotateImmBits;
  var rdBits;
  var rmBits;
  var rnBits;
  var sBit;
  var shiftImmBits;
  var shiftBits;
  var shifterOperandBits;
  var signedImmed24Bits;
  var uBit;
  var wBit;
  function Mask(andMask, xorMask) {
    this.andMask = andMask;
    this.xorMask = xorMask;
  }
  Mask.prototype.toMInt = function () {
    return new MInt(this.andMask, this.xorMask);
  };
  Mask.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Mask',
    interfaces: []
  };
  Mask.prototype.component1 = function () {
    return this.andMask;
  };
  Mask.prototype.component2 = function () {
    return this.xorMask;
  };
  Mask.prototype.copy_vux9f0$ = function (andMask, xorMask) {
    return new Mask(andMask === void 0 ? this.andMask : andMask, xorMask === void 0 ? this.xorMask : xorMask);
  };
  Mask.prototype.toString = function () {
    return 'Mask(andMask=' + Kotlin.toString(this.andMask) + (', xorMask=' + Kotlin.toString(this.xorMask)) + ')';
  };
  Mask.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.andMask) | 0;
    result = result * 31 + Kotlin.hashCode(this.xorMask) | 0;
    return result;
  };
  Mask.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.andMask, other.andMask) && Kotlin.equals(this.xorMask, other.xorMask)))));
  };
  var dataProcessingImmediateShiftMask;
  var dataProcessingRegisterShiftMask;
  var dataProcessingImmediateMask;
  var branchMask;
  var loadAndStoreMask;
  function InstructionCategory(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function InstructionCategory_initFields() {
    InstructionCategory_initFields = function () {
    };
    InstructionCategory$BRANCH_instance = new InstructionCategory('BRANCH', 0);
    InstructionCategory$DATA_PROCESSING_instance = new InstructionCategory('DATA_PROCESSING', 1);
    InstructionCategory$LOAD_AND_STORE_instance = new InstructionCategory('LOAD_AND_STORE', 2);
  }
  var InstructionCategory$BRANCH_instance;
  function InstructionCategory$BRANCH_getInstance() {
    InstructionCategory_initFields();
    return InstructionCategory$BRANCH_instance;
  }
  var InstructionCategory$DATA_PROCESSING_instance;
  function InstructionCategory$DATA_PROCESSING_getInstance() {
    InstructionCategory_initFields();
    return InstructionCategory$DATA_PROCESSING_instance;
  }
  var InstructionCategory$LOAD_AND_STORE_instance;
  function InstructionCategory$LOAD_AND_STORE_getInstance() {
    InstructionCategory_initFields();
    return InstructionCategory$LOAD_AND_STORE_instance;
  }
  InstructionCategory.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'InstructionCategory',
    interfaces: [Enum]
  };
  function InstructionCategory$values() {
    return [InstructionCategory$BRANCH_getInstance(), InstructionCategory$DATA_PROCESSING_getInstance(), InstructionCategory$LOAD_AND_STORE_getInstance()];
  }
  InstructionCategory.values = InstructionCategory$values;
  function InstructionCategory$valueOf(name) {
    switch (name) {
      case 'BRANCH':
        return InstructionCategory$BRANCH_getInstance();
      case 'DATA_PROCESSING':
        return InstructionCategory$DATA_PROCESSING_getInstance();
      case 'LOAD_AND_STORE':
        return InstructionCategory$LOAD_AND_STORE_getInstance();
      default:Kotlin.throwISE('No enum constant InstructionCategory.' + name);
    }
  }
  InstructionCategory.valueOf_61zpoe$ = InstructionCategory$valueOf;
  function Instruction(name, ordinal, category, opcode, args) {
    if (opcode === void 0)
      opcode = -1;
    if (args === void 0)
      args = -1;
    Enum.call(this);
    this.category = category;
    this.opcode = opcode;
    this.args = args;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Instruction_initFields() {
    Instruction_initFields = function () {
    };
    Instruction$B_instance = new Instruction('B', 0, InstructionCategory$BRANCH_getInstance());
    Instruction$ADC_instance = new Instruction('ADC', 1, InstructionCategory$DATA_PROCESSING_getInstance(), 5, 3);
    Instruction$ADD_instance = new Instruction('ADD', 2, InstructionCategory$DATA_PROCESSING_getInstance(), 4, 3);
    Instruction$AND_instance = new Instruction('AND', 3, InstructionCategory$DATA_PROCESSING_getInstance(), 0, 3);
    Instruction$BIC_instance = new Instruction('BIC', 4, InstructionCategory$DATA_PROCESSING_getInstance(), 14, 3);
    Instruction$CMN_instance = new Instruction('CMN', 5, InstructionCategory$DATA_PROCESSING_getInstance(), 11, 2);
    Instruction$CMP_instance = new Instruction('CMP', 6, InstructionCategory$DATA_PROCESSING_getInstance(), 10, 2);
    Instruction$EOR_instance = new Instruction('EOR', 7, InstructionCategory$DATA_PROCESSING_getInstance(), 1, 3);
    Instruction$MOV_instance = new Instruction('MOV', 8, InstructionCategory$DATA_PROCESSING_getInstance(), 13, 2);
    Instruction$MVN_instance = new Instruction('MVN', 9, InstructionCategory$DATA_PROCESSING_getInstance(), 15, 2);
    Instruction$ORR_instance = new Instruction('ORR', 10, InstructionCategory$DATA_PROCESSING_getInstance(), 12, 3);
    Instruction$RSB_instance = new Instruction('RSB', 11, InstructionCategory$DATA_PROCESSING_getInstance(), 3, 3);
    Instruction$RSC_instance = new Instruction('RSC', 12, InstructionCategory$DATA_PROCESSING_getInstance(), 7, 3);
    Instruction$SBC_instance = new Instruction('SBC', 13, InstructionCategory$DATA_PROCESSING_getInstance(), 6, 3);
    Instruction$SUB_instance = new Instruction('SUB', 14, InstructionCategory$DATA_PROCESSING_getInstance(), 2, 3);
    Instruction$TEQ_instance = new Instruction('TEQ', 15, InstructionCategory$DATA_PROCESSING_getInstance(), 9, 2);
    Instruction$TST_instance = new Instruction('TST', 16, InstructionCategory$DATA_PROCESSING_getInstance(), 8, 2);
    Instruction$LDR_instance = new Instruction('LDR', 17, InstructionCategory$LOAD_AND_STORE_getInstance());
    Instruction$STR_instance = new Instruction('STR', 18, InstructionCategory$LOAD_AND_STORE_getInstance());
  }
  var Instruction$B_instance;
  function Instruction$B_getInstance() {
    Instruction_initFields();
    return Instruction$B_instance;
  }
  var Instruction$ADC_instance;
  function Instruction$ADC_getInstance() {
    Instruction_initFields();
    return Instruction$ADC_instance;
  }
  var Instruction$ADD_instance;
  function Instruction$ADD_getInstance() {
    Instruction_initFields();
    return Instruction$ADD_instance;
  }
  var Instruction$AND_instance;
  function Instruction$AND_getInstance() {
    Instruction_initFields();
    return Instruction$AND_instance;
  }
  var Instruction$BIC_instance;
  function Instruction$BIC_getInstance() {
    Instruction_initFields();
    return Instruction$BIC_instance;
  }
  var Instruction$CMN_instance;
  function Instruction$CMN_getInstance() {
    Instruction_initFields();
    return Instruction$CMN_instance;
  }
  var Instruction$CMP_instance;
  function Instruction$CMP_getInstance() {
    Instruction_initFields();
    return Instruction$CMP_instance;
  }
  var Instruction$EOR_instance;
  function Instruction$EOR_getInstance() {
    Instruction_initFields();
    return Instruction$EOR_instance;
  }
  var Instruction$MOV_instance;
  function Instruction$MOV_getInstance() {
    Instruction_initFields();
    return Instruction$MOV_instance;
  }
  var Instruction$MVN_instance;
  function Instruction$MVN_getInstance() {
    Instruction_initFields();
    return Instruction$MVN_instance;
  }
  var Instruction$ORR_instance;
  function Instruction$ORR_getInstance() {
    Instruction_initFields();
    return Instruction$ORR_instance;
  }
  var Instruction$RSB_instance;
  function Instruction$RSB_getInstance() {
    Instruction_initFields();
    return Instruction$RSB_instance;
  }
  var Instruction$RSC_instance;
  function Instruction$RSC_getInstance() {
    Instruction_initFields();
    return Instruction$RSC_instance;
  }
  var Instruction$SBC_instance;
  function Instruction$SBC_getInstance() {
    Instruction_initFields();
    return Instruction$SBC_instance;
  }
  var Instruction$SUB_instance;
  function Instruction$SUB_getInstance() {
    Instruction_initFields();
    return Instruction$SUB_instance;
  }
  var Instruction$TEQ_instance;
  function Instruction$TEQ_getInstance() {
    Instruction_initFields();
    return Instruction$TEQ_instance;
  }
  var Instruction$TST_instance;
  function Instruction$TST_getInstance() {
    Instruction_initFields();
    return Instruction$TST_instance;
  }
  var Instruction$LDR_instance;
  function Instruction$LDR_getInstance() {
    Instruction_initFields();
    return Instruction$LDR_instance;
  }
  var Instruction$STR_instance;
  function Instruction$STR_getInstance() {
    Instruction_initFields();
    return Instruction$STR_instance;
  }
  Instruction.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Instruction',
    interfaces: [Enum]
  };
  function Instruction$values() {
    return [Instruction$B_getInstance(), Instruction$ADC_getInstance(), Instruction$ADD_getInstance(), Instruction$AND_getInstance(), Instruction$BIC_getInstance(), Instruction$CMN_getInstance(), Instruction$CMP_getInstance(), Instruction$EOR_getInstance(), Instruction$MOV_getInstance(), Instruction$MVN_getInstance(), Instruction$ORR_getInstance(), Instruction$RSB_getInstance(), Instruction$RSC_getInstance(), Instruction$SBC_getInstance(), Instruction$SUB_getInstance(), Instruction$TEQ_getInstance(), Instruction$TST_getInstance(), Instruction$LDR_getInstance(), Instruction$STR_getInstance()];
  }
  Instruction.values = Instruction$values;
  function Instruction$valueOf(name) {
    switch (name) {
      case 'B':
        return Instruction$B_getInstance();
      case 'ADC':
        return Instruction$ADC_getInstance();
      case 'ADD':
        return Instruction$ADD_getInstance();
      case 'AND':
        return Instruction$AND_getInstance();
      case 'BIC':
        return Instruction$BIC_getInstance();
      case 'CMN':
        return Instruction$CMN_getInstance();
      case 'CMP':
        return Instruction$CMP_getInstance();
      case 'EOR':
        return Instruction$EOR_getInstance();
      case 'MOV':
        return Instruction$MOV_getInstance();
      case 'MVN':
        return Instruction$MVN_getInstance();
      case 'ORR':
        return Instruction$ORR_getInstance();
      case 'RSB':
        return Instruction$RSB_getInstance();
      case 'RSC':
        return Instruction$RSC_getInstance();
      case 'SBC':
        return Instruction$SBC_getInstance();
      case 'SUB':
        return Instruction$SUB_getInstance();
      case 'TEQ':
        return Instruction$TEQ_getInstance();
      case 'TST':
        return Instruction$TST_getInstance();
      case 'LDR':
        return Instruction$LDR_getInstance();
      case 'STR':
        return Instruction$STR_getInstance();
      default:Kotlin.throwISE('No enum constant Instruction.' + name);
    }
  }
  Instruction.valueOf_61zpoe$ = Instruction$valueOf;
  function Condition(name, ordinal, opcode) {
    Enum.call(this);
    this.opcode = opcode;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Condition_initFields() {
    Condition_initFields = function () {
    };
    Condition$EQ_instance = new Condition('EQ', 0, 0);
    Condition$NE_instance = new Condition('NE', 1, 1);
    Condition$LT_instance = new Condition('LT', 2, 11);
    Condition$GT_instance = new Condition('GT', 3, 12);
    Condition$AL_instance = new Condition('AL', 4, 14);
  }
  var Condition$EQ_instance;
  function Condition$EQ_getInstance() {
    Condition_initFields();
    return Condition$EQ_instance;
  }
  var Condition$NE_instance;
  function Condition$NE_getInstance() {
    Condition_initFields();
    return Condition$NE_instance;
  }
  var Condition$LT_instance;
  function Condition$LT_getInstance() {
    Condition_initFields();
    return Condition$LT_instance;
  }
  var Condition$GT_instance;
  function Condition$GT_getInstance() {
    Condition_initFields();
    return Condition$GT_instance;
  }
  var Condition$AL_instance;
  function Condition$AL_getInstance() {
    Condition_initFields();
    return Condition$AL_instance;
  }
  Condition.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Condition',
    interfaces: [Enum]
  };
  function Condition$values() {
    return [Condition$EQ_getInstance(), Condition$NE_getInstance(), Condition$LT_getInstance(), Condition$GT_getInstance(), Condition$AL_getInstance()];
  }
  Condition.values = Condition$values;
  function Condition$valueOf(name) {
    switch (name) {
      case 'EQ':
        return Condition$EQ_getInstance();
      case 'NE':
        return Condition$NE_getInstance();
      case 'LT':
        return Condition$LT_getInstance();
      case 'GT':
        return Condition$GT_getInstance();
      case 'AL':
        return Condition$AL_getInstance();
      default:Kotlin.throwISE('No enum constant Condition.' + name);
    }
  }
  Condition.valueOf_61zpoe$ = Condition$valueOf;
  var mnemonics;
  function ShiftOperator(name, ordinal, opcode) {
    Enum.call(this);
    this.opcode = opcode;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function ShiftOperator_initFields() {
    ShiftOperator_initFields = function () {
    };
    ShiftOperator$LSL_instance = new ShiftOperator('LSL', 0, 0);
    ShiftOperator$LSR_instance = new ShiftOperator('LSR', 1, 1);
    ShiftOperator$ASR_instance = new ShiftOperator('ASR', 2, 2);
    ShiftOperator$ROR_instance = new ShiftOperator('ROR', 3, 3);
    ShiftOperator$RRX_instance = new ShiftOperator('RRX', 4, 3);
  }
  var ShiftOperator$LSL_instance;
  function ShiftOperator$LSL_getInstance() {
    ShiftOperator_initFields();
    return ShiftOperator$LSL_instance;
  }
  var ShiftOperator$LSR_instance;
  function ShiftOperator$LSR_getInstance() {
    ShiftOperator_initFields();
    return ShiftOperator$LSR_instance;
  }
  var ShiftOperator$ASR_instance;
  function ShiftOperator$ASR_getInstance() {
    ShiftOperator_initFields();
    return ShiftOperator$ASR_instance;
  }
  var ShiftOperator$ROR_instance;
  function ShiftOperator$ROR_getInstance() {
    ShiftOperator_initFields();
    return ShiftOperator$ROR_instance;
  }
  var ShiftOperator$RRX_instance;
  function ShiftOperator$RRX_getInstance() {
    ShiftOperator_initFields();
    return ShiftOperator$RRX_instance;
  }
  ShiftOperator.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ShiftOperator',
    interfaces: [Enum]
  };
  function ShiftOperator$values() {
    return [ShiftOperator$LSL_getInstance(), ShiftOperator$LSR_getInstance(), ShiftOperator$ASR_getInstance(), ShiftOperator$ROR_getInstance(), ShiftOperator$RRX_getInstance()];
  }
  ShiftOperator.values = ShiftOperator$values;
  function ShiftOperator$valueOf(name) {
    switch (name) {
      case 'LSL':
        return ShiftOperator$LSL_getInstance();
      case 'LSR':
        return ShiftOperator$LSR_getInstance();
      case 'ASR':
        return ShiftOperator$ASR_getInstance();
      case 'ROR':
        return ShiftOperator$ROR_getInstance();
      case 'RRX':
        return ShiftOperator$RRX_getInstance();
      default:Kotlin.throwISE('No enum constant ShiftOperator.' + name);
    }
  }
  ShiftOperator.valueOf_61zpoe$ = ShiftOperator$valueOf;
  var shiftOperators;
  function Program(instructions) {
    this.instructions = instructions;
  }
  Program.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Program',
    interfaces: []
  };
  Program.prototype.component1 = function () {
    return this.instructions;
  };
  Program.prototype.copy_pqoyrt$ = function (instructions) {
    return new Program(instructions === void 0 ? this.instructions : instructions);
  };
  Program.prototype.toString = function () {
    return 'Program(instructions=' + Kotlin.toString(this.instructions) + ')';
  };
  Program.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.instructions) | 0;
    return result;
  };
  Program.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.instructions, other.instructions))));
  };
  function AssemblerException(s_0) {
    Throwable.call(this);
    this.message_so5wt1$_0 = s_0;
    this.cause_so5wt1$_0 = null;
    Kotlin.captureStack(Throwable, this);
    this.name = 'AssemblerException';
  }
  Object.defineProperty(AssemblerException.prototype, 'message', {
    get: function () {
      return this.message_so5wt1$_0;
    }
  });
  Object.defineProperty(AssemblerException.prototype, 'cause', {
    get: function () {
      return this.cause_so5wt1$_0;
    }
  });
  AssemblerException.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'AssemblerException',
    interfaces: [Throwable]
  };
  function maskFromRange(bits) {
    var offset = bits.first;
    var len = bits.last - bits.first + 1 | 0;
    var mask = (1 << len) - 1 << offset;
    return mask;
  }
  function MInt(mask, value) {
    if (mask === void 0)
      mask = 0;
    if (value === void 0)
      value = 0;
    this.mask = mask;
    this.value = value;
    if ((this.value & ~this.mask) !== 0)
      throw new AssemblerException('Mask ' + this.mask + ' does not cover ' + this.value);
  }
  MInt.prototype.or_1equa$ = function (mInt) {
    if ((this.mask & mInt.mask) !== 0)
      throw new AssemblerException('Mask ' + this.mask + ' overlaps ' + mInt.mask);
    return new MInt(this.mask | mInt.mask, this.value | mInt.value);
  };
  MInt.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'MInt',
    interfaces: []
  };
  MInt.prototype.component1 = function () {
    return this.mask;
  };
  MInt.prototype.component2 = function () {
    return this.value;
  };
  MInt.prototype.copy_vux9f0$ = function (mask, value) {
    return new MInt(mask === void 0 ? this.mask : mask, value === void 0 ? this.value : value);
  };
  MInt.prototype.toString = function () {
    return 'MInt(mask=' + Kotlin.toString(this.mask) + (', value=' + Kotlin.toString(this.value)) + ')';
  };
  MInt.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.mask) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    return result;
  };
  MInt.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.mask, other.mask) && Kotlin.equals(this.value, other.value)))));
  };
  function trim($receiver_3, nBits) {
    return $receiver_3 & (1 << nBits) - 1;
  }
  function encodeComponent(inst, bits, value) {
    var offset = bits.first;
    var mask = maskFromRange(bits);
    return inst.or_1equa$(new MInt(mask, value << offset));
  }
  function encodeData(components) {
    var accumulator = new MInt();
    if (!components.isEmpty()) {
      var iterator_3 = components.listIterator_za3lpa$(components.size);
      while (iterator_3.hasPrevious()) {
        var p = iterator_3.previous();
        var acc = accumulator;
        var tmp$_9 = p;
        var bits = tmp$_9.component1()
        , data = tmp$_9.component2();
        accumulator = encodeComponent(acc, bits, data);
      }
    }
    return accumulator;
  }
  function encodeData_0(components) {
    return encodeData(toList(components));
  }
  function encodeCond(cond_1) {
    var tmp$_9;
    return encodeData_0([to(condBits, (tmp$_9 = cond_1 != null ? cond_1.opcode : null) != null ? tmp$_9 : Condition$AL_getInstance().opcode)]);
  }
  function encodePrefix(prefix) {
    return encodeData_0([to(prefixBits, prefix)]);
  }
  function encodeSbz(rnBits_0) {
    return encodeData_0([to(rnBits_0, 0)]);
  }
  function encodeInstruction(mask, components) {
    return mask.toMInt().or_1equa$(encodeData(components));
  }
  var castExpr = Kotlin.defineInlineFunction('armsim.castExpr_o4a95$', function (castExpr$TExprAst_0, isTExprAst, node) {
    if (isTExprAst(node)) {
      return node;
    }
     else
      throw new _.AssemblerException('Expected ' + Kotlin.toString(Kotlin.getKClass(castExpr$TExprAst_0).simpleName) + ', got ' + Kotlin.toString(Kotlin.getKClassFromExpression(node).simpleName));
  });
  function encodeRegisterIndex(rBits, r) {
    if (!(new IntRange(0, 15)).contains_mef7kx$(r.index))
      throw new AssemblerException('r.index');
    return encodeData(listOf(to(rBits, r.index)));
  }
  function encodeRegister(rBits, r) {
    return encodeRegisterIndex(rBits, r);
  }
  function encodeRegisterOpt(rBits, r) {
    var tmp$_9;
    return (tmp$_9 = r != null ? encodeRegister(rBits, r) : null) != null ? tmp$_9 : new MInt();
  }
  function encodeRegisters(rd, rn, rm) {
    if (rd === void 0)
      rd = null;
    if (rn === void 0)
      rn = null;
    if (rm === void 0)
      rm = null;
    return encodeRegisterOpt(rdBits, rd).or_1equa$(encodeRegisterOpt(rnBits, rn)).or_1equa$(encodeRegisterOpt(rmBits, rm));
  }
  function encodeCaps(inst, caps) {
    var tmp$_9, tmp$_10;
    var condData = (tmp$_10 = (tmp$_9 = caps.cond) != null ? tmp$_9.opcode : null) != null ? tmp$_10 : Condition$AL_getInstance().opcode;
    var s_0 = inst.category === InstructionCategory$DATA_PROCESSING_getInstance() && caps.s ? 1 : 0;
    return encodeData(listOf_0([to(condBits, condData), to(sBit, s_0)]));
  }
  function encodeShift(shifterOperand) {
    var tmp$_9, tmp$_10, tmp$_11;
    tmp$_9 = shifterOperand.size;
    if (tmp$_9 === 1) {
      var onlyArg = first(shifterOperand);
      if (Kotlin.isType(onlyArg, RegisterAst)) {
        var rm = asRegister(onlyArg);
        tmp$_11 = encodeRegisters(void 0, void 0, rm);
      }
       else if (Kotlin.isType(onlyArg, ConstAst)) {
        var rotateImm = 0;
        var castExpr$result;
        if (Kotlin.isType(onlyArg, ConstAst)) {
          castExpr$result = onlyArg;
        }
         else
          throw new _.AssemblerException('Expected ' + Kotlin.toString(Kotlin.getKClass(ConstAst).simpleName) + ', got ' + Kotlin.toString(Kotlin.getKClassFromExpression(onlyArg).simpleName));
        var immed = castExpr$result.value;
        tmp$_11 = encodeData_0([to(iBit, 1), to(rotateImmBits, rotateImm), to(immed8Bits, immed)]);
      }
       else
        throw new AssemblerException('Expected register or constant');
    }
     else if (tmp$_9 === 2) {
      var node = shifterOperand.get_za3lpa$(0);
      var castExpr$result_0;
      if (Kotlin.isType(node, RegisterAst)) {
        castExpr$result_0 = node;
      }
       else
        throw new _.AssemblerException('Expected ' + Kotlin.toString(Kotlin.getKClass(RegisterAst).simpleName) + ', got ' + Kotlin.toString(Kotlin.getKClassFromExpression(node).simpleName));
      var rm_0 = castExpr$result_0.index;
      var node_0 = shifterOperand.get_za3lpa$(1);
      var castExpr$result_1;
      if (Kotlin.isType(node_0, ShiftAst)) {
        castExpr$result_1 = node_0;
      }
       else
        throw new _.AssemblerException('Expected ' + Kotlin.toString(Kotlin.getKClass(ShiftAst).simpleName) + ', got ' + Kotlin.toString(Kotlin.getKClassFromExpression(node_0).simpleName));
      var shift = castExpr$result_1;
      var shiftOperator = ShiftOperator$valueOf(shift.operator);
      tmp$_10 = shift.arg;
      if (Kotlin.isType(tmp$_10, RegisterAst)) {
        var rs = asRegister(shift.arg);
        tmp$_11 = encodeData_0([to(rmBits, rm_0)]);
      }
       else if (Kotlin.isType(tmp$_10, ConstAst)) {
        var node_1 = shift.arg;
        var castExpr$result_2;
        if (Kotlin.isType(node_1, ConstAst)) {
          castExpr$result_2 = node_1;
        }
         else
          throw new _.AssemblerException('Expected ' + Kotlin.toString(Kotlin.getKClass(ConstAst).simpleName) + ', got ' + Kotlin.toString(Kotlin.getKClassFromExpression(node_1).simpleName));
        var shiftImm = castExpr$result_2.value;
        tmp$_11 = encodeData_0([to(iBit, 0), to(shiftImmBits, shiftImm), to(shiftBits, shiftOperator.opcode), to(bit4, 0), to(rmBits, rm_0)]);
      }
       else
        throw new AssemblerException('Expected register or constant');
    }
     else
      throw new AssemblerException('Too many arguments');
    return tmp$_11;
  }
  function encodeIpuwBits(i, p, u, w) {
    if (i === void 0)
      i = 0;
    if (p === void 0)
      p = 0;
    if (u === void 0)
      u = 0;
    if (w === void 0)
      w = 0;
    return 0;
  }
  function encodeSignedRm(rm) {
    var u = 1;
    return encodeData_0([to(uBit, u)]).or_1equa$(encodeRegisterIndex(rmBits, rm));
  }
  function encodeAddressingMode(addressingModeArgs) {
    var tmp$_9, tmp$_10, tmp$_11, tmp$_12, tmp$_13, tmp$_14, tmp$_15, tmp$_16;
    var node = addressingModeArgs.get_za3lpa$(0);
    var castExpr$result;
    if (Kotlin.isType(node, BracketAst)) {
      castExpr$result = node;
    }
     else
      throw new _.AssemblerException('Expected ' + Kotlin.toString(Kotlin.getKClass(BracketAst).simpleName) + ', got ' + Kotlin.toString(Kotlin.getKClassFromExpression(node).simpleName));
    var bracketArgs = castExpr$result.arglist.args;
    var bRn = Kotlin.isType(tmp$_9 = getOrNull(bracketArgs, 0), RegisterAst) ? tmp$_9 : null;
    var bOffset = Kotlin.isType(tmp$_10 = getOrNull(bracketArgs, 1), ConstAst) ? tmp$_10 : null;
    var bRm = Kotlin.isType(tmp$_11 = getOrNull(bracketArgs, 1), RegisterAst) ? tmp$_11 : null;
    var bShift = Kotlin.isType(tmp$_12 = getOrNull(bracketArgs, 2), ShiftAst) ? tmp$_12 : null;
    var tOffset = Kotlin.isType(tmp$_13 = getOrNull(addressingModeArgs, 1), ConstAst) ? tmp$_13 : null;
    var tRm = Kotlin.isType(tmp$_14 = getOrNull(addressingModeArgs, 1), RegisterAst) ? tmp$_14 : null;
    var tShift = Kotlin.isType(tmp$_15 = getOrNull(addressingModeArgs, 2), ShiftAst) ? tmp$_15 : null;
    var bArgs = bracketArgs.size;
    var tArgs = addressingModeArgs.size - 1 | 0;
    if (bRn == null)
      throw new AssemblerException('addressing mode');
    if (tArgs === 0)
      if (bArgs === 1 || (bArgs === 2 && bOffset != null)) {
        var tmp$_17;
        if (bOffset != null) {
          var castExpr$result_0;
          if (Kotlin.isType(bOffset, ConstAst)) {
            castExpr$result_0 = bOffset;
          }
           else
            throw new _.AssemblerException('Expected ' + Kotlin.toString(Kotlin.getKClass(ConstAst).simpleName) + ', got ' + Kotlin.toString(Kotlin.getKClassFromExpression(bOffset).simpleName));
          tmp$_17 = castExpr$result_0.value;
        }
         else
          tmp$_17 = null;
        var offset = (tmp$_16 = tmp$_17) != null ? tmp$_16 : 0;
        var p = 0;
        var u = 1;
        return encodeRegisters(void 0, bRn).or_1equa$(encodeData_0([to(iBit, 0), to(pBit, p), to(uBit, u), to(offset12Bits, offset)]));
      }
       else if (bArgs === 2 && bRm != null)
        return encodeRegisters(void 0, bRn).or_1equa$(encodeSignedRm(bRm));
      else if (bArgs !== 2 || bRm == null || bShift == null)
        throw new AssemblerException('addressing mode');
    else if (bArgs === 1) {
      if (tArgs !== 1 || tOffset == null)
        if (tArgs !== 1 || tRm == null)
          if (tArgs !== 2 || tRm == null || tShift == null)
            throw new AssemblerException('addressing mode');
    }
     else
      throw new AssemblerException('addressing mode');
    return new MInt();
  }
  function emitDataProcessingInstruction2Arg(inst, arglist, caps) {
    var tmp$_9;
    var args = arglist.args;
    var rd = Kotlin.isType(tmp$_9 = args.get_za3lpa$(0), RegisterAst) ? tmp$_9 : Kotlin.throwCCE();
    return encodeData_0([to(prefixBits, 0), to(opcodeBits, inst.opcode)]).or_1equa$(encodeSbz(rnBits)).or_1equa$(encodeRegisters(rd)).or_1equa$(encodeCaps(inst, caps)).or_1equa$(encodeShift(drop(args, 1)));
  }
  function emitDataProcessingInstruction3Arg(inst, arglist, caps) {
    var tmp$_9, tmp$_10;
    var args = arglist.args;
    var rd = Kotlin.isType(tmp$_9 = args.get_za3lpa$(0), RegisterAst) ? tmp$_9 : Kotlin.throwCCE();
    var rn = Kotlin.isType(tmp$_10 = args.get_za3lpa$(1), RegisterAst) ? tmp$_10 : Kotlin.throwCCE();
    return encodeData_0([to(prefixBits, 0), to(opcodeBits, inst.opcode)]).or_1equa$(encodeRegisters(rd, rn)).or_1equa$(encodeCaps(inst, caps)).or_1equa$(encodeShift(drop(args, 2)));
  }
  function emitLoadAndStoreInstruction(inst, arglist, caps) {
    var args = arglist.args;
    var rd = asRegister(args.get_za3lpa$(0));
    var l_0 = inst === Instruction$LDR_getInstance() ? 1 : 0;
    return encodeCond(caps.cond).or_1equa$(encodePrefix(1)).or_1equa$(encodeData_0([to(bBit, 0), to(lBit20, l_0), to(wBit, 1)])).or_1equa$(encodeRegisters(rd)).or_1equa$(encodeAddressingMode(drop(args, 1)));
  }
  function asRegister(exprAst) {
    if (!Kotlin.isType(exprAst, RegisterAst))
      throw new AssemblerException('Expected register, got ' + Kotlin.toString(Kotlin.getKClassFromExpression(exprAst).simpleName));
    return exprAst;
  }
  function Assembler(input) {
    this.ast_0 = (new Parser(new Lexer(input))).parse();
    var $receiver_3 = this.ast_0.instructions;
    var destination_3 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var tmp$_9, tmp$_10;
    var index = 0;
    tmp$_9 = $receiver_3.iterator();
    while (tmp$_9.hasNext()) {
      var item_2 = tmp$_9.next();
      var tmp$_11;
      var index_0 = (tmp$_10 = index, index = tmp$_10 + 1 | 0, tmp$_10);
      var tmp$_12;
      if ((tmp$_11 = (tmp$_12 = item_2.label) != null ? to(tmp$_12.name, index_0) : null) != null) {
        destination_3.add_11rb$(tmp$_11);
      }
    }
    this.labels_0 = toMap(destination_3);
    this.locationCounter_0 = 0;
  }
  Assembler.prototype.emitB_0 = function (arglist, caps) {
    var tmp$_9, tmp$_10, tmp$_11;
    var args = arglist.args;
    var cond_1 = (tmp$_10 = (tmp$_9 = caps.cond) != null ? tmp$_9.opcode : null) != null ? tmp$_10 : Condition$AL_getInstance().opcode;
    var l_0 = 0;
    var node = args.get_za3lpa$(0);
    var castExpr$result;
    if (Kotlin.isType(node, IdentAst)) {
      castExpr$result = node;
    }
     else
      throw new _.AssemblerException('Expected ' + Kotlin.toString(Kotlin.getKClass(IdentAst).simpleName) + ', got ' + Kotlin.toString(Kotlin.getKClassFromExpression(node).simpleName));
    var label = castExpr$result.name;
    var targetAddress = (tmp$_11 = this.labels_0.get_11rb$(label)) != null ? tmp$_11 : Kotlin.throwNPE();
    var signedImmed24 = trim(targetAddress - this.locationCounter_0 | 0, 24);
    return encodeInstruction(branchMask, listOf_0([to(condBits, cond_1), to(lBit24, l_0), to(signedImmed24Bits, signedImmed24)]));
  };
  Assembler.prototype.encodeNextInstruction_gbrrjo$ = function (instAst) {
    var tmp$_9, tmp$_11, tmp$_12, tmp$_13;
    var mnemonic = instAst.mnemonic.value;
    var arglist = instAst.arglist;
    tmp$_9 = mnemonics.get_11rb$(mnemonic);
    if (tmp$_9 == null) {
      throw new AssemblerException('Unrecognized mnemonic ' + mnemonic);
    }
    var tmp$_10 = tmp$_9;
    var inst = tmp$_10.component1()
    , caps = tmp$_10.component2();
    tmp$_11 = inst.category;
    if (Kotlin.equals(tmp$_11, InstructionCategory$BRANCH_getInstance()))
      tmp$_13 = this.emitB_0(arglist, caps);
    else if (Kotlin.equals(tmp$_11, InstructionCategory$DATA_PROCESSING_getInstance())) {
      tmp$_12 = inst.args;
      if (tmp$_12 === 2)
        tmp$_13 = emitDataProcessingInstruction2Arg(inst, arglist, caps);
      else if (tmp$_12 === 3)
        tmp$_13 = emitDataProcessingInstruction3Arg(inst, arglist, caps);
      else
        throw new AssemblerException('inst.args');
    }
     else if (Kotlin.equals(tmp$_11, InstructionCategory$LOAD_AND_STORE_getInstance()))
      tmp$_13 = emitLoadAndStoreInstruction(inst, arglist, caps);
    else
      tmp$_13 = Kotlin.noWhenBranchMatched();
    var encodedInst = tmp$_13;
    if (encodedInst.mask !== ~0)
      throw new AssemblerException('Instruction not fully encoded');
    this.locationCounter_0 = this.locationCounter_0 + 1 | 0;
    return encodedInst.value;
  };
  Assembler.prototype.assemble = function () {
    var $receiver_3 = this.ast_0.instructions;
    var transform = Kotlin.getCallableRef('encodeNextInstruction', function ($receiver_4, instAst) {
      return $receiver_4.encodeNextInstruction_gbrrjo$(instAst);
    }.bind(null, this));
    var destination_3 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver_3, 10));
    var tmp$_9;
    tmp$_9 = $receiver_3.iterator();
    while (tmp$_9.hasNext()) {
      var item_2 = tmp$_9.next();
      destination_3.add_11rb$(transform(item_2));
    }
    var instructions = destination_3;
    return new Program(instructions);
  };
  Assembler.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Assembler',
    interfaces: []
  };
  function combine$lambda(thisItem, otherItem) {
    return new Pair(thisItem, otherItem);
  }
  function combine($receiver_3, other) {
    return combine_0($receiver_3, other, combine$lambda);
  }
  function combine_0($receiver_3, other, transformer) {
    var destination_3 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var tmp$_9;
    tmp$_9 = $receiver_3.iterator();
    while (tmp$_9.hasNext()) {
      var element_0 = tmp$_9.next();
      var destination_4 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$(other, 10));
      var tmp$_10;
      tmp$_10 = other.iterator();
      while (tmp$_10.hasNext()) {
        var item_2 = tmp$_10.next();
        destination_4.add_11rb$(transformer(element_0, item_2));
      }
      var list_0 = destination_4;
      Kotlin.kotlin.collections.addAll_ipc267$(destination_3, list_0);
    }
    return destination_3;
  }
  function combine3(iter1, iter2, iter3) {
    var tmp$_9, tmp$_10, tmp$_11;
    var rv = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    tmp$_9 = iter1.iterator();
    while (tmp$_9.hasNext()) {
      var a = tmp$_9.next();
      tmp$_10 = iter2.iterator();
      while (tmp$_10.hasNext()) {
        var b = tmp$_10.next();
        tmp$_11 = iter3.iterator();
        while (tmp$_11.hasNext()) {
          var c = tmp$_11.next();
          rv.add_11rb$(listOf_0([a, b, c]));
        }
      }
    }
    return rv;
  }
  function InstructionCaps(cond_1, s_0) {
    this.cond = cond_1;
    this.s = s_0;
  }
  InstructionCaps.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'InstructionCaps',
    interfaces: []
  };
  InstructionCaps.prototype.component1 = function () {
    return this.cond;
  };
  InstructionCaps.prototype.component2 = function () {
    return this.s;
  };
  InstructionCaps.prototype.copy_k6vx7h$ = function (cond_1, s_0) {
    return new InstructionCaps(cond_1 === void 0 ? this.cond : cond_1, s_0 === void 0 ? this.s : s_0);
  };
  InstructionCaps.prototype.toString = function () {
    return 'InstructionCaps(cond=' + Kotlin.toString(this.cond) + (', s=' + Kotlin.toString(this.s)) + ')';
  };
  InstructionCaps.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.cond) | 0;
    result = result * 31 + Kotlin.hashCode(this.s) | 0;
    return result;
  };
  InstructionCaps.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.cond, other.cond) && Kotlin.equals(this.s, other.s)))));
  };
  function InstructionEncoder(handlers) {
    this.handlers_0 = handlers;
  }
  InstructionEncoder.prototype.encode_gbrrjo$ = function (instAst) {
    var tmp$_9, tmp$_11;
    var fullMnemonic_1 = instAst.mnemonic.value;
    var tmp$_10 = (tmp$_9 = mnemonics.get_11rb$(fullMnemonic_1)) != null ? tmp$_9 : Kotlin.throwNPE();
    var inst = tmp$_10.component1()
    , caps = tmp$_10.component2();
    tmp$_11 = this.handlers_0.get_11rb$(inst);
    if (tmp$_11 == null) {
      throw new AssemblerException('Unrecognized mnemonic: ' + fullMnemonic_1);
    }
    var handler = tmp$_11;
    return handler(instAst.arglist, caps);
  };
  InstructionEncoder.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'InstructionEncoder',
    interfaces: []
  };
  function isLetter($receiver_3) {
    return (new CharRange(97, 122)).contains_mef7kx$(Kotlin.unboxChar($receiver_3)) || (new CharRange(65, 90)).contains_mef7kx$(Kotlin.unboxChar($receiver_3));
  }
  function isDigit($receiver_3) {
    return (new CharRange(48, 57)).contains_mef7kx$(Kotlin.unboxChar($receiver_3));
  }
  function TokenKind(name, ordinal, char) {
    if (char === void 0)
      char = null;
    Enum.call(this);
    this.char = char;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function TokenKind_initFields() {
    TokenKind_initFields = function () {
    };
    TokenKind$COMMA_instance = new TokenKind('COMMA', 0, 44);
    TokenKind$COMMENT_instance = new TokenKind('COMMENT', 1);
    TokenKind$CONST_instance = new TokenKind('CONST', 2);
    TokenKind$EOL_instance = new TokenKind('EOL', 3, 10);
    TokenKind$IDENT_instance = new TokenKind('IDENT', 4);
    TokenKind$MNEMONIC_instance = new TokenKind('MNEMONIC', 5);
    TokenKind$REGISTER_instance = new TokenKind('REGISTER', 6);
    TokenKind$WHITESPACE_instance = new TokenKind('WHITESPACE', 7);
    TokenKind$SHIFT_OPERATOR_instance = new TokenKind('SHIFT_OPERATOR', 8);
    TokenKind$LBRACKET_instance = new TokenKind('LBRACKET', 9, 91);
    TokenKind$RBRACKET_instance = new TokenKind('RBRACKET', 10, 93);
  }
  var TokenKind$COMMA_instance;
  function TokenKind$COMMA_getInstance() {
    TokenKind_initFields();
    return TokenKind$COMMA_instance;
  }
  var TokenKind$COMMENT_instance;
  function TokenKind$COMMENT_getInstance() {
    TokenKind_initFields();
    return TokenKind$COMMENT_instance;
  }
  var TokenKind$CONST_instance;
  function TokenKind$CONST_getInstance() {
    TokenKind_initFields();
    return TokenKind$CONST_instance;
  }
  var TokenKind$EOL_instance;
  function TokenKind$EOL_getInstance() {
    TokenKind_initFields();
    return TokenKind$EOL_instance;
  }
  var TokenKind$IDENT_instance;
  function TokenKind$IDENT_getInstance() {
    TokenKind_initFields();
    return TokenKind$IDENT_instance;
  }
  var TokenKind$MNEMONIC_instance;
  function TokenKind$MNEMONIC_getInstance() {
    TokenKind_initFields();
    return TokenKind$MNEMONIC_instance;
  }
  var TokenKind$REGISTER_instance;
  function TokenKind$REGISTER_getInstance() {
    TokenKind_initFields();
    return TokenKind$REGISTER_instance;
  }
  var TokenKind$WHITESPACE_instance;
  function TokenKind$WHITESPACE_getInstance() {
    TokenKind_initFields();
    return TokenKind$WHITESPACE_instance;
  }
  var TokenKind$SHIFT_OPERATOR_instance;
  function TokenKind$SHIFT_OPERATOR_getInstance() {
    TokenKind_initFields();
    return TokenKind$SHIFT_OPERATOR_instance;
  }
  var TokenKind$LBRACKET_instance;
  function TokenKind$LBRACKET_getInstance() {
    TokenKind_initFields();
    return TokenKind$LBRACKET_instance;
  }
  var TokenKind$RBRACKET_instance;
  function TokenKind$RBRACKET_getInstance() {
    TokenKind_initFields();
    return TokenKind$RBRACKET_instance;
  }
  TokenKind.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'TokenKind',
    interfaces: [Enum]
  };
  function TokenKind$values() {
    return [TokenKind$COMMA_getInstance(), TokenKind$COMMENT_getInstance(), TokenKind$CONST_getInstance(), TokenKind$EOL_getInstance(), TokenKind$IDENT_getInstance(), TokenKind$MNEMONIC_getInstance(), TokenKind$REGISTER_getInstance(), TokenKind$WHITESPACE_getInstance(), TokenKind$SHIFT_OPERATOR_getInstance(), TokenKind$LBRACKET_getInstance(), TokenKind$RBRACKET_getInstance()];
  }
  TokenKind.values = TokenKind$values;
  function TokenKind$valueOf(name) {
    switch (name) {
      case 'COMMA':
        return TokenKind$COMMA_getInstance();
      case 'COMMENT':
        return TokenKind$COMMENT_getInstance();
      case 'CONST':
        return TokenKind$CONST_getInstance();
      case 'EOL':
        return TokenKind$EOL_getInstance();
      case 'IDENT':
        return TokenKind$IDENT_getInstance();
      case 'MNEMONIC':
        return TokenKind$MNEMONIC_getInstance();
      case 'REGISTER':
        return TokenKind$REGISTER_getInstance();
      case 'WHITESPACE':
        return TokenKind$WHITESPACE_getInstance();
      case 'SHIFT_OPERATOR':
        return TokenKind$SHIFT_OPERATOR_getInstance();
      case 'LBRACKET':
        return TokenKind$LBRACKET_getInstance();
      case 'RBRACKET':
        return TokenKind$RBRACKET_getInstance();
      default:Kotlin.throwISE('No enum constant TokenKind.' + name);
    }
  }
  TokenKind.valueOf_61zpoe$ = TokenKind$valueOf;
  function Token(kind, range, stringValue, intValue) {
    if (stringValue === void 0)
      stringValue = '';
    if (intValue === void 0)
      intValue = -1;
    this.kind = kind;
    this.range = range;
    this.stringValue = stringValue;
    this.intValue = intValue;
  }
  Token.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Token',
    interfaces: []
  };
  Token.prototype.component1 = function () {
    return this.kind;
  };
  Token.prototype.component2 = function () {
    return this.range;
  };
  Token.prototype.component3 = function () {
    return this.stringValue;
  };
  Token.prototype.component4 = function () {
    return this.intValue;
  };
  Token.prototype.copy_gtc2sc$ = function (kind, range, stringValue, intValue) {
    return new Token(kind === void 0 ? this.kind : kind, range === void 0 ? this.range : range, stringValue === void 0 ? this.stringValue : stringValue, intValue === void 0 ? this.intValue : intValue);
  };
  Token.prototype.toString = function () {
    return 'Token(kind=' + Kotlin.toString(this.kind) + (', range=' + Kotlin.toString(this.range)) + (', stringValue=' + Kotlin.toString(this.stringValue)) + (', intValue=' + Kotlin.toString(this.intValue)) + ')';
  };
  Token.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.kind) | 0;
    result = result * 31 + Kotlin.hashCode(this.range) | 0;
    result = result * 31 + Kotlin.hashCode(this.stringValue) | 0;
    result = result * 31 + Kotlin.hashCode(this.intValue) | 0;
    return result;
  };
  Token.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.kind, other.kind) && Kotlin.equals(this.range, other.range) && Kotlin.equals(this.stringValue, other.stringValue) && Kotlin.equals(this.intValue, other.intValue)))));
  };
  function LexerException(message, cause) {
    if (cause === void 0)
      cause = null;
    Exception.call(this, message);
    this.name = 'LexerException';
  }
  LexerException.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'LexerException',
    interfaces: [Exception]
  };
  var inlineWhitespace;
  var registerRegex;
  function Lexer(input) {
    this.input_0 = input;
    this.inputOffset_0 = 0;
  }
  Lexer.prototype.readChar_0 = function () {
    var tmp$_9;
    if (this.inputOffset_0 < this.input_0.length) {
      return Kotlin.unboxChar(this.input_0.charCodeAt((tmp$_9 = this.inputOffset_0, this.inputOffset_0 = tmp$_9 + 1 | 0, tmp$_9)));
    }
     else
      return null;
  };
  Lexer.prototype.peekChar_0 = function () {
    if (this.inputOffset_0 < this.input_0.length) {
      return Kotlin.unboxChar(this.input_0.charCodeAt(this.inputOffset_0));
    }
     else
      return null;
  };
  Lexer.prototype.expectChar_0 = function (expected) {
    var actual = Kotlin.unboxChar(this.readChar_0());
    if (Kotlin.unboxChar(actual) !== Kotlin.unboxChar(expected)) {
      throw new Exception();
    }
  };
  Lexer.prototype.makeRange_0 = function (function_0) {
    var start = this.inputOffset_0;
    function_0();
    var last_0 = this.inputOffset_0 - 1 | 0;
    return new IntRange(start, last_0);
  };
  function Lexer$readNumber$lambda(this$Lexer) {
    return function () {
      var tmp$_9;
      var tmp$_10;
      if ((tmp$_9 = Kotlin.unboxChar(this$Lexer.peekChar_0())) != null) {
        var $receiver_3 = Kotlin.toBoxedChar(tmp$_9);
        var this$Lexer_0 = this$Lexer;
        tmp$_10 = Kotlin.toBoxedChar(isDigit(Kotlin.unboxChar($receiver_3)) || isLetter(Kotlin.unboxChar($receiver_3)) || Kotlin.unboxChar($receiver_3) === 45 ? this$Lexer_0.readChar_0() : null);
      }
       else
        tmp$_10 = null;
      return Kotlin.toBoxedChar(tmp$_10);
    };
  }
  Lexer.prototype.readNumber_0 = function () {
    var tmp$_9;
    var digits = joinToString(generateSequence(Lexer$readNumber$lambda(this)), '');
    try {
      if (startsWith(digits, '-0x'))
        tmp$_9 = -1 * toInt(drop_0(digits, 3), 16) | 0;
      else if (startsWith(digits, '0x'))
        tmp$_9 = toInt(drop_0(digits, 2), 16);
      else
        tmp$_9 = toInt_0(digits);
      return tmp$_9;
    }
     catch (e) {
      if (Kotlin.isType(e, NumberFormatException)) {
        throw new LexerException('Invalid constant', e);
      }
       else
        throw e;
    }
  };
  Lexer.prototype.readCharToken_0 = function (kind) {
    var tmp$_9;
    this.expectChar_0((tmp$_9 = Kotlin.unboxChar(kind.char)) != null ? tmp$_9 : Kotlin.throwNPE());
    return new Token(kind, new IntRange(this.inputOffset_0 - 1 | 0, this.inputOffset_0 - 1 | 0));
  };
  Lexer.prototype.readComma_0 = function () {
    return this.readCharToken_0(TokenKind$COMMA_getInstance());
  };
  function Lexer$readComment$lambda(this$Lexer) {
    return function () {
      this$Lexer.expectChar_0(59);
      while (!listOf_0([Kotlin.toBoxedChar(10), null]).contains_11rb$(Kotlin.toBoxedChar(this$Lexer.peekChar_0()))) {
        this$Lexer.readChar_0();
      }
    };
  }
  Lexer.prototype.readComment_0 = function () {
    return new Token(TokenKind$COMMENT_getInstance(), this.makeRange_0(Lexer$readComment$lambda(this)));
  };
  function Lexer$readConst$lambda(this$Lexer, closure$value) {
    return function () {
      this$Lexer.expectChar_0(35);
      closure$value.v = this$Lexer.readNumber_0();
    };
  }
  Lexer.prototype.readConst_0 = function () {
    var value = {v: 0};
    return new Token(TokenKind$CONST_getInstance(), this.makeRange_0(Lexer$readConst$lambda(this, value)), void 0, value.v);
  };
  function Lexer$readEol$lambda(this$Lexer) {
    return function () {
      if (Kotlin.unboxChar(this$Lexer.peekChar_0()) === 13)
        this$Lexer.readChar_0();
      this$Lexer.expectChar_0(10);
    };
  }
  Lexer.prototype.readEol_0 = function () {
    return new Token(TokenKind$EOL_getInstance(), this.makeRange_0(Lexer$readEol$lambda(this)));
  };
  function Lexer$readIdentAlike$lambda(this$Lexer, closure$name) {
    return function () {
      var tmp$_9, tmp$_10;
      while (((tmp$_9 = Kotlin.unboxChar(this$Lexer.peekChar_0())) != null ? isLetter(tmp$_9) : null) === true || ((tmp$_10 = Kotlin.unboxChar(this$Lexer.peekChar_0())) != null ? isDigit(tmp$_10) : null) === true) {
        closure$name.v += String.fromCharCode(Kotlin.unboxChar(this$Lexer.readChar_0()));
      }
    };
  }
  Lexer.prototype.readIdentAlike_0 = function () {
    var tmp$_9, tmp$_10;
    var name = {v: ''};
    var range = this.makeRange_0(Lexer$readIdentAlike$lambda(this, name));
    var m = registerRegex.matchEntire_6bul2c$(name.v);
    if (m != null) {
      var index = toInt_0(((tmp$_9 = m.groups.get_za3lpa$(1)) != null ? tmp$_9 : Kotlin.throwNPE()).value);
      return new Token(TokenKind$REGISTER_getInstance(), range, void 0, index);
    }
     else {
      var $receiver_3 = mnemonics;
      var tmp$_11;
      if ((Kotlin.isType(tmp$_11 = $receiver_3, Kotlin.kotlin.collections.Map) ? tmp$_11 : Kotlin.throwCCE()).containsKey_11rb$(name.v))
        tmp$_10 = TokenKind$MNEMONIC_getInstance();
      else if (shiftOperators.contains_11rb$(name.v))
        tmp$_10 = TokenKind$SHIFT_OPERATOR_getInstance();
      else
        tmp$_10 = TokenKind$IDENT_getInstance();
      var kind = tmp$_10;
      return new Token(kind, range, name.v);
    }
  };
  function Lexer$readRegister$lambda(this$Lexer, closure$value) {
    return function () {
      var tmp$_9;
      var r = Kotlin.unboxChar(this$Lexer.readChar_0());
      if (((tmp$_9 = Kotlin.unboxChar(r)) != null ? String.fromCharCode(Kotlin.toBoxedChar(tmp$_9)).toLowerCase().charCodeAt(0) : null) !== 114) {
        throw new Exception();
      }
      closure$value.v = this$Lexer.readNumber_0();
    };
  }
  Lexer.prototype.readRegister_0 = function () {
    var value = {v: 0};
    return new Token(TokenKind$REGISTER_getInstance(), this.makeRange_0(Lexer$readRegister$lambda(this, value)), void 0, value.v);
  };
  function Lexer$readWhitespace$lambda(this$Lexer) {
    return function () {
      while (contains_0(inlineWhitespace, Kotlin.toBoxedChar(this$Lexer.peekChar_0()))) {
        this$Lexer.readChar_0();
      }
    };
  }
  Lexer.prototype.readWhitespace_0 = function () {
    return new Token(TokenKind$WHITESPACE_getInstance(), this.makeRange_0(Lexer$readWhitespace$lambda(this)));
  };
  Lexer.prototype.readToken = function () {
    var tmp$_9;
    var c = Kotlin.unboxChar(this.peekChar_0());
    var cStr = Kotlin.toString(Kotlin.toBoxedChar(c));
    if (Kotlin.unboxChar(c) == null)
      tmp$_9 = null;
    else if (Kotlin.unboxChar(c) === 44)
      tmp$_9 = this.readComma_0();
    else if (Kotlin.unboxChar(c) === 59)
      tmp$_9 = this.readComment_0();
    else if (Kotlin.unboxChar(c) === 35)
      tmp$_9 = this.readConst_0();
    else if (Kotlin.unboxChar(c) === 13)
      tmp$_9 = this.readEol_0();
    else if (Kotlin.unboxChar(c) === 10)
      tmp$_9 = this.readEol_0();
    else if (Kotlin.unboxChar(c) === 91)
      tmp$_9 = this.readCharToken_0(TokenKind$LBRACKET_getInstance());
    else if (Kotlin.unboxChar(c) === 93)
      tmp$_9 = this.readCharToken_0(TokenKind$RBRACKET_getInstance());
    else if (isLetter(Kotlin.unboxChar(c)))
      tmp$_9 = this.readIdentAlike_0();
    else if (inlineWhitespace.contains_11rb$(Kotlin.toBoxedChar(c)))
      tmp$_9 = this.readWhitespace_0();
    else
      throw new LexerException('Unexpected character: `' + cStr + '` (' + (Kotlin.unboxChar(c) | 0) + ')');
    return tmp$_9;
  };
  Lexer.prototype.peekToken = function () {
    var offset = this.inputOffset_0;
    var token = this.readToken();
    this.inputOffset_0 = offset;
    return token;
  };
  function Lexer$iterator$ObjectLiteral(this$Lexer) {
    this.this$Lexer = this$Lexer;
  }
  Lexer$iterator$ObjectLiteral.prototype.hasNext = function () {
    return Kotlin.unboxChar(this.this$Lexer.peekChar_0()) != null;
  };
  Lexer$iterator$ObjectLiteral.prototype.next = function () {
    var tmp$_9;
    return (tmp$_9 = this.this$Lexer.readToken()) != null ? tmp$_9 : Kotlin.throwNPE();
  };
  Lexer$iterator$ObjectLiteral.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    interfaces: [Iterator]
  };
  Lexer.prototype.iterator = function () {
    return new Lexer$iterator$ObjectLiteral(this);
  };
  Lexer.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Lexer',
    interfaces: [Iterable]
  };
  function ParserException(s_0) {
    Exception.call(this, s_0);
    this.name = 'ParserException';
  }
  ParserException.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ParserException',
    interfaces: [Exception]
  };
  function ArglistAst(args) {
    this.args = args;
  }
  ArglistAst.prototype.toString = function () {
    return joinToString_0(this.args, ', ');
  };
  ArglistAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ArglistAst',
    interfaces: []
  };
  function ExprAst() {
  }
  ExprAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ExprAst',
    interfaces: []
  };
  function ConstAst(value) {
    ExprAst.call(this);
    this.value = value;
  }
  ConstAst.prototype.toString = function () {
    return '#' + this.value;
  };
  ConstAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ConstAst',
    interfaces: [ExprAst]
  };
  function IdentAst(name) {
    ExprAst.call(this);
    this.name = name;
  }
  IdentAst.prototype.toString = function () {
    return this.name;
  };
  IdentAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'IdentAst',
    interfaces: [ExprAst]
  };
  function RegisterAst(index) {
    ExprAst.call(this);
    this.index = index;
  }
  RegisterAst.prototype.toString = function () {
    return 'R' + this.index;
  };
  RegisterAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'RegisterAst',
    interfaces: [ExprAst]
  };
  function ShiftAst(operator, arg) {
    ExprAst.call(this);
    this.operator = operator;
    this.arg = arg;
  }
  ShiftAst.prototype.toString = function () {
    return this.operator + ' ' + this.arg;
  };
  ShiftAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ShiftAst',
    interfaces: [ExprAst]
  };
  function BracketAst(arglist) {
    ExprAst.call(this);
    this.arglist = arglist;
  }
  BracketAst.prototype.toString = function () {
    return '[' + this.arglist + ']';
  };
  BracketAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'BracketAst',
    interfaces: [ExprAst]
  };
  function InstructionAst(label, mnemonic, arglist) {
    this.label = label;
    this.mnemonic = mnemonic;
    this.arglist = arglist;
  }
  InstructionAst.prototype.toString = function () {
    return Kotlin.toString(this.label) + ': ' + this.mnemonic + ' (' + this.arglist + ')';
  };
  InstructionAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'InstructionAst',
    interfaces: []
  };
  function MnemonicAst(value) {
    this.value = value;
  }
  MnemonicAst.prototype.toString = function () {
    return this.value;
  };
  MnemonicAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'MnemonicAst',
    interfaces: []
  };
  function ProgramAst(instructions) {
    this.instructions = instructions;
  }
  ProgramAst.prototype.toString = function () {
    var $receiver_3 = this.instructions;
    var destination_3 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver_3, 10));
    var tmp$_9;
    tmp$_9 = $receiver_3.iterator();
    while (tmp$_9.hasNext()) {
      var item_2 = tmp$_9.next();
      destination_3.add_11rb$(item_2.toString());
    }
    return joinToString_0(destination_3, '\n');
  };
  ProgramAst.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ProgramAst',
    interfaces: []
  };
  function Parser(lexer) {
    this.lexer_0 = lexer;
  }
  Parser.prototype.skipIrrelevantTokens_0 = function () {
    var tmp$_9;
    while (contains_0(listOf_0([TokenKind$WHITESPACE_getInstance(), TokenKind$COMMENT_getInstance()]), (tmp$_9 = this.lexer_0.peekToken()) != null ? tmp$_9.kind : null)) {
      this.lexer_0.readToken();
    }
  };
  Parser.prototype.readToken_0 = function () {
    this.skipIrrelevantTokens_0();
    return this.lexer_0.readToken();
  };
  Parser.prototype.peekToken_0 = function () {
    this.skipIrrelevantTokens_0();
    return this.lexer_0.peekToken();
  };
  Parser.prototype.readExpectedToken_0 = function (expectedTokenKind) {
    var token = this.readToken_0();
    if (!Kotlin.equals(token != null ? token.kind : null, expectedTokenKind)) {
      var loc = token != null ? '[chars ' + token.range.first + ':' + token.range.last + ']' : '';
      throw new ParserException('Expected ' + expectedTokenKind + ', got ' + Kotlin.toString(token != null ? token.kind : null) + ' ' + loc);
    }
    return token;
  };
  Parser.prototype.readTokenOptionally_0 = function (tokenKind) {
    var tmp$_9;
    if (Kotlin.equals((tmp$_9 = this.peekToken_0()) != null ? tmp$_9.kind : null, tokenKind)) {
      return this.readToken_0();
    }
     else
      return null;
  };
  Parser.prototype.skipTokens_0 = function (tokenKind) {
    var tmp$_9;
    while (Kotlin.equals((tmp$_9 = this.peekToken_0()) != null ? tmp$_9.kind : null, tokenKind)) {
      this.readToken_0();
    }
  };
  Parser.prototype.parseConst_0 = function () {
    return new ConstAst(this.readExpectedToken_0(TokenKind$CONST_getInstance()).intValue);
  };
  Parser.prototype.parseIdent_0 = function () {
    var tmp$_9;
    return new IdentAst(((tmp$_9 = this.readToken_0()) != null ? tmp$_9 : Kotlin.throwNPE()).stringValue);
  };
  Parser.prototype.parseRegister_0 = function () {
    var tmp$_9;
    return new RegisterAst(((tmp$_9 = this.readToken_0()) != null ? tmp$_9 : Kotlin.throwNPE()).intValue);
  };
  Parser.prototype.parseShift_0 = function () {
    var tmp$_12, tmp$_9, tmp$_10, tmp$_11;
    var operator = this.readExpectedToken_0(TokenKind$SHIFT_OPERATOR_getInstance());
    tmp$_12 = operator.stringValue;
    tmp$_10 = (tmp$_9 = this.peekToken_0()) != null ? tmp$_9.kind : null;
    if (Kotlin.equals(tmp$_10, TokenKind$CONST_getInstance()))
      tmp$_11 = this.parseConst_0();
    else if (Kotlin.equals(tmp$_10, TokenKind$REGISTER_getInstance()))
      tmp$_11 = this.parseRegister_0();
    else
      throw new ParserException('Expected shift');
    return new ShiftAst(tmp$_12, tmp$_11);
  };
  Parser.prototype.parseBracket_0 = function () {
    this.readExpectedToken_0(TokenKind$LBRACKET_getInstance());
    var arglist = this.parseArglist_0();
    this.readExpectedToken_0(TokenKind$RBRACKET_getInstance());
    return new BracketAst(arglist);
  };
  Parser.prototype.parseExpr_0 = function () {
    var tmp$_9, tmp$_10;
    var token = this.peekToken_0();
    tmp$_9 = token != null ? token.kind : null;
    if (Kotlin.equals(tmp$_9, TokenKind$CONST_getInstance()))
      tmp$_10 = this.parseConst_0();
    else if (Kotlin.equals(tmp$_9, TokenKind$IDENT_getInstance()))
      tmp$_10 = this.parseIdent_0();
    else if (Kotlin.equals(tmp$_9, TokenKind$REGISTER_getInstance()))
      tmp$_10 = this.parseRegister_0();
    else if (Kotlin.equals(tmp$_9, TokenKind$SHIFT_OPERATOR_getInstance()))
      tmp$_10 = this.parseShift_0();
    else if (Kotlin.equals(tmp$_9, TokenKind$LBRACKET_getInstance()))
      tmp$_10 = this.parseBracket_0();
    else
      throw new Exception('Expected expression, got ' + Kotlin.toString(token != null ? token.kind : null));
    return tmp$_10;
  };
  Parser.prototype.parseArglist_0 = function () {
    var tmp$_9;
    var args = mutableListOf_0([this.parseExpr_0()]);
    while (Kotlin.equals((tmp$_9 = this.peekToken_0()) != null ? tmp$_9.kind : null, TokenKind$COMMA_getInstance())) {
      this.readExpectedToken_0(TokenKind$COMMA_getInstance());
      args.add_11rb$(this.parseExpr_0());
    }
    return new ArglistAst(args);
  };
  Parser.prototype.parseInstruction_0 = function () {
    var tmp$_9;
    var label = (tmp$_9 = this.readTokenOptionally_0(TokenKind$IDENT_getInstance())) != null ? new IdentAst(tmp$_9.stringValue) : null;
    this.readTokenOptionally_0(TokenKind$EOL_getInstance());
    var mnemonicToken = this.readExpectedToken_0(TokenKind$MNEMONIC_getInstance());
    var mnemonic = new MnemonicAst(mnemonicToken.stringValue);
    var arglist = this.parseArglist_0();
    return new InstructionAst(label, mnemonic, arglist);
  };
  Parser.prototype.parseNextLine_0 = function () {
    this.skipTokens_0(TokenKind$EOL_getInstance());
    return this.peekToken_0() != null ? this.parseInstruction_0() : null;
  };
  function Parser$parse$lambda(this$Parser) {
    return function () {
      return this$Parser.parseNextLine_0();
    };
  }
  Parser.prototype.parse = function () {
    return new ProgramAst(toList_0(generateSequence(Parser$parse$lambda(this))));
  };
  Parser.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Parser',
    interfaces: []
  };
  var assert = Kotlin.defineInlineFunction('armsim.assert_87ejdh$', function (value, lazyMessage) {
    if (!value) {
      var message = lazyMessage();
      throw new Kotlin.kotlin.AssertionError(message);
    }
  });
  function assert_0(value) {
    if (!value) {
      var message = 'Assertion failed';
      throw new Kotlin.kotlin.AssertionError(message);
    }
  }
  function assertEq(value, expectedValue) {
    if (!Kotlin.equals(value, expectedValue)) {
      var message = 'Expected ' + expectedValue + ', got ' + value;
      throw new Kotlin.kotlin.AssertionError(message);
    }
  }
  function assemble(src) {
    return new Vm((new Assembler(src)).assemble());
  }
  function test_vm() {
    var vm = assemble('');
    var tmp$_9;
    tmp$_9 = (new IntRange(0, 15)).iterator();
    while (tmp$_9.hasNext()) {
      var element_0 = tmp$_9.next();
      assert_0(vm.getRegisterValue_za3lpa$(element_0) === 0);
    }
  }
  var src_mov1;
  function test_mov1() {
    var vm = assemble(src_mov1);
    vm.step();
    assert_0(vm.getRegisterValue_za3lpa$(0) === 123);
  }
  var src_add1;
  function test_add1() {
    var vm = assemble(src_add1);
    vm.step();
    vm.step();
    vm.step();
    assertEq(vm.getRegisterValue_za3lpa$(0), 7);
  }
  var src_addeq1;
  function test_addeq1() {
    var vm = assemble(src_addeq1);
    vm.step();
    vm.step();
    vm.step();
    vm.step();
    assertEq(vm.getRegisterValue_za3lpa$(0), 7);
  }
  var src_addeq2;
  function test_addeq2() {
    var vm = assemble(src_addeq2);
    vm.step();
    vm.step();
    vm.step();
    vm.step();
    assertEq(vm.getRegisterValue_za3lpa$(0), 2);
  }
  var src_and1;
  function test_and1() {
    var vm = assemble(src_and1);
    vm.step();
    assertEq(vm.getRegisterValue_za3lpa$(0), 0);
  }
  var src_b1;
  function test_b1() {
    var vm = assemble(src_b1);
    vm.step();
    vm.step();
    assertEq(vm.getRegisterValue_za3lpa$(0), 0);
  }
  var src_bne1;
  function test_bne1() {
    var vm = assemble(src_bne1);
    var tmp$_9;
    tmp$_9 = (new IntRange(1, 11)).iterator();
    while (tmp$_9.hasNext()) {
      var element_0 = tmp$_9.next();
      vm.step();
    }
    assertEq(vm.getRegisterValue_za3lpa$(1), 0);
    assertEq(vm.getRegisterValue_za3lpa$(2), 3);
    assertEq(vm.getRegisterValue_za3lpa$(3), 123);
  }
  var src_sub1;
  function test_sub1() {
    var vm = assemble(src_sub1);
    vm.step();
    vm.step();
    vm.step();
    assertEq(vm.getRegisterValue_za3lpa$(0), 4);
  }
  var src_subs1;
  function test_subs1() {
    var vm = assemble(src_subs1);
    vm.step();
    vm.step();
    vm.step();
    assertEq(vm.cpsr.n, 0);
    assertEq(vm.cpsr.z, 1);
    assertEq(vm.cpsr.c, 0);
    assertEq(vm.cpsr.v, 0);
  }
  var src_program1;
  function test_program1() {
    var vm = assemble(src_program1);
    var tmp$_9;
    tmp$_9 = (new IntRange(1, 64)).iterator();
    while (tmp$_9.hasNext()) {
      var element_0 = tmp$_9.next();
      vm.step();
    }
  }
  function test() {
    test_vm();
    test_mov1();
    test_add1();
    test_addeq1();
    test_addeq2();
    test_and1();
    test_b1();
    test_bne1();
    test_sub1();
    test_subs1();
    test_program1();
  }
  var MEMORY_SIZE;
  function VmException(s_0) {
    Throwable.call(this);
    this.message_9uza4i$_0 = s_0;
    this.cause_9uza4i$_0 = null;
    Kotlin.captureStack(Throwable, this);
    this.name = 'VmException';
  }
  Object.defineProperty(VmException.prototype, 'message', {
    get: function () {
      return this.message_9uza4i$_0;
    }
  });
  Object.defineProperty(VmException.prototype, 'cause', {
    get: function () {
      return this.cause_9uza4i$_0;
    }
  });
  VmException.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'VmException',
    interfaces: [Throwable]
  };
  function InstructionDecoder(handlers) {
    this.handlers_0 = handlers;
  }
  InstructionDecoder.prototype.decode_za3lpa$ = function (instruction) {
    var tmp$_9, tmp$_10;
    var $receiver_3 = this.handlers_0;
    var firstOrNull$result;
    firstOrNull$break: {
      var tmp$_11;
      tmp$_11 = $receiver_3.iterator();
      while (tmp$_11.hasNext()) {
        var element_0 = tmp$_11.next();
        var mask = element_0.component1();
        if ((instruction & mask.andMask ^ mask.xorMask) === 0) {
          firstOrNull$result = element_0;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
    tmp$_10 = (tmp$_9 = firstOrNull$result) != null ? tmp$_9.second : null;
    if (tmp$_10 == null) {
      throw new VmException('Unrecognized instruction');
    }
    var handler = tmp$_10;
    handler(instruction);
  };
  InstructionDecoder.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'InstructionDecoder',
    interfaces: []
  };
  function decodeComponent(inst, bits) {
    var len = bits.last - bits.first + 1 | 0;
    var mask = (1 << len) - 1 | 0;
    return inst >> bits.first & mask;
  }
  function Cpsr(n, z, c, v) {
    this.n = n;
    this.z = z;
    this.c = c;
    this.v = v;
  }
  Cpsr.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Cpsr',
    interfaces: []
  };
  Cpsr.prototype.component1 = function () {
    return this.n;
  };
  Cpsr.prototype.component2 = function () {
    return this.z;
  };
  Cpsr.prototype.component3 = function () {
    return this.c;
  };
  Cpsr.prototype.component4 = function () {
    return this.v;
  };
  Cpsr.prototype.copy_tjonv8$ = function (n, z, c, v) {
    return new Cpsr(n === void 0 ? this.n : n, z === void 0 ? this.z : z, c === void 0 ? this.c : c, v === void 0 ? this.v : v);
  };
  Cpsr.prototype.toString = function () {
    return 'Cpsr(n=' + Kotlin.toString(this.n) + (', z=' + Kotlin.toString(this.z)) + (', c=' + Kotlin.toString(this.c)) + (', v=' + Kotlin.toString(this.v)) + ')';
  };
  Cpsr.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.n) | 0;
    result = result * 31 + Kotlin.hashCode(this.z) | 0;
    result = result * 31 + Kotlin.hashCode(this.c) | 0;
    result = result * 31 + Kotlin.hashCode(this.v) | 0;
    return result;
  };
  Cpsr.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.n, other.n) && Kotlin.equals(this.z, other.z) && Kotlin.equals(this.c, other.c) && Kotlin.equals(this.v, other.v)))));
  };
  function bit($receiver_3, index) {
    var mask = 1 << index;
    return ($receiver_3 & mask) !== 0 ? 1 : 0;
  }
  function bit_0($receiver_3, index) {
    var mask = Kotlin.Long.ONE.shiftLeft(index);
    return !Kotlin.equals($receiver_3.and(mask), Kotlin.Long.ZERO) ? 1 : 0;
  }
  function willAdditionOverflow(left, right) {
    if (right < 0 && right !== IntCompanionObject.MIN_VALUE) {
      return willSubtractionOverflow(left, -right);
    }
     else {
      return (~(left ^ right) & (left ^ left + right)) < 0;
    }
  }
  function willSubtractionOverflow(left, right) {
    if (right < 0) {
      return willAdditionOverflow(left, -right);
    }
     else {
      return ((left ^ right) & (left ^ left - right)) < 0;
    }
  }
  function signExtend(i24) {
    return i24 << 8 >> 8;
  }
  function notC(c) {
    return c === 1 ? 0 : 1;
  }
  function AluOut(result, c, v) {
    this.result = result;
    this.c = c;
    this.v = v;
  }
  AluOut.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'AluOut',
    interfaces: []
  };
  AluOut.prototype.component1 = function () {
    return this.result;
  };
  AluOut.prototype.component2 = function () {
    return this.c;
  };
  AluOut.prototype.component3 = function () {
    return this.v;
  };
  AluOut.prototype.copy_qt1dr2$ = function (result, c, v) {
    return new AluOut(result === void 0 ? this.result : result, c === void 0 ? this.c : c, v === void 0 ? this.v : v);
  };
  AluOut.prototype.toString = function () {
    return 'AluOut(result=' + Kotlin.toString(this.result) + (', c=' + Kotlin.toString(this.c)) + (', v=' + Kotlin.toString(this.v)) + ')';
  };
  AluOut.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.result) | 0;
    result = result * 31 + Kotlin.hashCode(this.c) | 0;
    result = result * 31 + Kotlin.hashCode(this.v) | 0;
    return result;
  };
  AluOut.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.result, other.result) && Kotlin.equals(this.c, other.c) && Kotlin.equals(this.v, other.v)))));
  };
  function Vm(program) {
    this.program_0 = program;
    var $receiver_3 = new IntRange(0, 15);
    var destination_3 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver_3, 10));
    var tmp$_9;
    tmp$_9 = $receiver_3.iterator();
    while (tmp$_9.hasNext()) {
      var item_2 = tmp$_9.next();
      destination_3.add_11rb$(0);
    }
    this.r_0 = toMutableList(destination_3);
    this.cpsr = new Cpsr(0, 0, 0, 0);
    this.ip_1uf7$_0 = 0;
    var $receiver_4 = new IntRange(0, MEMORY_SIZE - 1 | 0);
    var destination_4 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver_4, 10));
    var tmp$_10;
    tmp$_10 = $receiver_4.iterator();
    while (tmp$_10.hasNext()) {
      var item_3 = tmp$_10.next();
      destination_4.add_11rb$(Kotlin.toByte(0));
    }
    this.mem_0 = toMutableList(destination_4);
    this.decoder_0 = new InstructionDecoder(listOf_0([to(dataProcessingImmediateShiftMask, Kotlin.getCallableRef('execDataProcessingImmediateShiftInstruction', function ($receiver_5, inst) {
      return $receiver_5.execDataProcessingImmediateShiftInstruction_za3lpa$(inst);
    }.bind(null, this))), to(dataProcessingImmediateMask, Kotlin.getCallableRef('execDataProcessingImmediateInstruction', function ($receiver_5, inst) {
      return $receiver_5.execDataProcessingImmediateInstruction_za3lpa$(inst);
    }.bind(null, this))), to(branchMask, Kotlin.getCallableRef('execBranchInstruction', function ($receiver_5, inst) {
      return $receiver_5.execBranchInstruction_za3lpa$(inst);
    }.bind(null, this))), to(loadAndStoreMask, Kotlin.getCallableRef('execLoadAndStoreInstruction', function ($receiver_5, inst) {
      return $receiver_5.execLoadAndStoreInstruction_za3lpa$(inst);
    }.bind(null, this)))]));
  }
  Object.defineProperty(Vm.prototype, 'ip', {
    get: function () {
      return this.ip_1uf7$_0;
    },
    set: function (ip) {
      this.ip_1uf7$_0 = ip;
    }
  });
  Vm.prototype.printRegisters_0 = function () {
    var $receiver_3 = this.r_0;
    var destination_3 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver_3, 10));
    var tmp$_9, tmp$_10;
    var index = 0;
    tmp$_9 = $receiver_3.iterator();
    while (tmp$_9.hasNext()) {
      var item_2 = tmp$_9.next();
      destination_3.add_11rb$('r' + (tmp$_10 = index, index = tmp$_10 + 1 | 0, tmp$_10) + ' = ' + item_2);
    }
    println(joinToString_0(destination_3, ' / '));
  };
  Vm.prototype.readMemory_0 = function (address) {
    var a = this.mem_0.get_za3lpa$(address + 0 | 0);
    var b = this.mem_0.get_za3lpa$(address + 1 | 0);
    var c = this.mem_0.get_za3lpa$(address + 2 | 0);
    var d = this.mem_0.get_za3lpa$(address + 3 | 0);
    return a & 255 | (b & 255) << 8 | (c & 255) << 16 | (d & 255) << 24;
  };
  Vm.prototype.writeMemory_0 = function (address, data) {
    this.mem_0.set_wxm5ur$(address + 0 | 0, Kotlin.toByte(data >> 0 & 255));
    this.mem_0.set_wxm5ur$(address + 1 | 0, Kotlin.toByte(data >> 8 & 255));
    this.mem_0.set_wxm5ur$(address + 2 | 0, Kotlin.toByte(data >> 16 & 255));
    this.mem_0.set_wxm5ur$(address + 3 | 0, Kotlin.toByte(data >> 24 & 255));
  };
  Vm.prototype.conditionPassed_0 = function (cond_1) {
    var tmp$_9;
    if (cond_1 === Condition$AL_getInstance().opcode)
      tmp$_9 = true;
    else if (cond_1 === Condition$EQ_getInstance().opcode)
      tmp$_9 = this.cpsr.z === 1;
    else if (cond_1 === Condition$NE_getInstance().opcode)
      tmp$_9 = this.cpsr.z === 0;
    else if (cond_1 === Condition$LT_getInstance().opcode)
      tmp$_9 = this.cpsr.n !== this.cpsr.v;
    else if (cond_1 === Condition$GT_getInstance().opcode)
      tmp$_9 = (this.cpsr.z === 0 && this.cpsr.n === this.cpsr.v);
    else
      throw new VmException('cond');
    return tmp$_9;
  };
  Vm.prototype.alu_0 = function (opcode, lhs, rhs, shifterCarryOut) {
    if (opcode === Instruction$MOV_getInstance().opcode)
      return new AluOut(rhs, shifterCarryOut, this.cpsr.v);
    else if (opcode === Instruction$MVN_getInstance().opcode)
      return new AluOut(~rhs, shifterCarryOut, this.cpsr.v);
    else if (opcode === Instruction$ADD_getInstance().opcode)
      return new AluOut(lhs + rhs | 0, 0, 0);
    else if (opcode === Instruction$ADC_getInstance().opcode)
      return new AluOut(lhs + rhs + this.cpsr.c | 0, 0, 0);
    else if (opcode === Instruction$AND_getInstance().opcode)
      return new AluOut(lhs & rhs, 0, 0);
    else if (opcode === Instruction$BIC_getInstance().opcode)
      return new AluOut(lhs & ~rhs, 0, 0);
    else if (opcode === Instruction$CMN_getInstance().opcode)
      return new AluOut(lhs + rhs + this.cpsr.c | 0, 0, 0);
    else if (opcode === Instruction$CMP_getInstance().opcode)
      return new AluOut(lhs - rhs | 0, 0, 0);
    else if (opcode === Instruction$EOR_getInstance().opcode)
      return new AluOut(lhs ^ rhs, 0, 0);
    else if (opcode === Instruction$ORR_getInstance().opcode)
      return new AluOut(lhs | rhs, 0, 0);
    else if (opcode === Instruction$RSB_getInstance().opcode)
      return new AluOut(rhs - lhs | 0, 0, 0);
    else if (opcode === Instruction$SBC_getInstance().opcode)
      return new AluOut(lhs - rhs - notC(this.cpsr.c) | 0, 0, 0);
    else if (opcode === Instruction$SUB_getInstance().opcode)
      return new AluOut(lhs - rhs | 0, 0, 0);
    else if (opcode === Instruction$TEQ_getInstance().opcode)
      return new AluOut(lhs ^ rhs, 0, 0);
    else if (opcode === Instruction$TST_getInstance().opcode)
      return new AluOut(lhs & rhs, 0, 0);
    else
      throw new VmException('opcode');
  };
  Vm.prototype.execDataProcessingOp_qt1dr2$ = function (inst, shifterOperand, shifterCarryOut) {
    var opcode = decodeComponent(inst, opcodeBits);
    var s_0 = decodeComponent(inst, sBit);
    var rn = decodeComponent(inst, rnBits);
    var rd = decodeComponent(inst, rdBits);
    var tmp$_9 = this.alu_0(opcode, this.r_0.get_za3lpa$(rn), shifterOperand, shifterCarryOut);
    var aluOut = tmp$_9.component1()
    , c = tmp$_9.component2()
    , v = tmp$_9.component3();
    if (!(new IntRange(Instruction$TST_getInstance().opcode, Instruction$CMN_getInstance().opcode)).contains_mef7kx$(opcode)) {
      this.r_0.set_wxm5ur$(rd, aluOut);
    }
    if (s_0 === 1) {
      this.cpsr.n = bit(aluOut, 31);
      this.cpsr.z = aluOut === 0 ? 1 : 0;
      this.cpsr.c = c;
      this.cpsr.v = v;
    }
  };
  Vm.prototype.execDataProcessingImmediateShiftInstruction_za3lpa$ = function (inst) {
    var tmp$_9;
    var cond_1 = decodeComponent(inst, condBits);
    if (this.conditionPassed_0(cond_1)) {
      var shiftImm = decodeComponent(inst, shiftImmBits);
      var shift = decodeComponent(inst, shiftBits);
      var rm = decodeComponent(inst, rmBits);
      if (shift === ShiftOperator$LSL_getInstance().opcode)
        tmp$_9 = this.r_0.get_za3lpa$(rm) << shiftImm;
      else if (shift === ShiftOperator$ASR_getInstance().opcode)
        tmp$_9 = this.r_0.get_za3lpa$(rm) >> shiftImm;
      else
        throw new VmException('shift');
      var shifterOperand = tmp$_9;
      var shifterCarryOut = bit(this.r_0.get_za3lpa$(rm), 32 - shiftImm | 0);
      this.execDataProcessingOp_qt1dr2$(inst, shifterOperand, shifterCarryOut);
    }
  };
  Vm.prototype.execDataProcessingImmediateInstruction_za3lpa$ = function (inst) {
    var cond_1 = decodeComponent(inst, condBits);
    if (this.conditionPassed_0(cond_1)) {
      var rotateImm = decodeComponent(inst, rotateImmBits);
      var immed8 = decodeComponent(inst, immed8Bits);
      var shifterOperand = immed8 >> (rotateImm * 2 | 0);
      var shifterCarryOut = rotateImm === 0 ? this.cpsr.c : bit(shifterOperand, 31);
      this.execDataProcessingOp_qt1dr2$(inst, shifterOperand, shifterCarryOut);
    }
  };
  Vm.prototype.execBranchInstruction_za3lpa$ = function (inst) {
    var cond_1 = decodeComponent(inst, condBits);
    if (this.conditionPassed_0(cond_1)) {
      var signedImmed24 = decodeComponent(inst, signedImmed24Bits);
      var deltaPc = signExtend(signedImmed24) << 2;
      var deltaIp = deltaPc / 4 | 0;
      this.ip = this.ip + deltaIp | 0;
      this.ip = this.ip - 1 | 0;
    }
  };
  Vm.prototype.execLoadAndStoreInstruction_za3lpa$ = function (inst) {
    var cond_1 = decodeComponent(inst, condBits);
    if (this.conditionPassed_0(cond_1)) {
      var rd = decodeComponent(inst, rdBits);
      var rn = decodeComponent(inst, rnBits);
      var offset12 = decodeComponent(inst, offset12Bits);
      var address = this.r_0.get_za3lpa$(rn) + offset12 | 0;
      var l_0 = decodeComponent(inst, lBit20);
      if (l_0 === 1) {
        var data = this.readMemory_0(address);
        this.r_0.set_wxm5ur$(rd, data);
      }
       else {
        var data_0 = this.r_0.get_za3lpa$(rd);
        this.writeMemory_0(address, data_0);
      }
    }
  };
  Vm.prototype.step = function () {
    var tmp$_9;
    var inst = this.program_0.instructions.get_za3lpa$((tmp$_9 = this.ip, this.ip = tmp$_9 + 1 | 0, tmp$_9));
    this.decoder_0.decode_za3lpa$(inst);
    this.printRegisters_0();
  };
  Vm.prototype.run = function () {
    while (get_indices(this.program_0.instructions).contains_mef7kx$(this.ip)) {
      this.step();
    }
  };
  Vm.prototype.getRegisterValue_za3lpa$ = function (index) {
    return this.r_0.get_za3lpa$(index);
  };
  Vm.prototype.setRegisterValue_vux9f0$ = function (index, data) {
    this.r_0.set_wxm5ur$(index, data);
  };
  Vm.prototype.setByte_6t1wet$ = function (address, byte) {
    this.mem_0.set_wxm5ur$(address, byte);
  };
  Vm.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Vm',
    interfaces: []
  };
  var asmCodeId;
  function splitBy($receiver_3, predicate) {
    var tmp$_9;
    var list_0 = mutableListOf_0([Kotlin.kotlin.collections.ArrayList_init_ww73n8$()]);
    tmp$_9 = $receiver_3.iterator();
    while (tmp$_9.hasNext()) {
      var element_0 = tmp$_9.next();
      if (predicate(element_0)) {
        list_0.add_11rb$(Kotlin.kotlin.collections.ArrayList_init_ww73n8$());
      }
       else {
        last(list_0).add_11rb$(element_0);
      }
    }
    return list_0;
  }
  function makeCodeElement$lambda(it) {
    return it.kind === TokenKind$EOL_getInstance();
  }
  function makeCodeElement$lambda$lambda$lambda$lambda(closure$input, closure$token) {
    return function () {
      var span = document.createElement('span');
      var tokenString = replace(substring(closure$input, closure$token.range), ' ', '\xA0');
      span.textContent = tokenString;
      span.className = closure$token.kind.toString();
      return span;
    };
  }
  function makeCodeElement$lambda$lambda(closure$lineTokens, closure$input) {
    return function () {
      var lineDiv = document.createElement('div');
      lineDiv.className = 'line';
      var $receiver_3 = closure$lineTokens;
      var tmp$_9;
      tmp$_9 = $receiver_3.iterator();
      while (tmp$_9.hasNext()) {
        var element_0 = tmp$_9.next();
        lineDiv.appendChild(makeCodeElement$lambda$lambda$lambda$lambda(closure$input, element_0)());
      }
      return lineDiv;
    };
  }
  function makeCodeElement(input) {
    var code = document.createElement('code');
    var tmp$_9;
    tmp$_9 = splitBy(toList_1(new Lexer(input)), makeCodeElement$lambda).iterator();
    while (tmp$_9.hasNext()) {
      var element_0 = tmp$_9.next();
      code.appendChild(makeCodeElement$lambda$lambda(element_0, input)());
    }
    return code;
  }
  function makeStatusElement(vm) {
    var statusDiv = document.createElement('div');
    statusDiv.className = 'status';
    var tmp$_9;
    tmp$_9 = (new IntRange(0, 15)).iterator();
    while (tmp$_9.hasNext()) {
      var element_0 = tmp$_9.next();
      var span_0 = document.createElement('span');
      span_0.textContent = 'r' + element_0 + ': ';
      var i = document.createElement('i');
      i.textContent = vm.getRegisterValue_za3lpa$(element_0).toString();
      span_0.appendChild(i);
      statusDiv.appendChild(span_0);
    }
    var span = document.createElement('span');
    var cpsr = vm.cpsr;
    span.textContent = 'cpsr: c=' + cpsr.c + ', n=' + cpsr.n + ', v=' + cpsr.v + ', z=' + cpsr.z;
    statusDiv.appendChild(span);
    return statusDiv;
  }
  function main$updatePresentation(closure$code, closure$vm, closure$statusWrapper) {
    return function () {
      var tmp$_9, tmp$_10, tmp$_11, tmp$_12, tmp$_13, tmp$_14, tmp$_15;
      (tmp$_11 = (tmp$_10 = ((tmp$_9 = closure$code.v) != null ? tmp$_9 : Kotlin.throwNPE()).getElementsByClassName('selected')[0]) != null ? tmp$_10.classList : null) != null ? tmp$_11.remove('selected') : null;
      ((tmp$_14 = ((tmp$_12 = closure$code.v) != null ? tmp$_12 : Kotlin.throwNPE()).children[((tmp$_13 = closure$vm.v) != null ? tmp$_13 : Kotlin.throwNPE()).ip]) != null ? tmp$_14 : Kotlin.throwNPE()).classList.add('selected');
      clear(closure$statusWrapper);
      closure$statusWrapper.appendChild(makeStatusElement((tmp$_15 = closure$vm.v) != null ? tmp$_15 : Kotlin.throwNPE()));
    };
  }
  function main$loadSource(closure$codeWrapper, closure$errorWrapper, closure$statusWrapper, closure$vm, closure$code, closure$updatePresentation) {
    return function (source) {
      clear(closure$codeWrapper);
      clear(closure$errorWrapper);
      clear(closure$statusWrapper);
      try {
        var program = (new Assembler(source)).assemble();
        var vm_ = new Vm(program);
        var code_ = makeCodeElement(source);
        closure$codeWrapper.appendChild(code_);
        closure$vm.v = vm_;
        closure$code.v = code_;
        closure$updatePresentation();
      }
       catch (e) {
        if (Kotlin.isType(e, Exception)) {
          var errorSpan = document.createElement('span');
          errorSpan.textContent = e.message;
          closure$errorWrapper.appendChild(errorSpan);
        }
         else
          throw e;
      }
    };
  }
  function main$lambda(closure$vm, closure$updatePresentation) {
    return function (it) {
      var tmp$_9;
      (tmp$_9 = closure$vm.v) != null ? tmp$_9.step() : null;
      closure$updatePresentation();
    };
  }
  function main$lambda$lambda$lambda(closure$reader, closure$loadSource) {
    return function (event) {
      var tmp$_9, tmp$_10;
      tmp$_10 = typeof (tmp$_9 = closure$reader.result) === 'string' ? tmp$_9 : Kotlin.throwCCE();
      closure$loadSource(tmp$_10);
      kotlin_0.Unit;
    };
  }
  function main$lambda_0(closure$loadSource) {
    return function (ev) {
      var tmp$_9, tmp$_10, tmp$_11;
      if ((tmp$_11 = (tmp$_10 = Kotlin.isType(tmp$_9 = ev.target, HTMLInputElement) ? tmp$_9 : null) != null ? tmp$_10.files : null) != null) {
        var closure$loadSource_0 = closure$loadSource;
        var tmp$_12;
        var reader = new FileReader();
        reader.onload = main$lambda$lambda$lambda(reader, closure$loadSource_0);
        reader.readAsText((tmp$_12 = tmp$_11[0]) != null ? tmp$_12 : Kotlin.throwNPE());
      }
    };
  }
  function main(args) {
    var tmp$_9, tmp$_10, tmp$_11, tmp$_12, tmp$_13, tmp$_14, tmp$_15;
    var input = ((tmp$_10 = ((tmp$_9 = document.getElementById(asmCodeId)) != null ? tmp$_9 : Kotlin.throwNPE()).textContent) != null ? tmp$_10 : Kotlin.throwNPE()).substring(1);
    var errorWrapper = (tmp$_11 = document.getElementById('error-wrapper')) != null ? tmp$_11 : Kotlin.throwNPE();
    var codeWrapper = (tmp$_12 = document.getElementById('code-wrapper')) != null ? tmp$_12 : Kotlin.throwNPE();
    var statusWrapper = (tmp$_13 = document.getElementById('status-wrapper')) != null ? tmp$_13 : Kotlin.throwNPE();
    var stepButton = (tmp$_14 = document.getElementById('step-button')) != null ? tmp$_14 : Kotlin.throwNPE();
    var sourceInput = (tmp$_15 = document.getElementById('source-input')) != null ? tmp$_15 : Kotlin.throwNPE();
    var vm = {v: null};
    var code = {v: null};
    var updatePresentation = main$updatePresentation(code, vm, statusWrapper);
    var loadSource = main$loadSource(codeWrapper, errorWrapper, statusWrapper, vm, code, updatePresentation);
    loadSource(input);
    stepButton.addEventListener('click', main$lambda(vm, updatePresentation));
    sourceInput.addEventListener('change', main$lambda_0(loadSource));
  }
  Object.defineProperty(_, 'wordSize', {
    get: function () {
      return wordSize;
    }
  });
  Object.defineProperty(_, 'bit4', {
    get: function () {
      return bit4;
    }
  });
  Object.defineProperty(_, 'bit7', {
    get: function () {
      return bit7;
    }
  });
  Object.defineProperty(_, 'bBit', {
    get: function () {
      return bBit;
    }
  });
  Object.defineProperty(_, 'condBits', {
    get: function () {
      return condBits;
    }
  });
  Object.defineProperty(_, 'iBit', {
    get: function () {
      return iBit;
    }
  });
  Object.defineProperty(_, 'immed8Bits', {
    get: function () {
      return immed8Bits;
    }
  });
  Object.defineProperty(_, 'lBit20', {
    get: function () {
      return lBit20;
    }
  });
  Object.defineProperty(_, 'lBit24', {
    get: function () {
      return lBit24;
    }
  });
  Object.defineProperty(_, 'offset12Bits', {
    get: function () {
      return offset12Bits;
    }
  });
  Object.defineProperty(_, 'opcodeBits', {
    get: function () {
      return opcodeBits;
    }
  });
  Object.defineProperty(_, 'pBit', {
    get: function () {
      return pBit;
    }
  });
  Object.defineProperty(_, 'prefixBits', {
    get: function () {
      return prefixBits;
    }
  });
  Object.defineProperty(_, 'rotateImmBits', {
    get: function () {
      return rotateImmBits;
    }
  });
  Object.defineProperty(_, 'rdBits', {
    get: function () {
      return rdBits;
    }
  });
  Object.defineProperty(_, 'rmBits', {
    get: function () {
      return rmBits;
    }
  });
  Object.defineProperty(_, 'rnBits', {
    get: function () {
      return rnBits;
    }
  });
  Object.defineProperty(_, 'sBit', {
    get: function () {
      return sBit;
    }
  });
  Object.defineProperty(_, 'shiftImmBits', {
    get: function () {
      return shiftImmBits;
    }
  });
  Object.defineProperty(_, 'shiftBits', {
    get: function () {
      return shiftBits;
    }
  });
  Object.defineProperty(_, 'shifterOperandBits', {
    get: function () {
      return shifterOperandBits;
    }
  });
  Object.defineProperty(_, 'signedImmed24Bits', {
    get: function () {
      return signedImmed24Bits;
    }
  });
  Object.defineProperty(_, 'uBit', {
    get: function () {
      return uBit;
    }
  });
  Object.defineProperty(_, 'wBit', {
    get: function () {
      return wBit;
    }
  });
  _.Mask = Mask;
  Object.defineProperty(_, 'dataProcessingImmediateShiftMask', {
    get: function () {
      return dataProcessingImmediateShiftMask;
    }
  });
  Object.defineProperty(_, 'dataProcessingRegisterShiftMask', {
    get: function () {
      return dataProcessingRegisterShiftMask;
    }
  });
  Object.defineProperty(_, 'dataProcessingImmediateMask', {
    get: function () {
      return dataProcessingImmediateMask;
    }
  });
  Object.defineProperty(_, 'branchMask', {
    get: function () {
      return branchMask;
    }
  });
  Object.defineProperty(_, 'loadAndStoreMask', {
    get: function () {
      return loadAndStoreMask;
    }
  });
  Object.defineProperty(InstructionCategory, 'BRANCH', {
    get: InstructionCategory$BRANCH_getInstance
  });
  Object.defineProperty(InstructionCategory, 'DATA_PROCESSING', {
    get: InstructionCategory$DATA_PROCESSING_getInstance
  });
  Object.defineProperty(InstructionCategory, 'LOAD_AND_STORE', {
    get: InstructionCategory$LOAD_AND_STORE_getInstance
  });
  _.InstructionCategory = InstructionCategory;
  Object.defineProperty(Instruction, 'B', {
    get: Instruction$B_getInstance
  });
  Object.defineProperty(Instruction, 'ADC', {
    get: Instruction$ADC_getInstance
  });
  Object.defineProperty(Instruction, 'ADD', {
    get: Instruction$ADD_getInstance
  });
  Object.defineProperty(Instruction, 'AND', {
    get: Instruction$AND_getInstance
  });
  Object.defineProperty(Instruction, 'BIC', {
    get: Instruction$BIC_getInstance
  });
  Object.defineProperty(Instruction, 'CMN', {
    get: Instruction$CMN_getInstance
  });
  Object.defineProperty(Instruction, 'CMP', {
    get: Instruction$CMP_getInstance
  });
  Object.defineProperty(Instruction, 'EOR', {
    get: Instruction$EOR_getInstance
  });
  Object.defineProperty(Instruction, 'MOV', {
    get: Instruction$MOV_getInstance
  });
  Object.defineProperty(Instruction, 'MVN', {
    get: Instruction$MVN_getInstance
  });
  Object.defineProperty(Instruction, 'ORR', {
    get: Instruction$ORR_getInstance
  });
  Object.defineProperty(Instruction, 'RSB', {
    get: Instruction$RSB_getInstance
  });
  Object.defineProperty(Instruction, 'RSC', {
    get: Instruction$RSC_getInstance
  });
  Object.defineProperty(Instruction, 'SBC', {
    get: Instruction$SBC_getInstance
  });
  Object.defineProperty(Instruction, 'SUB', {
    get: Instruction$SUB_getInstance
  });
  Object.defineProperty(Instruction, 'TEQ', {
    get: Instruction$TEQ_getInstance
  });
  Object.defineProperty(Instruction, 'TST', {
    get: Instruction$TST_getInstance
  });
  Object.defineProperty(Instruction, 'LDR', {
    get: Instruction$LDR_getInstance
  });
  Object.defineProperty(Instruction, 'STR', {
    get: Instruction$STR_getInstance
  });
  _.Instruction = Instruction;
  Object.defineProperty(Condition, 'EQ', {
    get: Condition$EQ_getInstance
  });
  Object.defineProperty(Condition, 'NE', {
    get: Condition$NE_getInstance
  });
  Object.defineProperty(Condition, 'LT', {
    get: Condition$LT_getInstance
  });
  Object.defineProperty(Condition, 'GT', {
    get: Condition$GT_getInstance
  });
  Object.defineProperty(Condition, 'AL', {
    get: Condition$AL_getInstance
  });
  _.Condition = Condition;
  Object.defineProperty(_, 'mnemonics', {
    get: function () {
      return mnemonics;
    }
  });
  Object.defineProperty(ShiftOperator, 'LSL', {
    get: ShiftOperator$LSL_getInstance
  });
  Object.defineProperty(ShiftOperator, 'LSR', {
    get: ShiftOperator$LSR_getInstance
  });
  Object.defineProperty(ShiftOperator, 'ASR', {
    get: ShiftOperator$ASR_getInstance
  });
  Object.defineProperty(ShiftOperator, 'ROR', {
    get: ShiftOperator$ROR_getInstance
  });
  Object.defineProperty(ShiftOperator, 'RRX', {
    get: ShiftOperator$RRX_getInstance
  });
  _.ShiftOperator = ShiftOperator;
  Object.defineProperty(_, 'shiftOperators', {
    get: function () {
      return shiftOperators;
    }
  });
  _.Program = Program;
  _.AssemblerException = AssemblerException;
  _.MInt = MInt;
  _.trim_dqglrj$ = trim;
  _.encodeData_f4lowt$ = encodeData;
  _.encodeData_h1ey51$ = encodeData_0;
  _.encodeCond_hknbms$ = encodeCond;
  _.encodePrefix_za3lpa$ = encodePrefix;
  _.encodeSbz_n8acyv$ = encodeSbz;
  _.encodeInstruction_km55ab$ = encodeInstruction;
  _.encodeRegisterIndex_52vhjo$ = encodeRegisterIndex;
  _.encodeRegister_52vhjo$ = encodeRegister;
  _.encodeRegisterOpt_fevzxp$ = encodeRegisterOpt;
  _.encodeSignedRm_7p45s1$ = encodeSignedRm;
  _.asRegister_5vql2l$ = asRegister;
  _.Assembler = Assembler;
  _.combine_obzv33$ = combine;
  _.combine_fgb8qu$ = combine_0;
  _.combine3_femk41$ = combine3;
  _.InstructionCaps = InstructionCaps;
  _.InstructionEncoder = InstructionEncoder;
  _.isLetter_myv2d0$ = isLetter;
  _.isDigit_myv2d0$ = isDigit;
  Object.defineProperty(TokenKind, 'COMMA', {
    get: TokenKind$COMMA_getInstance
  });
  Object.defineProperty(TokenKind, 'COMMENT', {
    get: TokenKind$COMMENT_getInstance
  });
  Object.defineProperty(TokenKind, 'CONST', {
    get: TokenKind$CONST_getInstance
  });
  Object.defineProperty(TokenKind, 'EOL', {
    get: TokenKind$EOL_getInstance
  });
  Object.defineProperty(TokenKind, 'IDENT', {
    get: TokenKind$IDENT_getInstance
  });
  Object.defineProperty(TokenKind, 'MNEMONIC', {
    get: TokenKind$MNEMONIC_getInstance
  });
  Object.defineProperty(TokenKind, 'REGISTER', {
    get: TokenKind$REGISTER_getInstance
  });
  Object.defineProperty(TokenKind, 'WHITESPACE', {
    get: TokenKind$WHITESPACE_getInstance
  });
  Object.defineProperty(TokenKind, 'SHIFT_OPERATOR', {
    get: TokenKind$SHIFT_OPERATOR_getInstance
  });
  Object.defineProperty(TokenKind, 'LBRACKET', {
    get: TokenKind$LBRACKET_getInstance
  });
  Object.defineProperty(TokenKind, 'RBRACKET', {
    get: TokenKind$RBRACKET_getInstance
  });
  _.TokenKind = TokenKind;
  _.Token = Token;
  _.LexerException = LexerException;
  Object.defineProperty(_, 'inlineWhitespace', {
    get: function () {
      return inlineWhitespace;
    }
  });
  Object.defineProperty(_, 'registerRegex', {
    get: function () {
      return registerRegex;
    }
  });
  _.Lexer = Lexer;
  _.ParserException = ParserException;
  _.ArglistAst = ArglistAst;
  _.ExprAst = ExprAst;
  _.ConstAst = ConstAst;
  _.IdentAst = IdentAst;
  _.RegisterAst = RegisterAst;
  _.ShiftAst = ShiftAst;
  _.BracketAst = BracketAst;
  _.InstructionAst = InstructionAst;
  _.MnemonicAst = MnemonicAst;
  _.ProgramAst = ProgramAst;
  _.Parser = Parser;
  _.assert_87ejdh$ = assert;
  _.assert_6taknv$ = assert_0;
  _.assertEq_gnx7yi$ = assertEq;
  _.assemble_61zpoe$ = assemble;
  _.test_vm = test_vm;
  Object.defineProperty(_, 'src_mov1', {
    get: function () {
      return src_mov1;
    }
  });
  _.test_mov1 = test_mov1;
  Object.defineProperty(_, 'src_add1', {
    get: function () {
      return src_add1;
    }
  });
  _.test_add1 = test_add1;
  Object.defineProperty(_, 'src_addeq1', {
    get: function () {
      return src_addeq1;
    }
  });
  _.test_addeq1 = test_addeq1;
  Object.defineProperty(_, 'src_addeq2', {
    get: function () {
      return src_addeq2;
    }
  });
  _.test_addeq2 = test_addeq2;
  Object.defineProperty(_, 'src_and1', {
    get: function () {
      return src_and1;
    }
  });
  _.test_and1 = test_and1;
  Object.defineProperty(_, 'src_b1', {
    get: function () {
      return src_b1;
    }
  });
  _.test_b1 = test_b1;
  Object.defineProperty(_, 'src_bne1', {
    get: function () {
      return src_bne1;
    }
  });
  _.test_bne1 = test_bne1;
  Object.defineProperty(_, 'src_sub1', {
    get: function () {
      return src_sub1;
    }
  });
  _.test_sub1 = test_sub1;
  Object.defineProperty(_, 'src_subs1', {
    get: function () {
      return src_subs1;
    }
  });
  _.test_subs1 = test_subs1;
  Object.defineProperty(_, 'src_program1', {
    get: function () {
      return src_program1;
    }
  });
  _.test_program1 = test_program1;
  _.test = test;
  Object.defineProperty(_, 'MEMORY_SIZE', {
    get: function () {
      return MEMORY_SIZE;
    }
  });
  _.VmException = VmException;
  _.InstructionDecoder = InstructionDecoder;
  _.decodeComponent_4xt46b$ = decodeComponent;
  _.Cpsr = Cpsr;
  _.bit_dqglrj$ = bit;
  _.bit_if0zpk$ = bit_0;
  _.willAdditionOverflow_vux9f0$ = willAdditionOverflow;
  _.willSubtractionOverflow_vux9f0$ = willSubtractionOverflow;
  _.signExtend_za3lpa$ = signExtend;
  _.notC_za3lpa$ = notC;
  _.AluOut = AluOut;
  _.Vm = Vm;
  _.makeCodeElement_61zpoe$ = makeCodeElement;
  _.makeStatusElement_253$ = makeStatusElement;
  _.main_kand9s$ = main;
  wordSize = 4;
  bit4 = new IntRange(4, 4);
  bit7 = new IntRange(7, 7);
  bBit = new IntRange(22, 22);
  condBits = new IntRange(28, 31);
  iBit = new IntRange(25, 25);
  immed8Bits = new IntRange(0, 7);
  lBit20 = new IntRange(20, 20);
  lBit24 = new IntRange(24, 24);
  offset12Bits = new IntRange(0, 11);
  opcodeBits = new IntRange(21, 24);
  pBit = new IntRange(24, 24);
  prefixBits = new IntRange(26, 27);
  rotateImmBits = new IntRange(8, 11);
  rdBits = new IntRange(12, 15);
  rmBits = new IntRange(0, 3);
  rnBits = new IntRange(16, 19);
  sBit = new IntRange(20, 20);
  shiftImmBits = new IntRange(7, 11);
  shiftBits = new IntRange(5, 6);
  shifterOperandBits = new IntRange(0, 11);
  signedImmed24Bits = new IntRange(0, 23);
  uBit = new IntRange(23, 23);
  wBit = new IntRange(21, 21);
  dataProcessingImmediateShiftMask = new Mask(234881040, 0);
  dataProcessingRegisterShiftMask = new Mask(234881168, 16);
  dataProcessingImmediateMask = new Mask(234881024, 33554432);
  branchMask = new Mask(234881024, 167772160);
  loadAndStoreMask = new Mask(205520896, 67108864);
  var $receiver = Instruction$values();
  var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
  var tmp$;
  for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
    var element = $receiver[tmp$];
    var tmp$_0, tmp$_1;
    var condList = plus(listOf(null), toList(Condition$values()));
    tmp$_0 = element.category;
    if (Kotlin.equals(tmp$_0, InstructionCategory$BRANCH_getInstance())) {
      var lList = listOf_0([false, true]);
      var $receiver_0 = combine(lList, condList);
      var destination_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver_0, 10));
      var tmp$_2;
      tmp$_2 = $receiver_0.iterator();
      while (tmp$_2.hasNext()) {
        var item = tmp$_2.next();
        var tmp$_3 = destination_0.add_11rb$;
        var l = item.component1()
        , cond = item.component2();
        var tmp$_4;
        var lInfix = l ? 'L' : '';
        var condPostfix = (tmp$_4 = cond != null ? cond.name : null) != null ? tmp$_4 : '';
        var fullMnemonic = element.name + lInfix + condPostfix;
        tmp$_3.call(destination_0, to(fullMnemonic, new Pair(element, new InstructionCaps(cond, false))));
      }
      tmp$_1 = destination_0;
    }
     else if (Kotlin.equals(tmp$_0, InstructionCategory$DATA_PROCESSING_getInstance())) {
      var sList = listOf_0([false, true]);
      var $receiver_1 = combine(condList, sList);
      var destination_1 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$(Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$($receiver_1, 10));
      var tmp$_5;
      tmp$_5 = $receiver_1.iterator();
      while (tmp$_5.hasNext()) {
        var item_0 = tmp$_5.next();
        var tmp$_6 = destination_1.add_11rb$;
        var cond_0 = item_0.component1()
        , s = item_0.component2();
        var tmp$_7;
        var condInfix = (tmp$_7 = cond_0 != null ? cond_0.name : null) != null ? tmp$_7 : '';
        var sPostfix = s ? 'S' : '';
        var fullMnemonic_0 = element.name + condInfix + sPostfix;
        tmp$_6.call(destination_1, to(fullMnemonic_0, new Pair(element, new InstructionCaps(cond_0, s))));
      }
      tmp$_1 = destination_1;
    }
     else if (Kotlin.equals(tmp$_0, InstructionCategory$LOAD_AND_STORE_getInstance()))
      tmp$_1 = listOf(to(element.name, new Pair(element, new InstructionCaps(null, false))));
    else
      tmp$_1 = Kotlin.noWhenBranchMatched();
    var combinations = tmp$_1;
    var list = combinations;
    Kotlin.kotlin.collections.addAll_ipc267$(destination, list);
  }
  mnemonics = toMap(destination);
  var $receiver_2 = ShiftOperator$values();
  var destination_2 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$($receiver_2.length);
  var tmp$_8;
  for (tmp$_8 = 0; tmp$_8 !== $receiver_2.length; ++tmp$_8) {
    var item_1 = $receiver_2[tmp$_8];
    destination_2.add_11rb$(item_1.name);
  }
  shiftOperators = destination_2;
  inlineWhitespace = listOf_0([Kotlin.toBoxedChar(32), Kotlin.toBoxedChar(9)]);
  registerRegex = Regex('[rR](\\d+)');
  src_mov1 = '\nMOV r0, #123\n';
  src_add1 = '\nMOV r1, #2\nMOV r2, #5\nADD r0, r1, r2\n';
  src_addeq1 = '\nMOV r1, #5\nMOV r2, #2\nSUBS r0, r0, r0\nADDEQ r0, r1, r2\n';
  src_addeq2 = '\nMOV r1, #5\nMOV r2, #2\nSUBS r0, r2, r0\nADDEQ r0, r1, r2\n';
  src_and1 = '\nANDS r0, r0, #1\n';
  src_b1 = '\nB op\nMOV r0, #123\nop MOV r1, #0\n';
  src_bne1 = '\nMOV r1, #3\nop SUBS r1, r1, #1\nADD r2, r2, #1\nBNE op\nMOV r3, #123\n';
  src_sub1 = '\nMOV r1, #7\nMOV r2, #3\nSUB r0, r1, r2\n';
  src_subs1 = '\nMOV r1, #1\nMOV r2, #1\nSUBS r0, r1, r2\n';
  src_program1 = '\n        MOV  R0, #5         ; R0 is current number\n        MOV  R1, #0         ; R1 is count of number of iterations\nagain   ADD  R1, R1, #1     ; increment number of iterations\n        ANDS R0, R0, #1     ; test whether R0 is odd\n        BEQ  even\n        ADD  R0, R0, R0, LSL #1 ; if odd, set R0 = R0 + (R0 << 1) + 1\n        ADD  R0, R0, #1     ; and repeat (guaranteed R0 > 1)\n        B    again\neven    MOV  R0, R0, ASR #1 ; if even, set R0 = R0 >> 1\n        SUBS R7, R0, #1     ; and repeat if R0 != 1\n        BNE  again\nhalt    B    halt           ; infinite loop to stop computation\n';
  MEMORY_SIZE = 1024;
  asmCodeId = 'asm-code';
  Kotlin.defineModule('armsim', _);
  main([]);
  return _;
}(typeof armsim === 'undefined' ? {} : armsim, kotlin);
