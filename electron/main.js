const path = require("path");
const prompt = require("electron-prompt");
const createTray = require("./src/tray/createTray");
const createWindow = require("./src/window/createWindow");
const { app, BrowserWindow, ipcMain, remote } = require("electron");

app.whenReady().then(() => {
  const tray = createTray();
  const { x, y } = tray.getBounds();

  tray.addListener("click", () => createWindow({ x, y }));
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("check-user", async (e, a) => {
  const response = await prompt({
    title: "Erro",
    label: "Insira um nome de usuário:",
    type: "input",
    height: 200,
    icon: path.resolve(__dirname, "./assets/icons/png/16x16.png"),
  });

  if (response) {
    e.sender.send("username", response);
  }
});
