const babel = require('@babel/core');
const babelReact = require('@babel/preset-react');

const storybookBabelPlugin = iwaName => ({ types: t }) => ({
  visitor: {
    Function(path) {
      // Find the loadStories function
      if (path.node.id && path.node.id.name === 'loadStories') {
        const body = path.get('body');
        let found = false;
        // Find all string literals contained in its body.
        // If we find the iwaName assume it is being required already
        path.traverse({
          StringLiteral(path) {
            if (path.node.value.includes(iwaName)) {
              found = true;
            }
          }
        });
        // If we didn't find the iwa name, insert a require call.
        if (!found) {
          body.pushContainer(
            'body',
            t.callExpression(t.identifier('require'), [
              t.stringLiteral(`${iwaName}/stories`)
            ])
          );
        }
      }
    }
  }
});

function updateStoriesConfig(fs, path, iwaName) {
  const storyConfig = fs.read(path);

  const result = babel.transform(storyConfig, {
    plugins: [storybookBabelPlugin(iwaName)],
    presets: [babelReact]
  });
  fs.write(path, result.code);
}

module.exports = updateStoriesConfig;
