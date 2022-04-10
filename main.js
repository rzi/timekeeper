// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  webContents,
  ipcMain,
  autoUpdater,
} = require("electron");
const path = require("path");

function createWindow1() {
  window1 = new BrowserWindow({
    // width: 600,
    // height: 800,
    x: 0,
    y: 0,
    maximizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: false,
    },
  });
  window1.loadURL(`file://${__dirname}/index.html`);
  window1.webContents.openDevTools();
  console.log("size:", window1.getSize());
  console.log("bounds:", window1.getBounds());
  window1.on("closed", function () {
    window1 = null;
  });
  return window1;
}
function createWindow2() {
  window2 = new BrowserWindow({
    minWidth: 600,
    minHeight: 60,
    maxHeight: 60,
    width: 700,
    height: 60,
    x: 900,
    y: 900,
    frame: false,
    alwaysOnTop: true,
    maximizable: false,
    useContentSize: true,
    // transparent: true,
    //autoHideMenuBar: true,
    // titleBarOverlay: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: false,
    },
  });
  window2.loadURL(`file://${__dirname}/progressBar.html`);
  window2.webContents.openDevTools();
  window2.on("closed", function () {
    window2 = null;
  });
  window2.on("focus", function () {
    // console.log("focus")
    // console.log (`Visible ${window2.isVisible()} is focus ${window2.isFocused()}`)
    window2.show();
    window2.focus();
    window2.setSize(700, 60);
    //document.getElementById("linia").style.borderTopColor='red';
  });
  // window2.on("blur", function(){
  //   console.log("blur")
  //   console.log (`Visible ${window2.isVisible()} is focus ${window2.isFocused()}`)
  // });
  return window2;
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  window1 = createWindow1();
  //window1.setMenuBarVisibility(false);
  window2 = createWindow2();
  window2.setMenuBarVisibility(false);
  ipcMain.on("nameMsg", (event, arg) => {
    console.log("name inside main process is: ", arg); // this comes form within window 1 -> and into the mainProcess
    event.sender.send("nameReply", { not_right: false }); // sends back/replies to window 1 - "event" is a reference to this chanel.
    window2.webContents.send("forWin2", arg); // sends the stuff from Window1 to Window2.
  });
  ipcMain.on("nameMsg2", (event, arg) => {
    console.log("name2 inside main process is: ", arg); // this comes form within window 1 -> and into the mainProcess
    event.sender.send("nameReply", { not_right: false }); // sends back/replies to window 1 - "event" is a reference to this chanel.
    window1.webContents.send("forWin1", arg); // sends the stuff from Window1 to Window2.
  });
  ipcMain.on("stop", (event, arg) => {
    console.log("stop inside main process is: ", arg); // this comes form within window 1 -> and into the mainProcess
    event.sender.send("nameReply", { not_right: false }); // sends back/replies to window 1 - "event" is a reference to this chanel.
    window1.webContents.send("forWin1Stop", arg); // sends the stuff from Window1 to Window2.
  });
  ipcMain.on("showProgress", (event, arg) => {
    console.log("showProgress inside main process is: ", arg); // this comes form within window 1 -> and into the mainProcess
    event.sender.send("nameReply", { not_right: false }); // sends back/replies to window 1 - "event" is a reference to this chanel.
    if (window2.isVisible()) {
      window2.hide();
    } else {
      window2.show();
    }
  });
  ipcMain.on("winDimmension", (event, arg) => {
    console.log("window dimension: ", arg); // this comes form within window 1 -> and into the mainProcess
    event.sender.send("nameReply", { not_right: false }); // sends back/replies to window 1 - "event" is a reference to this chanel.
    console.log(`width ${arg.winWidth} x ${arg.winHeight}`);
    window1.setSize(arg.winWidth, arg.winHeight);
  });
  ipcMain.on("Exit", (event, arg) => {
    console.log("Exit ", arg); // this comes form within window 1 -> and into the mainProcess
    event.sender.send("nameReply", { not_right: false }); // sends back/replies to window 1 - "event" is a reference to this chanel.
    app.quit();
  });
});
