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
  for (let i = 0; i < numCases; i++) {
    const [n, r, o, y, g, b, v] = input[i].split(' ').map(item => parseInt(item, 10));
    // console.log(n, r, o, y, g, b, v);
    const total = r + o + y + g + b + v;
    const colors = [r, o, y, g, b, v];
    const colorMap = [
      new Array(r).fill('R'),
      new Array(o).fill('O'),
      new Array(y).fill('Y'), 
      new Array(g).fill('G'),
      new Array(b).fill('B'),
      new Array(v).fill('V')].sort((a, b) => b.length - a.length);

    // console.log('colorMap', colorMap.map(item => item.length));
    // console.log('total', total, 'N', n);

    let res = '';
    if (total > n) {
      res = 'IMPOSSIBLE';
    } else {
      const max = Math.max(...colors);
      const others = total - max;
      
      // if its possible then others >=  max
      if (others >= max) {
        let count = max;
        while (count > 0) {
          let tmp = 0;
          for (let j = 0; j < colorMap.length; j++) {
            if (tmp === 2) break;
            if (colorMap[j].length > 0) {
              res += colorMap[j].pop();
              tmp++;
              --count;
            }
          }
        }
        // count = others;
        // while (count > 0) {
        //   for (let j = 0; j < colorMap.length; j++) {
        //     if (colors)
        //   }
        // }
      } else {
        res = 'IMPOSSIBLE';
      }
    }
    console.log(`Case #${i + 1}: ${res}`);

  }
});