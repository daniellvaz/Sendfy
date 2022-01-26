const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = ({ x, y }) => {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    fullscreenable: false,
    resizable: false,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    x: x - 160,
    y: y - 616,
    webPreferences: {
      preload: path.resolve(__dirname, "../preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.setIcon(path.resolve(__dirname, "../../assets/icons/win/icon.ico"));
  win.loadURL("http://localhost:3000");

  ipcMain.on("minimize-window", () => {
    win.minimize();
  });

  ipcMain.on("close-window", (e, a) => {
    win.close();
  });
};

module.exports = createWindow;
