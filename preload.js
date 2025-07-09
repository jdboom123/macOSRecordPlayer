const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld('songReq',{
    songDataRequest: () => {
       console.log("Renderer is requeseting data");
       const result =  ipcRenderer.invoke('dialog:openSongData');
       return result;
       
    }
})