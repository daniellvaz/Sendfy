const { ipcRenderer } = require("electron");
const Store = require("electron-store");

const store = new Store();
const settings = store.get("preferences");

const winAction = document.querySelector(".win");
const darwinAction = document.querySelector(".darwin");
const form = document.getElementById("form-preferences");
const preferencesContent = document.querySelectorAll(".preferences-item");

function handleActionButtons(value) {
  if (!value) {
    winAction.classList.toggle("open");
    return;
  }

  darwinAction.classList.toggle("open");
}

export const createPreferencesForm = () => {
  if (!form) {
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target).entries());

    ipcRenderer.send("save-preferences", {
      theme: data.theme,
      alwaysOnTop: data.alwaysOnTop === "on" ? true : false,
      draggable: data.draggable === "on" ? true : false,
      isMacOsActionButtonsEnable:
        data.isMacOsActionButtonsEnable === "on" ? true : false,
    });
  });

  preferencesContent.forEach((element) => {
    console.log(element.childNodes);
  });
};

handleActionButtons(settings.isMacOsActionButtonsEnable);
