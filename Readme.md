#Run

- npm run build 
-> Will build you app with electron on top of it : Note : it will be build in 64 by default

- npm run install

Once the app is build, this command will package it and create an "installer". I can't make the msi installer work


#Configuration

Please set in package.json the following fields : 

- name : The name will be user for your exe name 
- icon : You can cahnge the icon of the application by changing the one in asset folder
- version :Current version of the app ! Important for autoupdate


# How it works

## electron-winstaller & squirell-events-spawn

### Create Installer
Build Windows Installers for Electron apps. After running you will have an .nupkg, a RELEASES file, and a .exe installer file in the outputDirectory folder for each multi task target given under the config entry.

### Handling Squirrel Events

Use electron-squirrel-startup  for common events

Squirrel will spawn your app with command line flags on first run, updates, and uninstalls. it is very important that your app handle these events as early as possible, and quit immediately after handling them. Squirrel will give your app a short amount of time (~15sec) to apply these operations and quit.

Events are : 

--squirrel-install
--squirrel-updated
--squirrel-uninstall
--squirrel-updated 
--squirrel-obsolete

Then, you have to add theses event handler which seems to communicate with Update.exe through command


## electron-AutoUpdate
Module of the Electron main Process. It provides an interfacte for the squirrel framework. It's use for the connection of the nuts server. It request it and get informations of package on github.

## electron-squirrel-startup

The electron-squirrel-startup module will handle the most common events for you, such as managing desktop shortcuts. Just add the following to the top of your main.js and you're good to go:
if (require('electron-squirrel-startup')) return;