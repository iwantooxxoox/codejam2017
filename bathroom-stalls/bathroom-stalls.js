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
  input.forEach((item, idx) => {
    const splittedItem = item.split(' ');
    const n = parseInt(splittedItem[0], 10);
    const k = parseInt(splittedItem[1], 10);
    const res = calc(n, k);
    console.log(`Case #${idx + 1}: ${res[0]} ${res[1]}`);
  })
});

const calc = (n, k) => {
  // console.log('n', n, 'k', k);
  let i = 1;
  const queue = [n];
  let max = -1;
  let min = -1;
  while (i <= k) {
    // const m = Math.max(...queue);
    let idx = -1;
    let m = -1;
    for (let j = 0; j < queue.length; j++) {
      if (queue[j] > m) {
        m = queue[j];
        idx = j;
        break;
      }
    }

    const numLeft = m - 1;
    if (numLeft % 2 === 0) {
      max = numLeft / 2;
      min = max;
    } else {
      max = Math.ceil(numLeft / 2);
      min = max - 1;
    }
    // const idx = queue.indexOf(m);
    queue.splice(idx, 1);
    if (max > 0) queue.push(max);
    if (min > 0) queue.push(min);
    ++i;
  }
  return [max, min];
}
