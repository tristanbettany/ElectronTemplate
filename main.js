const { app, Menu, Tray, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { handleSquirrelEvent } = require ('./squirrel.js')
const Store = require('electron-store');
 
if (require('electron-squirrel-startup')) {
    handleSquirrelEvent()
}
 
let tray = null
 
function boot() {
    const hiddenWin = new BrowserWindow({
        width: 100,
        height: 100,
        show: false,
        frame: false,
        webPreferences: {
            nativeWindowOpen: true,
        }
    })
 
    let settingsWindow = null
    const store = new Store();
    tray = new Tray(path.join(__dirname, 'icon.png'))
 
    let contextMenu = Menu.buildFromTemplate([
        {
            label: 'Settings',
            click: () => {
                // Anything to do with the settings window
 
                let createWindow = () => {
                    settingsWindow = new BrowserWindow({
                        width: 1200,
                        height: 700,
                        show: false,
                        fullscreenable: false,
                        maximizable: false,
                        minimizable: false,
                        webPreferences: {
                            nativeWindowOpen: true,
                            preload: path.join(__dirname, 'renderer/preload.js')
                        }
                    })
                    settingsWindow.setMenu(null)
                    settingsWindow.loadFile(path.join(__dirname, 'renderer/settings.html'))
                    settingsWindow.show()
                    //settingsWindow.openDevTools()
 
                    settingsWindow.on('will-resize', (e) => {
                        e.preventDefault();
                    });
 
                    ipcMain.on('close', (event) => {
                        settingsWindow.destroy()
                    });
                }
 
                if (settingsWindow === null) {
                    createWindow()
                } else {
                    if (settingsWindow.isDestroyed() === true) {
                        createWindow()
                    } else {
                        settingsWindow.focus()
                    }
                }
            }
        },
        {
            type: 'separator',
        },
        {
            label: 'Quit',
            click: () => {
                app.exit()
            }
        },
    ])
 
    tray.setToolTip('Electron Template')
    tray.setContextMenu(contextMenu)
}
 
app.on('ready', boot)