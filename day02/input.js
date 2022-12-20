const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.join(__dirname, 'input'), 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(e => e.split(' '))

module.exports = {
  input,
};