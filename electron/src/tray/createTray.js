const { Tray, nativeImage } = require("electron");
const path = require("path");
const menu = require("./trayMenu");

const createTray = () => {
  const image = nativeImage.createFromPath(
    path.resolve(__dirname, "../../assets/icons/png/16x16.png")
  );
  const tray = new Tray(image);

  tray.setToolTip("Sendfy");
  tray.setContextMenu(menu);

  return tray;
};

module.exports = createTray();
