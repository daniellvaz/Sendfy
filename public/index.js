const socket = io();
const formChat = document.querySelector("#form-chat");
const inputChat = document.querySelector("#input-chat");
const content = document.querySelector(".content");
const hour = new Date().getHours();
const minutes = new Date().getMinutes();
const now = `${hour < 10 ? "0" + hour : hour}:${
  minutes < 10 ? "0" + minutes : minutes
}`;
let username = localStorage.getItem("username");

function handleUserName() {
  const response = window.prompt("Para começar inclua um usuário!");

  if (!response) {
    return (window.location.href = "/errors");
  }

  localStorage.setItem("username", response);
  window.location.reload();
}

if (!username && window.location.pathname === "/") {
  handleUserName();
}

document.title += ` ${username}`;

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputChat.value;

  if (!value) {
    return;
  }

  socket.emit("message", { username, message: value });
  inputChat.value = "";
});

socket.on("user-online", (user) => {
  localStorage.setItem("username", user);
});

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
