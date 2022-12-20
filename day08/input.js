const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n').map(e => e.split('')).map(e => e.map(f => parseInt(f)))

module.exports = {
  input,
};