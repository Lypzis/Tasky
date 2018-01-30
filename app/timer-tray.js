/* 
* Doc: Set up custom Tray window logic;
*
*/

const electron = require('electron');
const { app, Tray, Menu } = electron;

class TimerTray extends Tray{
    constructor(iconPath, mainWindow){
        super(iconPath);

        this.mainWindow = mainWindow;

        //tooltip, when hovered, show the name of the application
        this.setToolTip('Timer App');

        //setup onclick handler
        this.on('click', this.onClick.bind(this));
        //setup on rightclick handler on the trayicon
        this.on('right-click', this.onRightClick.bind(this));

    }

    //display main window when clicked or hide it
    onClick(event, bounds){
        //Click event bounds
        const { x, y } = bounds;

        //Window height and width
        const { height, width } = this.mainWindow.getBounds();
        
        if (this.mainWindow.isVisible()){
            this.mainWindow.hide();
        } else {
            const yPosition = process.platform === 'win32' ? y - height : y;

            this.mainWindow.setBounds({
                x: x - width/2,
                y: yPosition,
                height,
                width
            });       
            this.mainWindow.show();
        } 
    }

    onRightClick(){
        const menuConfig = Menu.buildFromTemplate([
            {
                label : 'Quit',
                click: ()=> app.quit()
            }
        ]);

        this.popUpContextMenu(menuConfig);
    }

}

//make the class TimerTray importable by other scripts
module.exports = TimerTray;