const { ipcRenderer } = require("electron");
import createForm from "./scripts/form.js";
import "./scripts/bar.js";

const socket = io();
const hour = new Date().getHours();
const minutes = new Date().getMinutes();
const username = localStorage.getItem("username");
const content = document.querySelector(".content");
const now = `${hour < 10 ? "0" + hour : hour}:${
  minutes < 10 ? "0" + minutes : minutes
}`;

createForm(socket);

ipcRenderer.on("username", (e, args) => {
  localStorage.setItem("username", args);
  window.location.reload();
});

//socket
socket.on("message", ({ username, message }) => {
  const me = localStorage.getItem("username");

  const card = `
    <div class="card ${username === me ? "self" : "other"}">
      <p>${message}</p>
      <strong>
        ${now}<br>
        ${username}
      </strong>
    </div>
  `;

  content.innerHTML += card;
});
