const translate = require('@vitalets/google-translate-api');
const fs = require('fs');

const languages = [
  'ar',

]

let originalJsonFile = {};
let languageIndex = 0;
let toExport = {};

console.log('hello world')

let template = ``;

 function trans() {
  for(let i = 6; i < languages.length; i++) {
    languageIndex = i

    fs.readFile('./translahggfhte.json', 'utf8', (err, json) => {

        originalJsonFile = JSON.parse(json);
        toExport = JSON.parse(json);


    for(let key in toExport) {

    if(toExport.hasOwnProperty(key)) {
      toExport = originalJsonFile



          translate(originalJsonFile[key], {to: languages[i]}).then(res => {
            toExport[key] = res.text;

        template = `
        let ${languages[i] == 'ar' ? 'ar_ma' : languages[i] == 'zh-CN' ? 'zh' : languages[i]} = ${JSON.stringify(toExport)}

        export default ${languages[i] == 'ar' ? 'ar_ma' : languages[i] == 'zh-CN' ? 'zh' : languages[i]};
        `

        fs.writeFile(`${languages[i] == 'ar' ? 'ar_ma' : languages[i] == 'zh-CN' ? 'zh' : languages[i]}.js`, template, function(err, result) {
          if(err) console.log('error', err);

        });
          }).catch(err => {
            console.log(originalJsonFile[key]);
            console.log(err);
            console.log('error 1');
            return;
          });

    } else {
      console.log('error');
    }

    }

    });
  }

}


trans()
