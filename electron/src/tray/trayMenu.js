const { Menu } = require("electron");

const menuTemplate = [
  { label: "Enviar mensagem", click: () => console.log("mensagem enviada") },
];

const menu = new Menu.buildFromTemplate(menuTemplate);

module.exports = menu;
