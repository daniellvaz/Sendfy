const Store = require("electron-store");

Store.initRenderer();

const Schema = {
  system: {
    host: {
      type: "string",
      default: "http://localhost",
    },
    port: {
      type: "number",
      default: 3000,
    },
  },
  preferences: {
    alwaysOnTop: {
      type: "boolean",
      default: false,
    },
    dragable: {
      type: "boolean",
      default: false,
    },
    theme: {
      type: "string",
      default: "dark",
    },
    isMacOsActionButtonsEnable: {
      type: "boolean",
      default: "false",
    },
  },
  screen: {
    position: [
      {
        x: {
          type: "number",
          default: 0,
        },
        y: {
          type: "number",
          default: 0,
        },
      },
    ],
  },
};

const systemSchema = new Store(Schema);

module.exports = systemSchema;
