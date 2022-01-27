const path = require("path");
const prompt = require("electron-prompt");
const createWindow = require("./src/window/createWindow");
const { app, BrowserWindow, ipcMain } = require("electron");
const settings = require("./src/settings/settings");

const platform = process.platform;
const App = () => {
  const tray = require("./src/tray/createTray");
  const { x, y } = tray.getBounds();

  settings.setDefaultConfigurations({ x, y });

  tray.addListener("double-click", () => createWindow());
  tray.addListener("right-click", () => console.log("aqui"));

  if (platform === "darwin") {
    app.dock.hide();
  }
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
};

app.whenReady().then(App);
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
