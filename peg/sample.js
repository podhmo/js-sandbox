var parse = require('./src/arithmetics-parser').parse;
console.log(parse("4 * (1 + 2) * 3"));
console.log(parse("(1 + 2)"));
