const { Menu, app, ipcMain } = require("electron");
const systemSchema = require("../store/system.schema");

const { alwaysOnTop } = systemSchema.get("system");
const path = app.getPath("userData");
const menuTemplate = [
  {
    label: "Sempre ao topo",
    click: () =>
      systemSchema.set("system", { alwaysOnTop: alwaysOnTop ? false : true }),
  },
  {
    label: "Abrir",
    click: () => ipcMain.emit("open-window"),
  },
  { label: "Sair", click: app.quit },
  { type: "separator" },
  { label: "Configurações", click: () => systemSchema.openInEditor },
];

const menu = new Menu.buildFromTemplate(menuTemplate);

module.exports = menu;
