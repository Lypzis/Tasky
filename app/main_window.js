/* 
* Doc: Set up custom main window logic;
*
*/

const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow{
     constructor(url){
        //The only reason these custom options are inside the constructor
        //is because it will be static, always have the same height, width and so on
        super({
            //set height and width, as it must be a tiny window
            height: 500,
            width: 300,
            frame: false, //removes the taskbar
            resizable: false, //not resizable
            show: false, //not showing
            skipTaskbar: true //does not show process in taskbar(Windows platform)
        });

        this.loadURL(url);
        this.on('blur', this.onBlur.bind(this));
     }

     //when window lose focus, hide it
     onBlur(){
        this.hide();
     }
}

module.exports = MainWindow;