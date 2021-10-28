const fs = require('fs');
const {execSync} = require('child_process');

execSync('npm version patch');

const package = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const version = package.version;

if (!fs.existsSync('./.env')) {
  fs.writeFileSync("./.env", 'REACT_APP_VERSION=""');
}

let envfile = fs.readFileSync('./.env', 'utf-8');

envfile = envfile.replace(/REACT_APP_VERSION=".*"/, `REACT_APP_VERSION="v${version}"`);

fs.writeFileSync('./.env', envfile);


