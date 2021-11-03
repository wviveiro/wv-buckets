const fs = require('fs');
const {execSync} = require('child_process');


const package = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const version = package.version;


execSync('git add .');
execSync(`git commit -m "bundle version ${version}"`);


