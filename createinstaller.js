const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')
var pjson = require('./package.json');

//https://github.com/electron/windows-installer

console.log("Create Installer ");
console.log("-- Application name :  " + pjson.name);
console.log("-- Application version :  " + pjson.version);
console.log("-- Application author :  " + pjson.author);

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')

  return Promise.resolve({
    appDirectory: path.join(rootPath, 'build/'+pjson.name+'-win32-x64'),
    authors: pjson.author,
    noMsi: true,
    outputDirectory: path.join(rootPath, 'installers'),
    exe: pjson.name +'.exe',
    setupExe: 'installer.exe',
    setupIcon: path.join(rootPath, 'assets', 'icon.ico')
  })
}