const app = require("electron").app;
const path = require('path');

function handleSquirrelEvent() {

  if (process.platform !== "win32" || process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;
    
    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      var Registry = require(__dirname+'\\app\\node_modules\\winreg')
      ,   regKey = new Registry({                                       // new operator is optional
            hive: Registry.HKCU,                                        // open registry hive HKEY_CURRENT_USER
            key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' // open key containing autostart programs
          });
      regKey.set(
        'adloaderSandbox','REG_SZ',
        `${updateDotExe} --processStart ${exeName}`,
        ()=>{
          console.log("set");
          regKey.create(
            ()=>{
              console.log("create");
            }
          );
        }
      );

      return true;

    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      var Registry = require(__dirname+'\\app\\node_modules\\winreg')
      ,   regKey = new Registry({                                       // new operator is optional
            hive: Registry.HKCU,                                        // open registry hive HKEY_CURRENT_USER
            key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' // open key containing autostart programs
          });
      regKey.set(
        'adloaderSandbox','REG_SZ',
        `${updateDotExe} --processStart ${exeName}`,
        ()=>{
          console.log("set");
          regKey.create(
            ()=>{
              console.log("create");
            }
          );
        }
      );

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      //setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      //setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      //app.quit();
      return true;
  }
};


module.exports = handleSquirrelEvent;