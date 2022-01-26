const { Menu } = require("electron");
const { settings } = require("../store/settings.schema");

const settingsPreferences = settings.get("system");

const menuTemplate = [
  { label: "Sempre ao topo", click: () => console.log(settingsPreferences) },
];

const menu = new Menu.buildFromTemplate(menuTemplate);

module.exports = menu;
