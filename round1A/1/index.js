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
    // console.log('line no:', i);
    // console.log(input[i]);
    

    const rows = parseInt(input[i].split(' ')[0], 10);
    // console.log('parseInt', rows);

    const matrix = [];
    for (let j = i + 1; j <= i + rows; j++) {
      matrix.push(input[j].split(''));
    }
    
    const m = decorate(matrix.slice());
    const res = m.map(r => r.join(''))
    console.log(`Case #${num}:`);
    
    // if (num === 36) {
    //   console.log('show me', matrix);
    //   res.forEach(r => console.log(r));
    // }
    res.forEach(r => console.log(r));
    i += rows + 1;
    ++num;
  }

});

const checkQMark = (left, right, row, matrix, initial) => {
  // console.log('initial', initial);
  for (let i = left; i <= right; i++) {
    if (matrix[row][i] !== '?') return false;
  }
  matrix[row].fill(initial, left, right + 1);
}

const decorate = (matrix) => {
  const used = new Set();

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] !== '?' && !used.has(matrix[i][j])) {
        
        used.add(matrix[i][j]);
        
        if (j + 1 < matrix[0].length && matrix[i][j + 1] === '?' ||
          j - 1 >= 0 && matrix[i][j - 1] === '?') {
          let left = 0;
          let right = 0;

          if (j + 1 < matrix[0].length && matrix[i][j + 1] === '?') {
            let k = j;
            left = j;
            while (k + 1 < matrix[0].length && matrix[i][k + 1] === '?') {
              right = k + 1;
              matrix[i][k + 1] = matrix[i][j];
              k++;
            }
          }

          if (j - 1 >= 0 && matrix[i][j - 1] === '?') {
            let k = j;
            right = Math.max(j, right);
            while (k - 1 >= 0 && matrix[i][k - 1] === '?') {
              left = k - 1;
              matrix[i][k - 1] = matrix[i][j];
              k--;
            }
          }
          
          let up = i;
          while (up - 1 >= 0 && matrix[up - 1][j] === '?') {
            checkQMark(left, right, up - 1, matrix, matrix[i][j]);
            up--;
          }
          up = i;
          while (up + 1 < matrix.length && matrix[up + 1][j] === '?') {
            checkQMark(left, right, up + 1, matrix, matrix[i][j]);
            up++;
          }
          continue;
        }
        
        if (i + 1 < matrix.length && matrix[i + 1][j] === '?' ||
          i - 1 >= 0 && matrix[i - 1][j] === '?') {
          if (i + 1 < matrix.length && matrix[i + 1][j] === '?') {
            let k = i;
            while (k + 1 < matrix.length && matrix[k + 1][j] === '?') {
              matrix[k + 1][j] = matrix[i][j];
              k++;
            }
          }

          if (i - 1 >= 0 && matrix[i - 1][j] === '?') {
            let k = i;
            while (k - 1 >= 0 && matrix[k - 1][j] === '?') {
              matrix[k - 1][j] = matrix[i][j];
              k--;
            }
          }
          continue;
        }

      }
    }
  }
  return matrix;
};

