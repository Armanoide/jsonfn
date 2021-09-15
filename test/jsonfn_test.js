"use strict";

const JSONfn = (typeof exports === 'undefined') ? window.JSONfn : require('../jsonfn');
let strFn, objFn;

function check(objFn, type, value) {
  if (objFn === value) {
    console.log(`     ${type}.................   OK\n`);
  } else {
    console.log(`     ${type}.................   failure\n`);
  }
}

function test1() {

  const obj = {
    firstName: "John",
    lastName: "Dow",
    today: new Date('2018-09-22T15:00:00'),
    re: /(\w+)\s(\w+)/,
    getFullName: function () {
      return this.firstName + " " + this.lastName;
    },
    getFullNameArrow: () =>
      this.firstName + " " + this.lastName,
    greetLambda: function (param) {
      const displayMessage = (function (msg1) {
        return msg2 => msg1 + msg2;
      }(param));
      return displayMessage("Lambda World!");
    }
  };

  console.log('\n\n======= Test 1 started =======\n\n');
  console.log('  Stringifying original object.......\n');

  strFn = JSONfn.stringify(obj, true);
  console.log(strFn);
  console.log('\n  Parsing this string....... ');
  objFn = JSONfn.parse(strFn, true);
  console.log('\n  Running tests: \n');

  const payloadTest = () => {
    check(objFn.firstName, 'property', "John");
    check(objFn.getFullName(), 'function', "John Dow");
    check(objFn.greetLambda('Hello '), 'Lambda', "Hello Lambda World!");
    check('John Smith'.replace(objFn.re, "$2, $1"), 'Regexp', 'Smith, John');
    check(objFn.today.toISOString(), 'Date', '2018-09-22T15:00:00');
    check(objFn.getFullNameArrow(), 'ArrowFnRegular', "John Dow");
  }
  payloadTest();
  console.log('\n  Cloning original object *******\n');
  console.log('\n  Running test on clonned object:\n');

  objFn = JSONfn.clone(obj, true);
  payloadTest();

  console.log('\n\n======= Test 1 finished =======\n\n');
}

function test2() {

  const obj =  {
    env: {
      mul(
      a,
      b
      ) {
        return (a * b);
      },

      value() { return 5 }
    }
  };

  console.log('\n\n======= Test 2 started =======\n\n');
  console.log('  Stringifying original object.......\n');

  strFn = JSONfn.stringify(obj, true);
  console.log(strFn);
  console.log('\n  Parsing this string....... ');
  objFn = JSONfn.parse(strFn, true);
  console.log('\n  Running tests: \n');
  check(objFn.env.mul(5, 5), 'Function', obj.env.mul(5, 5))
  check(objFn.env.value(), 'Function', obj.env.value());
}

test1();
test2();
