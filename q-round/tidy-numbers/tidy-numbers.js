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
  input.forEach((n, idx) => {
    const res = findTidy(n);
    console.log(`Case #${idx + 1}: ${res}`);
  })
});

const findTidy = (n) => {
  const num = n.split('');
  for (let i = num.length - 1; i > 0; i--) {
    if (parseInt(num[i - 1], 10) > parseInt(num[i], 10)) {
      num[i - 1] = parseInt(num[i - 1], 10) - 1;
      for (let j = i; j < num.length; j++) {
        num[j] = 9;
      }
    }
  }
  let res = num.join('');
  for (let i = 0; i < res.length; i++) {
    if (res[i] != 0) {
      res = res.substr(i);
      break;
    }
  }
  return res;
};
