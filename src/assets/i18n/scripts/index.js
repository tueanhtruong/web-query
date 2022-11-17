/* eslint-disable security/detect-object-injection */
var data = require('./data.json');
var fs = require('fs');

try {
  const en = {};
  const vn = {};

  data.map((item) => {
    const { key: label } = item;
    en[label] = item.English;
    vn[label] = item.Vietnamese;
    return null;
  });

  fs.writeFile('en.json', JSON.stringify(en), (err) => {});

  fs.writeFile('vn.json', JSON.stringify(vn), (err) => {});
} catch (error) {
  console.log('error', error);
}
