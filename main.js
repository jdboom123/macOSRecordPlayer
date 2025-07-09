const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require("path");
const fs = require('fs');

async function handleSongDataOpen(){
  const songData = require('./assets/songs.json')
  console.log(songData)
  return songData
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    resizable: true, // TODO change this to false for final product
    webPreferences:{
      preload: path.join(__dirname, 'preload.js') // TODO do i need to change the __dirname
    }
  })


  win.loadFile('./source/index.html')

  // UnComment to debug with dev tools
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:openSongData', handleSongDataOpen)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
