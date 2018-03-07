const path = require('path');
const fs = require('fs');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireEslint = require('react-app-rewire-eslint');

// Theme support for antd and Liquid State UI Kit.
// Load Package.json
const pkgPath = path.join(__dirname, 'package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};

let theme = {};
if (pkg.theme && typeof (pkg.theme) === 'string') {
  let cfgPath = pkg.theme;
  const getThemeConfig = require(cfgPath);
  theme = getThemeConfig();
} else if (pkg.theme && typeof (pkg.theme) === 'object') {
  theme = pkg.theme;
}


/* config-overrides.js */
module.exports = function override(config, env) {
  // Use the antd import plugin which triggers less compilation and theming.
  config = injectBabelPlugin([
    "import",
    {
      "libraryName": "antd",
      "style": true
    }
  ], config);
  // Support for theming antd and custom components.
  const loaderOptions = { modifyVars: theme };
  config = rewireLess.withLoaderOptions(loaderOptions)(config, env);

  // Support custom .eslintrc
  config = rewireEslint(config, env);
  return config;
}