'use strict';

// Подключаем библиотеку для чтения файла
const fs = require('fs');

/// Объявляем переменную, в которой будем хранить ответ
let answer = '';
// Читаем файл с базой данных
fs.readFile('./data.csv', 'utf8', (err, data) => {
  // Если при чтении файла, была ошибка, то мы останавливаем программу
  if (err) throw err;

  // Парсинг базы данных
  // Разбиваем базу данных по абзацам 
  data = data.split('\n');
  data = data.map((el) => el.split(','));
  data.pop();

  fs.readFile('./in.txt', 'utf8', (err, dates) => {
    if (err) throw err;

    dates = dates.split('\n');
    dates = dates.map((el) => el.split(' '));
    dates.pop();

    let start = +new Date;

    for (let i = 0; i < dates.length; i++) {
      const start = dates[i][0];
      const end = dates[i][1];

      let i1 = null, i2 = null;
      for (let j = 0; j < data.length; j+=499) {
        if (data[j][0] === start)
          i1 = j;
        if (data[j][0] === end.split('\r')[0])
          i2 = j;
        if (Number.isInteger(i1) && Number.isInteger(i2))
          break;
      }

      let count = 0;
      let arr = [];
      for (let j = i1; j < i2; j+=499) {
        count++;
      }

      for (let j = 0; j < 499; j++)
        arr.push([0, 0]);

      let k = 0;
      for (let j = i1; j < i2; j++) {
        arr[k][0] += +data[j][1];
        arr[k][1] += +data[j][2];
        k++;
        if (k > 498) k = 0;
      }


      arr = arr.map(el => {
        return [el[0]/count, Math.abs(el[1]/count - 60)]
      });

      let t = arr[0][0], h = arr[0][1];
      arr.forEach(el => {
        if (t < el[0] && h > el[1]) {
          t = el[0];
          h = el[1];
        }
      });

      let index = 0;
      arr.forEach((el, i) => {
        if (el[0] === t && el[1] == h)
          index = i;
      });

      answer += Math.round(t) + ' 60+-' + Math.round(h) + ' ' + data[index][3];
    }

    let end = +new Date;
    console.log(end - start);

    fs.writeFile('./out.txt', answer);

  });
});