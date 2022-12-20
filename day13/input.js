const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n\n')
  .map(pairs => pairs.split('\n')).map(pairs => pairs.map(pair => eval(pair)))

module.exports = {
  input,
};