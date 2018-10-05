'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
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

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        'This generator will create a new IWA in your Liquid State IWA monorepo project'
      )
    );

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your new IWA name (This should be a short slug)',
        store: true
      },
      {
        type: 'input',
        name: 'title',
        message: 'Enter the default html title for your IWA',
        default: 'Liquid State IWA',
        store: true
      }
      // eslint-disable-next-line no-return-assign
    ]).then(props => (this.props = props));
  }

  writing() {
    const path = dir => this.destinationPath(`packages/${this.props.name}-iwa/${dir}`);

    this.fs.copy(this.templatePath('public'), path('public'));
    this.fs.copy(this.templatePath('src'), path('src'));

    this.fs.copyTpl(
      this.templatePath('stories/index.js'),
      path('stories/index.js'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      path('package.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('webapp.json.ejs'),
      path('src/webapp.json'),
      this.props
    );

    // Update the list of imported stories by reading the current file and applying a code transform.
    this._updateStoriesConfig(`${this.props.name}-iwa`);
  }

  _updateStoriesConfig(iwaName) {
    const configPath = this.destinationPath('./.storybook/config.js');
    const storyConfig = this.fs.read(configPath);

    const result = babel.transform(storyConfig, {
      plugins: [storybookBabelPlugin(iwaName)],
      presets: [babelReact]
    });
    this.fs.write(configPath, result.code);
  }

  end() {
    this.spawnCommandSync('yarn', ['lerna', 'bootstrap']);
  }
};
