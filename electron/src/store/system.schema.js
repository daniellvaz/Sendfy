const Store = require("electron-store");

const Schema = {
  system: {
    alwaysOnTop: {
      type: "boolean",
      default: false,
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
