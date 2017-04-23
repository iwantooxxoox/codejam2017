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
    const d = input[i].split(' ');
    const D = parseInt(d[0], 10);
    const N = parseInt(d[1], 10);
    
    let maxTime = 0;
    let slowSpeed = Number.MAX_SAFE_INTEGER;
    let pos = 0;

    for (let j = i + 1; j <= i + N; j++) {
      const line = input[j].split(' ');
      const left = D - parseInt(line[0], 10);
      const speed = parseInt(line[1], 10);
      if ((left / speed) > maxTime) {
        slowSpeed = speed
        pos = parseInt(line[0], 10);
        maxTime = (left / speed);
      }
    }
    
    const y = D * (slowSpeed / (D - pos));
    console.log(`Case #${num}: ${parseFloat(y).toFixed(6)}`);
    // console.log(y);
    // console.log(slowSpeed, pos);
    num += 1;
    i = i + N + 1;
  }
  
});