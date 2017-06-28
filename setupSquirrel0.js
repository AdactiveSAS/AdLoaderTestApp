const autoUpdater = require("electron").autoUpdater;
var pjson = require('./package.json');

console.log("Set Squirel 1");
console.log("Set Squirel 2");
console.log("Set Squirel 3");


const SERVER_URL = `http://localhost:4000/${pjson.name}/update/win32/${pjson.version}`

module.exports = {
  register: function () {

    autoUpdater.on('update-availabe', () => {
      console.log('update available')
    })
    autoUpdater.on('checking-for-update', () => {
      console.log('checking-for-update')
    })
    autoUpdater.on('update-not-available', () => {
      console.log('update-not-available')
    })
    autoUpdater.on('update-downloaded', (e) => {
      console.log(e)
      //alert("Install?")
      autoUpdater.quitAndInstall()
    });

    console.log("Set feed url :" + SERVER_URL);

    autoUpdater.setFeedURL(SERVER_URL);
    autoUpdater.checkForUpdates();
  }
}
