// src/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false, // Only for development; disable in production
            webSecurity: false,
        },
    });
   
// win.loadURL('http://localhost:3000').catch((err)=>{
//     console.log(err);
    
// })
      win.loadFile(path.join(process.cwd(), 'build', 'index.html')).catch((error) => {
        console.error('Failed to load URL:', error);
      });
      win.webContents.openDevTools();

}

app.on('ready', createWindow);
