'use strict';
const fs = require('fs').promises;
const glob = require('glob');

glob('formatted/*', (err, matches) => {
  if (err) {
    console.log('ERROR: ' + err);
  } else {
    for (let i = 0; i < matches.length; i++) {
      fs.unlink(matches[i], (err) => {if (err) throw err});
    }
    console.log('Directory cleared!');
  }
});

glob('raw/*.json', (err, matches) => {
  if (err) {
    console.log('ERROR: ' + err);
  } else {
    for (let i = 0; i < matches.length; i++) {
      (async () => {
        let contents = await fs.readFile(matches[i], 'utf-8');
        let directory = matches[i].split('/');
        let name = 'formatted/' + directory[directory.length - 1];
        fs.writeFile(name, contents, (err) => {if (err) throw err});
      })();
    }
    console.log("----Script Complete----");
  }
});