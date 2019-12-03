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
    console.log('Cleared old files');
  }
});

glob('raw/*.json', (err, matches) => {
  if (err) {
    console.log('ERROR: ' + err);
  } else {
    for (let i = 0; i < matches.length; i++) {
      (async () => {
        let directory = matches[i].split('/');
        let name = 'formatted/' + directory[directory.length - 1];
        let rawCoords = JSON.parse(await fs.readFile(matches[i], 'utf-8')).features[0].geometry.coordinates[0];
        console.log(rawCoords);
        //fs.writeFile(name, contents, (err) => {if (err) throw err});
      })();
    }
  }
});

process.on('exit', function(code) {
  return console.log('---Script Complete----');
});