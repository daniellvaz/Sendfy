const { Menu, app, ipcMain, BrowserWindow } = require("electron");
const systemSchema = require("../store/system.schema");

const settings = systemSchema.get("preferences");

const menuTemplate = [
  {
    label: "Abrir",
    click: () => ipcMain.emit("open-window"),
  },
  { label: "Fechar", click: app.quit },
  {
    label: "Sempre ao topo",
    type: "checkbox",
    checked: settings.alwaysOnTop,
    click: (element) =>
      systemSchema.set("preferences", {
        alwaysOnTop: element.checked,
        theme: settings.theme,
        draggable: settings.draggable,
      }),
  },
  { type: "separator" },
  {
    label: "Configurações",
    submenu: [
      {
        label: "Preferências",
        click: () => ipcMain.emit("open-settings"),
      },
      {
        label: "Configurações do Sistema",
        click: () => systemSchema.openInEditor(),
      },
    ],
  },
];

const menu = new Menu.buildFromTemplate(menuTemplate);

module.exports = menu;
