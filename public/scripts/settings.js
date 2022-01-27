const { ipcRenderer } = require("electron");

ipcRenderer.on("open-settings", () => {
  document.location.href = "/preferences";
});
