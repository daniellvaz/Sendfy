const { Menu, app } = require("electron");

const menuTemplate = [
  {
    label: "Sempre ao topo",
    click: () => console.log("teste"),
  },
  { label: "Sair", click: () => app.quit() },
];

const menu = new Menu.buildFromTemplate(menuTemplate);

module.exports = menu;
