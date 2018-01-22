//const path = require('path');
//const os = require('os');
//const url = require('url');
//const moment = require('moment');
//const fs = require('fs');
const nodeConsole = require('console');
const mainConsole = new nodeConsole.Console(process.stdout, process.stderr);
//mainConsole.log('banknote start ===>');

// app 모듈과 BrowserWindow 모듈 할당
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const ipc = electron.ipcMain;
//const shell = electron.shell;
//const session = electron.session;
//const dialog = electron.dialog;

// mainWindow Global variable
let mainWindow;

// new-window (pop-up window setting)
// https://github.com/electron/electron/blob/master/docs/api/sandbox-option.md reference
app.commandLine.appendSwitch('enable-sandbox');

/*
const blankHandler = (function() {
    let maxCount = 6
    let count = 0
    let webContents = null
    function check() {
        if (!webContents) {
            return
        }
        webContents.executeJavaScript('(function() {if(document.body) { return document.body.childElementCount; } else { return 0; } })();', true).then((result) => {
            console.log(result)
            if (result === null) {
                return
            } else {
                if (result) { // Boolean(result === 0) => false
                    clear()
                } else {
                    if (count < maxCount) {
                        count++
                        console.log('count:', count)
                        webContents.reload()
                    } else {
                        show404Page()
                        clear()
                    }
                }
            }
        },
        (error) => {
            console.error(error)
        })
    }
    function clear() {
        count = 0
        webContents = null
    }
    return {
        run: function(wc) {
            webContents = wc
            check()
        }
    }
})()

function show404Page() {
    if(mainWindow) {
        desktopSearch.closeDesktopSearch()
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '/resource/web/404page.html'),
            protocol: 'file:',
            slashes: true
        }))
    }
}
*/

// mainWindow(Browser) create function
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width : 1350
        , minWidth : 1024
        , height : 900
        , minHeight : 768
        , show : false
        , icon : __dirname + '/resources/installer/banknote_app.ico'
        , webPreferences : {
            defaultFontSize : 14,
            webSecurity: false,
            sandbox: true //appendSwitch point
        }
    });

    // and load the renderer view of the app.
    mainWindow.loadURL(`http://www.banknote.works`); // banknote showroom

    // 창이 ready 상태가되면 보여주기
    mainWindow.once('ready-to-show', function(){
        mainWindow.show();
    });

    // Open the DevTools.
    //mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('close', function(){
        //윈도우 객체의 참조를 삭제합니다.
        //보통 멀티 윈도우 지원을 위해 윈도우 객체를 배열에 저장하는 경우가 있는데
        //이경우 해당하는 모든 윈도우 객체의 참조를 삭제해 주어야 함
        mainWindow = null;
    });
}

// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function(){
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if(process.platform != 'darwin'){
        app.quit();
    }
});

//app activate event function
app.on('activate', function(){
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if(mainWindow == null) {
        createWindow();
    }
});
