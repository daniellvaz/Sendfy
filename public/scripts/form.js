const { ipcRenderer } = require("electron");

const form = document.querySelector("#form-chat");
const input = document.querySelector("#input-chat");

export default function createForm(socket) {
  const username = localStorage.getItem("username");

  if (username == null) {
    ipcRenderer.send("check-user");
    return;
  }

  if (!form || !input) {
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;

    if (!value) {
      return;
    }

    socket.emit("message", { username, message: value });

    input.value = "";
  });
}
