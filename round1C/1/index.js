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
    // console.log('num', num);
    const [n, k] = input[i].split(' ').map(item => parseInt(item, 10));
    // console.log(n, k);
    const data = [];
    for (let j = i + 1; j <= i + n; j++) {
      data.push(input[j].split(' ').map(item => parseInt(item)));
    }
    const totalSorting = data.map(([r, h]) => calc(r, h))
      .sort((a, b) => b[0] - a[0])
      .map(item => [item[2], item[3]]);
    // console.log(totalSorting);
    const sideSorting = data.map(([r, h]) => calc(r, h))
      .sort((a, b) => b[1] - a[1]);

    const radiusSorting = data.sort((a, b) => b[0] - a[0]).map(([r, h]) => r);
    const radiusSorting2 = data.sort((a, b) => b[0] - a[0]);
    // console.log('radiusSorting', radiusSorting);

    for (let idx = 0; idx < totalSorting.length; idx++) {
      const base = totalSorting[idx];
      // console.log('base', base);
      const pos = radiusSorting.indexOf(base[0]);
      // console.log('pos', pos);
      // console.log('why', n - pos - 1);
      if (n - pos - 1 >= k - 1) {
        let res = calc(base[0], base[1])[0];
        const newRadiusSorting = radiusSorting2.splice(pos + 1);
        // console.log('hi', newRadiusSorting);
        const newSide = newRadiusSorting.map(([r, h]) => side(r, h))
          .sort((a, b) => b - a);
        // console.log('newSide', newSide);
        // console.log('show me', newSide.slice(0, k), res);
        newSide.slice(0, k - 1).forEach(item => {
          res += item;
        });
        console.log(`Case #${num}: ${res.toFixed(9)}`);
        break;
      }
    }

    // console.log(totalSorting)
    // console.log('data', data);
    num += 1;
    i = i + n + 1;
    // console.log(' ');
  }
});

const calc = (r, h) => {
  const total = (r * r * Math.PI) + (2 * Math.PI * r * h);
  const side = 2 * Math.PI * r * h;
  return [total, side, r, h];
}

const side = (r, h) => {
  return 2 * Math.PI * r * h;
}