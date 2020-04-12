# Programming Languages: Final Project

This note describes the final project for the Programming Languages class.

The project involves implementing a small yet relatively powerful programming
language. The language you implement will support functions, closures,
recursion, bound variables, conditional logic, and integer arithmetic.

The language is called SMURF (because it is small, and if languages had colors,
it would be blue).

### Revision history

2020-04-01: Initial release

## General Plan

Given the current somewhat trying circumstances, I've decided to split the
final project into three sections. Each section will build on the code from
the previous section, so you'll keep this repository for each section, adding
code to it as needed.

The assignment for each week is in the file WEEK.n.md. I'll update this
directory with with the details of each assignment at the time I set
that assignment (so for now, there's just a WEEK.1.md file)

The overall flow is:

* Week.1.md:

  Get the environment working. Write a PEG grammar for expressions, build the
  expression AST, and use the visitor pattern to interpret it.

* Week.2.md:

  Add variables and functions, but with only a single global binding.

* Week.3.md:

  Add support for closures, so that functions have their own scope, and they
  capture the surrounding scope when defined.

### What's in the Box

This initial checkout contains the skeleton of the SMURF project:

~~~
├── README.md
├── package-lock.json
├── package.json
├── samples
│   └── sample SMURF programs
├── src
│   ├── compiler.js
│   ├── grammar.pegjs
│   ├── smurf.js
│   └── util
│       └── load_grammar.js
└── test
    └── test_values.js
~~~

The only existing files you can edit are `grammar.pegjs` and `compiler.pegjs`.
You can (and should) add new files under `src/` and `test/`.

* `package.json` and `package-lock.json`
  Are set up to install `ava` and `pegjs`. Just run `npm install` in this
  directory.

* `samples/`
  A collection of SMURF programs. I'll be using these at the end to test your
  code.

* `src/smurf.js`
  This is the main program of the interpreter. I've already written the code you
  need, and you shouldn't change it. It:

  * looks at the parameter you pass when you run it:

        $ node src/smurf.js  «param»

    If the parameter ends `.smu`, it assumes that it's a file name and passes
    the contents of the file to your interpreter; otherwise it assumes it's a
    SMURF program and passes it in.

  * it loads you grammar from `grammar.pegjs` and uses it to create a PEG.PS
    parser.

  * it implements a basic print function for your interpreter to use.

* `src/grammar.pegjs`

  * this is where you'll create your grammar. Grow this incrementally, only
    adding what is needed for each assignment.

    Please try to format it the way I formatted things in the videos.

* `src/compiler.js`

  This is where you start. The `compileAndRun` function in this module is called
  by the main program. It is given the grammar (as a PEG.JS object, the source
  of the script (a string) and the print function.

  This function coordinates parsing the script and then interpreting it. It must
  return the value of the last statement that the interpreter executes.

* `test/test_values.js`

  Some basic tests of expressions. Fee free to add more tests, but do it in
  different files.

I strongly suggest you put your AST-related code into one or more separate
files, and also put the interpreter into its own module or modules.

### Submission

We're not doing the regular fork/PR dance for this project. Instead, I'd like
you all to have your own private repositories and work in those. You'll make me
a collaborator so I can see what's going on, answer questions if needed, and
grade the three assignments.


#### Initial setup (one time only)

To set this up, following the following steps:

1. Clone this repository (https://github.com/pragdave/SMURF_2020)

2. Go into the `SMURF_2020` directory and delete the `.git` directory and its
   contents (`rm -rf .git` or (possibly) `rmdir .git/s`)

3. Now make it into a fresh git repository (nothing to do with mine)

      $ git init
      $ git add .
      $ git commit -a -m 'initial copy from pragdave'

4. Create a project on github called `SMURF`. Do not select the option to have
   it create a README.

5. Add these files into that repository: copy and paste the lines from the page
   github displays in the "or push an existing repository from the command line"
   box

       git remote add origin git@github.com:your-user-name/SMURF.git
       git push -u origin master

6. Finally, use the Settings/Manage Access menu on github to add me (pragdave)
   as a collaborator.


# SMURF Reference Material

SMURF is an interpreted language. It has two data types: integers and functions.
The results of integer division are always an integer, rounded (so 7/2 equals
4).

Comments run from `#` to end of line

Every statement returns a value.

* The value of a `let` or an assignment is the value given to the variable.
* The value of a sequence of statements is the value of the last statement
  executed
* The value of an `if` statement is the value of either the `then` or `else`
  block
* the value of a function definition is a function value
* the value of a function call is the value of the last statement it executes

Variables must be declared before use (using `let` or as a function's formal
arguments).

Functions capture closures at the point of definition.

As well as functions that can be defined in a SMURF script, you should implement
a built-in function `print`. At runtime, `print` will call a JavaScript function
that I supply; normally this will print a value to the console.

### Some SMURF programs

##### Convert feet to inches

    let feetToInches = fn(feet) {
      feet * 12
    }

    print(feetToInches(10))   #=> 120

##### Capturing a Binding

    let addN = fn(n) {
      fn (x) { x + n }
    }

    let add2 = addN(2)
    let add3 = addN(3)

    print(add3(5))      #=> 8

##### Fibonacci

    let fib = fn(n) {
      if n < 2 {
        n
      }
      else {
        fib(n-1) + fib(n-2)
      }
    }

    print(fib(10))   #=> 55


### Implementation Language and Tools

You'll use JavaScript and the peg.js library for this program, along with ava
for testing. I've already added pegjs and ava to the `package.json` file; you
just need to run `npm init` to install anything.

Please do not include any other libraries without first checking with me.

### Deliverables

You will use branches to submit your work. When it comes time to grade, I'll
clone your repository and then look in the branch `week1` (or `week2` or
`week3`).

Make sure that you do not add anything to a branch past the due date for that assignment.

**Do not include any object files, executable files, XCode project files, and the like.**

### Testing

I will supply you with tests for each assignment. Feel free to add your own.

Initially, the tests will rely on your interpreter returning the value of the
last statement executes (so the following SMURF code would result in your
`compileAndRun` function returning 99):

    let a = 100
    let b = 1
    a - b

Later, when your SMURF supports function calls and the `print` statement, I'll
also be running some sample files though a program that captures the output and
compares it against the expected results. You'll find the sample programs in the
`samples` directory.

To run the tests, just use `npm test`.


## SMURF Syntax

~~~ ebnf
start
  = code


identifier
  = <lowercase letter> <letter or digit or _>*


///////////////////////// blocks (lists of statements) /////////////////////////

code
  = statement+

statement
  = "let" __ variable_declaration
  | assignment
  | expr

//////////////// variables & variable declaration /////////////////////////////

variable_declaration
  = variable_name "=" expr:expr
  | variable_name

variable_value             // as rvalue
  =  identifier

variable_name              // as lvalue
  =  identifier

//////////////////////////////// if/then/else /////////////////////////////

if_expression
  = expr brace_block "else" brace_block
  | expr brace_block

//////////////////////////////// assignment /////////////////////////////

assignment
  = variable_name "=" expr

//////////////////////////////// expression /////////////////////////////

expr
  = "fn" function_definition
  | "if" if_expression
  | boolean_expression
  | arithmetic_expression


/////////////////////// boolean expression /////////////////////////////

boolean_expression
  = arithmetic_expression relop arithmetic_expression

//////////////////// arithmetic expression /////////////////////////////

arithmetic_expression
  = mult_term (addop mult_term)*

mult_term
  = primary (mulop primary)*

primary
  = integer
  | function_call
  | variable_value
  | "(" arithmetic_expression ")"


integer
  = ("+" | "-") digits

digits
  = ("0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9")+

addop
  = '+' | '-'

mulop
  = '*' | '/'

relop
  = '==' | '!=' | '>=' | '>' | '<=' | '<'


//////////////////////////////// function call /////////////////////////////

function_call
  = 'print' '(' call_arguments ')'
  | variable_value "(" call_arguments ")"

call_arguments
  = expr ("," expr)*
  | ''

//////////////////////// function definition /////////////////////////////

function_definition
  = param_list brace_block

param_list
   = "(" ")"
   / "(" variable_name ( "," variable_name )* ")"

brace_block
  = "{" code "}"
~~~

### Notes:

#### Syntax

* The syntax does not show whitespace or comments. Your grammar will need to
  allow optional whitespace between all terminals.

* Comments, which run from the `#` character to the end of the current line, and
  not shown in the syntax.  They should be treated as whitespace and be ignored.

* Every statement in SMURF is an expression: they all return a value.

#### Variables

* Variables must be declared (using `let`) before being used.

* Variables may also be initialized in a `let` statement. If not initialized,
  they should have the value 0.

* Variable initializers may be expressions, and those expressions may reference
  previous variables

  ~~~
  let a = 1
  let b = 2
  let c = a + b
  ~~~

* the syntax contains entries for both `variable_name` and `variable_value`.
  Although identical lexically, the syntax uses the former when referring the
  the name of a variable, and the latter when referring to its value.

* There are only two things a variable can hold: integers and functions.

#### Booleans and If Expressions

* The six relational operators (`relop`) compare two integers, returning the
  value `1` if the relation is true and `0` otherwise.

* The `if` expression executes its `then` clause if its condition is nonzero.
  Otherwise, if the condition is zero and an `else` clause is specified, that
  `else` clauses is executed.

* The value of the `if` expression is the value of either the `then` or `else`
  clause.

#### Blocks of code

* Multiple expressions (statements) can be grouped inside braces.

* The value returned by a block is the value of the last expression it
  evaluates.

  ~~~
  max = if a > b { a } else { b }
  ~~~

#### Functions

* Functions are created using the `fn` expression.

* The value of an `fn` is something that you can subsequently call.

  ~~~
  adder = fn (a,b) { a + b }
  print(adder(2,3))           #=> 5
  ~~~

* A function stored in a variable `v` is called using `v(p1, p2...)`.

* As a special case, your interpreter must act as if there is a predefined
  function stored in the variable `print`. This function can be called with
  one or more arguments, and will write those arguments to standard output,
  preceded by "Print: ". If multiple arguments are given, their values should be
  displayed separated by a pipe character (and no spaces).

  ~~~
  print(1)
  print(2*3, 4+5)
  ~~~

  will output

  ~~~
  Print: 1
  Print: 6|9
  ~~~


#### Scope and Binding

* Variables are declared with `let`, and are available from that point to
  the end of the scope that declares them.

* Variables are associated with a current value. The list of variables and their
  values in the current scope is called a binding.

* When a function is defined, SMURF remembers the scope.

* When the function is subsequently run, SMURF creates a new scope for it. That
  scope includes the binding for the scope where the function was declared,
  bindings for any function parameters and any variables declared inside the
  function.

  Here's an example from the test cases:

  ~~~
  let a = 99
  let f = fn(x) { x + a }
  print(f(1))     #=> 100
  a = 100
  print(f(1))     #=> 101
  ~~~

  Note that the function receives the _scope_ at its point of definition. If the
  variables in that scope change value, the function will see that new value.

  Here's another example illustrating the nested scope created in a function.

  ~~~
  let add_n = fn (n) {
    fn (x) {
      x + n
    }
  }
  let add_2 = add_n(2)
  let add_3 = add_n(3)
  print(add_2(2))       #=> 4
  print(add_3(10))      #=> 13
  ~~~

  Note that the nested function has a reference the the variable `n` from the
  enclosing function, and that the value of `n` is specific to that outer
  function's execution.

## Suggestions

* This is going to be a fairly good sized program. Nicely formatted, my
  solution is about 500 lines long. START EARLY.

* Read each week's assignment carefully. I try to be fairly directive.

* When you first start, it will feel like you're beating your head against a
  brick wall. Your parsing tools will generate strange errors, and there'll be
  interactions between parts of the syntax you aren't expecting.

  The trick, as always, is to take things step at a time, and verify as you go
  along. The supplied test cases are not good for this, so consider writing
  lower level unit tests of your own.

* Because SMURF has closures, you're going to need to be careful when invoking
  functions. One approach is to generate a _thunk- for every execution that
  contains the bindings and code specific to that execution. we'll talk about
  this in class.

  I found it useful to add code to my runtime that would dump out the current
  scope, and to call that in situations where variables weren't what I expected
  them to be.

* Remember to use me as a resource.

* START EARLY.


## Grading

Each of the three assignments that make up this project will be graded out of
100.

For each assignment, the grades will be broken down by

* passes tests: 75%
* well coded:   25%

Ultimately, I'm looking for you to demonstrate mastery.

#### Passes tests

Each assignment comes with a set of tests. If you pass those tests, you'll get a
minimum of 65%. I will also throw additional tests at your code when I grade. If
these reveal no problems, that adds another 10%

#### Well Coded

| | |
|-|-|
| The code is easy to understand.†            | 15% |
| Clear division between parsing and runtime  | 5% |
| Makes good use of features of peg.js and JavaScript | 5% |

(†) _Easy to understand_ means:

* well laid out (indentation, short lines, blank lines, etc)
* short methods/functions
* meaningful names
* complex code broken into smaller less complex chunks
* consistency
* and other _I'll know it when I don't understand it_ stuff


# FAQ

### I Messed Up on Week n. Doesn't that penalize me for weeks > n?

No. I'll try to put you on track as I grade. I'll also provide a reference
implementation for weeks 1 and 2 that you can use to replace your own code.
