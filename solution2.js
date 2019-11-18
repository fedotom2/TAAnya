'use strict';

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let op = 0;
let answer = '';
fs.readFile('./data.csv', 'utf8', (err, data) => {
  if (err) throw err;

  data = data.split('\n');
  data = data.map((el) => el.split(','));
  data.pop();

  rl.question('Введите дату: ', (date) => {
    let start = +new Date;
    let from = +date.split('.')[0] - 3;
    let to = +date.split('.')[0] + 3;
    let dates = [];
    let arr = [];

    for (let i = from; i <= to; i++)
      dates.push(i + '.' + date.split('.')[1] + '.' + date.split('.')[2]);

    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      for (let j = 0, k = 0; j < data.length; j++) {
        if (i === 0) {
          if (data[j][0] == date)
            arr.push([data[j][0], +data[j][1], +data[j][2], data[j][3]]);
        }
        else {
          if (data[j][0] == date) {
            arr[k][1] += +data[j][1];
            arr[k][2] += +data[j][2];
            k++;
          }
        }

        if (k > 498) k = 0;
        op++;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i][1] /= 7;
      arr[i][2] /= 7;
      arr[i][1] = Math.round(arr[i][1]);
      arr[i][2] = Math.round(arr[i][2]);
      arr[i][2] = Math.abs(arr[i][2] - 60);
    }

    let t = arr[0][1], h = arr[0][2];
    arr.forEach(el => {
      if (t < el[1] && h > el[2]) {
        t = el[1];
        h = el[2];
      }
    });

    let index = 0;
    arr.forEach((el, i) => {
      if (el[1] === t && el[2] == h)
        index = i;
    });

    answer += Math.round(t) + ' ' + Math.round(60+h) + ' ' + data[index][3];

    let end = +new Date;

    console.log('Time: ');
    console.log(end - start);

    console.log('Answer: ');
    console.log(answer);

    console.log(op);

    rl.close();
  });

  
});