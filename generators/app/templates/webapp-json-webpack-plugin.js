const _ = require('lodash');

function WebappJSONPlugin(options) { }

WebappJSONPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {

    let locales = [];
    let iwaModule = null;

    for (let m of compilation.modules) {
      if (m.resource && m.resource.includes('locales') && m.resource.includes('.json')) {
        locales.push({
          key: localeNameFromModule(m),
          value: moduleAsJson(m)
        });
      }
      if (m.resource && m.resource.includes('webapp.json')) {
        iwaModule = moduleAsJson(m);
      }
    }

    if (!iwaModule) {
      callback();
      return;
    }

    if (locales.length && iwaModule.actions && iwaModule.actions.presentations) {
      translateActions(iwaModule, locales);
    }

    // Pretty Printed.
    let result = JSON.stringify(iwaModule, null, 4);

    compilation.assets['webapp.json'] = {
      source: () => result,
      size: () => result.length
    }

    callback();
  });
}

module.exports = WebappJSONPlugin;

function translateActions(iwa, locales) {
  for (const action in Object.values(iwa.actions.presentations)) {
    const title = action.title;
    if (typeof title === 'string') {
      // Title is the translation key.
      // Convert it into an object
      action.title = title = { key: title };
    }
    // Support undefined.
    if (!title) {
      continue;
    }
    title.translations = getTranslationsForKey(locales, title);
  }
}

function localeNameFromModule(mod) {
  let path = mod.resource;
  let filename = path.substr(path.lastIndexOf('/') + 1);
  return filename.slice(0, filename.lastIndexOf('.'));
}

function moduleAsJson(mod) {
  let val = mod._source._value;
  // This has been converted to module.exports = {json_values};
  // Strip the leading and trailing characters.
  val = val.slice(val.indexOf('{'));
  val = val.slice(0, val.lastIndexOf('}') + 1);
  return JSON.parse(val);
}

function getTranslationsForKey(locales, title) {
  translations = {};
  for (let locale of locales) {
    // Deep get the dotted path from locale.value.
    let result = _.get(locale.value, title.key, null);
    if (result) {
      translations[locale.key] = result;
    }
  }
  return translations;
}
