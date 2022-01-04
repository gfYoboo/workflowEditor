import * as elIconModules from "@element-plus/icons";
export default (app) => {
  for (const iconName in elIconModules) {
    app.component(iconName, elIconModules[iconName]);
  }
};
