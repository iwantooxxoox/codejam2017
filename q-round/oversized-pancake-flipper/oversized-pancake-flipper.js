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
    const s = splittedItem[0].split('');
    const k = parseInt(splittedItem[1], 10);
    const res = doFlip(s, k);
    console.log(`Case #${idx + 1}: ${res}`);
  })
})

const doFlip = (s, k) => {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '-') {
      if ((i + k - 1) >= s.length) {
        return 'IMPOSSIBLE';
      }
      for (let j = i; j < (i + k); j++) {
        s[j] = s[j] === '-' ? '+' : '-';
      }
      ++count;
    }
  }
  return count;
}
