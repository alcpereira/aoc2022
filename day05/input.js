const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.join(__dirname, 'input'), 'utf8')
  .toString()
  // .trim()
  .split('\n\n')

module.exports = {
  input,
};