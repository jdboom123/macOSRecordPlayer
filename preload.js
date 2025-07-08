const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld('audio',{
    createMediaElementSource: (audioElement) => {
       console.log(audioElement)
    }
})