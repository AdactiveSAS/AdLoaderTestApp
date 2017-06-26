const autoUpdater = require("electron").autoUpdater;
var pjson = require('./package.json');

console.log("Set Squirel");
const SERVER = 'http://localhost:4000'

module.exports = {
  handleSquirrelEvent: function () {

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
      alert("Install?")
      autoUpdater.quitAndInstall()
    })

    //const UPDATE_SERVER_HOST = "apps.adsum.io";
    //const version = "1.0.2";
    //autoUpdater.setFeedURL(`http://${UPDATE_SERVER_HOST}/update/win32/${version}`);


    autoUpdater.setFeedURL(SERVER + '/AdactiveSAS/'+ pjson.name)
    autoUpdater.checkForUpdates()

  }
}
