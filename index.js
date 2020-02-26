const electron = require('electron');
const { app, BrowserWindow } = electron;
let win;
const path = require('path');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
app.on('ready', () => {
    win = new BrowserWindow({ resizable: false, maximizable: false });
    win.setMenu(null);
    win.maximize();
    win.isResizable(false);
    win.isMaximizable(false);
    win.loadURL(__dirname+'/index.html');
    if(!fs.existsSync(userDataPath+'/wallpapers')) {
        fs.mkdir(userDataPath+'/wallpapers');
    }
})
var fs = require('fs');

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };
app.on('close', ()=>{
    deleteFolderRecursive(userDataPath+'/wallpapers');
    fs.mkdir(userDataPath+'/wallpapers');
})
app.on('quit', ()=>{
    deleteFolderRecursive(userDataPath+'/wallpapers');
    fs.mkdir(userDataPath+'/wallpapers');
    app.quit();
})