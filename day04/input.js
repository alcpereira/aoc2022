const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.join(__dirname, 'input'), 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map(line => line.split(','))
  .map(line => line.map(pairs => pairs.split('-')))
  .map(line => line.map(pairs => pairs.map(val => parseInt(val))))

module.exports = {
  input,
};