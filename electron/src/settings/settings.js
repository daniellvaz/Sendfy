const systemSchema = require("../store/system.schema");

const settings = {
  getWindowPosition() {
    const { position } = systemSchema.get("screen");

    return position[0];
  },
  getUrl() {
    const { host, port } = systemSchema.get("system");
    const url = `${host}:${port}`;

    return url;
  },
  getPreferences() {
    const response = systemSchema.get("preferences");

    return response;
  },
  setDefaultConfigurations({ x, y }) {
    const values = systemSchema.get("system");
    const defaultSettings = {
      system: {
        host: "http://localhost",
        port: 3000,
      },
      preferences: {
        alwaysOnTop: false,
        dragable: false,
        theme: "dark",
        isMacOsActionButtonsEnable: false,
      },
      screen: {
        position: [
          {
            x: x - 160,
            y: y - 616,
          },
        ],
      },
    };

    if (!values) {
      systemSchema.set("system", defaultSettings.system);
      systemSchema.set("screen", defaultSettings.screen);
      systemSchema.set("preferences", defaultSettings.preferences);
    }
  },
};

module.exports = settings;
