const { contextBridge, ipcRenderer } = require('electron')
 
contextBridge.exposeInMainWorld('api', {
    close: () => {
        return ipcRenderer.sendSync('close')
    }
})