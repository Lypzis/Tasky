const path = require('path'); //one of the default node library, helps with cross platform path issues
const electron = require('electron');

//import my custom timer-tray class
const TimerTray = require('./app/timer-tray');
const MainWindow = require('./app/main_window');

//import tray constructor for this app
const { app, BrowserWindow } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    if (process.platform === 'darwin'){ app.dock.hide() };

    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'; //@2x is a reserved key word autodetected if needed
    // __dirname is a reference to the current working directory
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    //receives an image path to be the icon and mainWindow;
    tray = new TimerTray(iconPath, mainWindow); //automatically get garbage collected after some time inactive if not instantiated to tray

});
