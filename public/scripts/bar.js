const { ipcRenderer } = require("electron");

const closeButton = document.getElementById("close");
const minimizeButton = document.getElementById("minimize");

closeButton.addEventListener("click", () => {
  ipcRenderer.send("close-window");
});

minimizeButton.addEventListener("click", () => {
  ipcRenderer.send("minimize-window");
});
