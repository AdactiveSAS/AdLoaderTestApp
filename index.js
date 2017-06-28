const { app, BrowserWindow } = require('electron');
const path = require('path');

if(require('electron-squirrel-startup')) return;

require('electron-debug')({showDevTools: true});



const handleSquirrelEvent = require('./setupSquirrel');
if (handleSquirrelEvent(app))
  return;

const registerEvents = require('./setupSquirrel0')
//register events
registerEvents.register();


const pathtoindex = 'src/index.html';

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 1920,
    height: 1200,
    minWidth: 1920,
    minHeight: 1200,
    backgroundColor: '#312450',
    show: false,
    icon: path.join(__dirname, 'assets/64x64.png')
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/${pathtoindex}`)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()


  // Show the mainwindow when it is loaded and ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

