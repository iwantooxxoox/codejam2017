const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var numCases = -1;
const input = [];

rl.on('line', (line) => { 
  if (numCases === -1) {
    numCases = parseInt(line, 10);
  } else {
    input.push(line);
  }
}).on('close', () => {
  let i = 0;
  let num = 1;
  while (i < input.length) {
    
    const rows = parseInt(input[i].split(' ')[0], 10);

    const matrix = [];
    for (let j = i + 1; j <= i + rows; j++) {
      matrix.push(input[j].split(''));
    }
    const m = decorate(matrix.slice());
    const res = m.map(r => r.join(''))
    console.log(`Case #${num}:`);
    res.forEach(r => console.log(r));
    i += rows + 1;
    ++num;
  }
});

const decorate = (matrix) => {
  // from left to right
  for (let i = 0; i < matrix.length; i++) {
    let letter = '?';
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== '?') {
        letter = matrix[i][j]
      } else {
        matrix[i][j] = letter;
      }
    }
  }

  // from right to left
  for (let i = 0; i < matrix.length; i++) {
    let letter = '?';
    for (let j = matrix[i].length - 1; j >= 0; j--) {
      if (matrix[i][j] !== '?') {
        letter = matrix[i][j];
      } else {
        matrix[i][j] = letter;
      }
    }
  }

  // from top to bottom
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '?') {
        matrix[i] = matrix[i - 1];
        break;
      }
    }
  }

  // from bottom to top
  for (let i = matrix.length - 2; i >= 0; i--) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '?') {
        matrix[i] = matrix[i + 1];
        break;
      }
    }
  }
  return matrix;
}





