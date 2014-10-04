var assert = require('assert');
var exc = require('./expression-compiler');


describe('Expression Compiler', function() {

  describe('Lex Machine', function() {
    it('should error on invalid exit', function() {
      assert.throws(function() { exc.lex_machine.get_next('!'); });
    });
    it('should lex stuff... is this called parsing?', function() {
      assert.equal(exc.lex_machine.get_next(" ").name, "whitespace");
      assert.equal(exc.lex_machine.get_next("0").name, "literal");
      assert.equal(exc.lex_machine.get_next("0").get_next(".").name, "literal");
      assert.equal(exc.lex_machine.get_next(".").get_next("1").name, "literal");
      assert.equal(exc.lex_machine.get_next("1").get_next("1").name, "literal");
      assert.equal(exc.lex_machine.get_next(".").name, null);
      assert.equal(exc.lex_machine.get_next("r").name, "name");
      assert.equal(exc.lex_machine.get_next("r").get_next("'").name, "name");
      assert.equal(exc.lex_machine.get_next("(").name, "o_paren");
      assert.equal(exc.lex_machine.get_next(")").name, "c_paren");
      assert.equal(exc.lex_machine.get_next("^").name, "power");
      assert.equal(exc.lex_machine.get_next("*").name, "multiply");
      assert.equal(exc.lex_machine.get_next("/").name, "divide");
      assert.equal(exc.lex_machine.get_next("+").name, "plus");
      assert.equal(exc.lex_machine.get_next("-").name, "minus");
      assert.equal(exc.lex_machine.get_next("<").name, "less");
      assert.equal(exc.lex_machine.get_next(">").name, "greater");
    });
  });

  describe('Lexer', function() {
    it('should lex stuff...', function() {
      assert.equal(exc.lex(" ")[0].name, "whitespace");
      assert.equal(exc.lex("0")[0].name, "literal");
      assert.equal(exc.lex("+")[0].name, "plus");
    });
  });

  describe('Compiler', function() {
    it('should compile to a function that works', function() {
      assert.equal(exc.compile("1")(), 1);
      assert.equal(exc.compile("1+1")(), 2);
      assert.equal(exc.compile("(1)")(), 1);
      assert.equal(exc.compile("(1+1)")(), 2);
      assert.equal(exc.compile("1+1*2")(), 3);
      assert.equal(exc.compile("(1+1)*2")(), 4);
      assert.equal(exc.compile("(1+1) +1")(), 3);
      assert.equal(exc.compile("2*(2+2)")(), 8);
      assert.equal(exc.compile("-1")(), -1);
      assert.equal(exc.compile("(-1)")(), -1);
      assert.equal(exc.compile("-(1)")(), -1);
      assert.equal(exc.compile("[-1]")(), 1);
      assert.equal(exc.compile("1-1")(), 0);
    });
  });

});
