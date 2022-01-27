const systemSchema = require("../store/system.schema");

const settings = {
  getWindowPosition() {
    const { position } = systemSchema.get("screen");

    return position[0];
  },
  setDefaultConfigurations({ x, y }) {
    const values = systemSchema.get("system");
    const defaultSettings = {
      system: {
        alwaysOnTop: false,
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
    }
  },
};

module.exports = settings;
