'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const fs = require('fs');
const arr = [];

fs.readFile('./cities.txt', 'utf8', (err, data) => {
  if (err) throw err;
  data = data.split('\n');
  for (let month = 1; month < 13; month++) {
    for (let day = 1; day < 32; day++) {
      for (let i = 0; i < data.length; i++) {
        let temp = 0, vlazhnost = 0;
        if (month === 12 || month === 1 || month === 2) {
          temp = getRandomInt(-26, 5);
          vlazhnost = getRandomInt(56, 95);
        }

        if (month === 3 || month === 4 || month === 5) {
          temp = getRandomInt(-4, 20);
          vlazhnost = getRandomInt(38, 97);
        }

        if (month === 6 || month === 7 || month === 8) {
          temp = getRandomInt(13, 40);
          vlazhnost = getRandomInt(34, 69);
        }

        if (month === 9 || month === 10 || month === 11) {
          temp = getRandomInt(-5, 28);
          vlazhnost = getRandomInt(40, 89);
        }

        arr.push(day + '.' + month + '.2018,' + temp + ',' + vlazhnost + ',' + data[i]);
      }
    }
  }

  fs.writeFile('./out.csv', arr.join('\n'));
});