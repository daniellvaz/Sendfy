const path = require("path");
const { BrowserWindow, ipcMain } = require("electron");
const settings = require("../settings/settings");

const createWindow = () => {
  const platform = process.platform;
  const { x, y } = settings.getWindowPosition();
  const { alwaysOnTop, dragable } = settings.getPreferences();

  const win = new BrowserWindow({
    width: 400,
    height: 600,
    fullscreenable: false,
    resizable: false,
    frame: false,
    alwaysOnTop,
    movable: dragable,
    transparent: true,
    skipTaskbar: true,
    x,
    y,
    webPreferences: {
      preload: path.resolve(__dirname, "../preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (platform !== "darwin") {
    win.setIcon(path.resolve(__dirname, "../../assets/icons/win/icon.ico"));
  }

  win.setIcon(path.resolve(__dirname, "../../assets/icons/png/24x24.png"));
  win.loadURL(settings.getUrl());

  ipcMain.on("minimize-window", () => win.minimize());
  ipcMain.on("close-window", () => win.hide());
  ipcMain.on("open-window", () => win.show());
  ipcMain.on("open-settings", () => win.webContents.send("open-settings"));
};

module.exports = createWindow;
