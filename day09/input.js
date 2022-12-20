const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n').map(e => ({ direction: e.split(' ')[0], steps: parseInt(e.split(' ')[1]) }))

module.exports = {
  input,
};