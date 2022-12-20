const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.join(__dirname, 'input'), 'utf8')
  .toString()
  .trim()
  .split('\n\n')
  .map(e => e.split('\n'))
  .map(e => e.map(e => parseInt(e)))

module.exports = {
  input,
};