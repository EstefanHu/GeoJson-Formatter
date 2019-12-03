'use strict';
const fs = require('fs').promises;
const util = require('util');
const glob = require('glob');
const globPromise = util.promisify(glob);

glob('raw/*.json', (err, matches) => {
  if (err) {
    console.log("ERROR: " + err);
  } else {
    for (let i = 0; i < matches.length; i++) {
      (async () => {
        let contents = await fs.readFile(matches[i], 'utf-8');
        console.log(contents);
      })();
    }
  }
  console.log("----Script Complete----");
});