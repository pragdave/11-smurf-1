import test from "ava"
import loadGrammar from "../src/util/load_grammar.js"
import compileAndRun from "../src/compiler.js"

const BasicExpressions = [
  "1",
  "-2",
  "2+3",
  "2-3",
  "2*3",
  "7/2",
  "2+3+4",
  "2+3*4",
  "2*3+4",
  "2+-3",
]

const ExpressionsWithParentheses = [
  "(1)",
  "(-2)",
  "(1+2*3)",
  "(1+2)*3",
  "2*(3+4)",
  "(1+2)*(3+4)",
  "2*(3+5*(7+4))-1"
]

const ExpressionsWithWhitespace = [
  "   1",
  "-2   ",
  "   2+3  ",
  "2 -3",
  "2 *   3",
  "   7 /2",
  "2 + 3+4",
  "2+ 3* 4  ",
  "2+ -3",
  " ( 1 ) ",
  "(-2 )",
  "( 1+ 2*3)",
  "(1+2) *3",
  "2*(3 + 5*( 7 + 4 ))-1",
]

const Associativity = [
  "1 - 2 + 3",
  "12 / 4 * 3",
]

let grammar = loadGrammar()
let dummyPrint = () => { throw("shouldn't call this") }

test("basic expressions", t => {
  testValues(t, BasicExpressions)
})

test("expressions with parentheses", t => {
  testValues(t, ExpressionsWithParentheses)
})

test("expressions with whitespace", t => {
  testValues(t, ExpressionsWithWhitespace)
})

test("expressions with left associativity", t => {
  testValues(t, Associativity)
})

function testValues(t, values) {
  values.forEach(v => {
    let result = compileAndRun(grammar, v, dummyPrint)
    t.is(result, Math.round(eval(v)), "given: " + v)
  })
}