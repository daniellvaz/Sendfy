const Store = require("electron-store");
const { JSONSchemaType } = require("json-schema-typed");

const settingsSchema = {
  system: {
    type: JSONSchemaType.Array,
    default: [
      {
        alwaysOnTop: {
          type: "boolean",
          default: false,
        },
      },
    ],
    items: {
      type: JSONSchemaType.Object,
      default: {},
      properties: {
        alwaysOnTop: {
          type: "boolean",
          default: false,
        },
      },
    },
  },
};

const settings = new Store(settingsSchema);

module.exports = { settings };
