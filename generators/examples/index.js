'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    return this.prompt({
      type: 'confirm',
      name: 'examples',
      message: 'Include example content',
      store: true,
      default: true
    }).then(props => {
      this.props = props;
    });
  }

  configuring() {
    if (!this.props.examples) {
      return;
    }
    const packages = ['@storybook/react', 'less-loader', 'css-loader', 'style-loader'];

    if (this.options.yarn) {
      this.yarnInstall(packages, { dev: true });
    } else {
      this.npmInstall(packages, { 'save-dev': true });
    }
  }

  writing() {
    if (!this.props.examples) {
      return;
    }
    // Copy components and pages
    this.fs.copy(
      this.templatePath('./components/**/*'),
      this.destinationPath('src/components/')
    );
    this.fs.copy(this.templatePath('./pages/**/*'), this.destinationPath('src/pages/'));

    // Copy storybook configuration, not that * does not match . files.
    this.fs.copy(
      this.templatePath('./storybook-config/*'),
      this.destinationPath('.storybook/')
    );
    this.fs.copy(
      this.templatePath('./storybook-config/.babelrc'),
      this.destinationPath('.storybook/.babelrc')
    );

    // Copy the actual stories directory
    this.fs.copy(this.templatePath('./stories'), this.destinationPath('stories/'));

    // Add a storybook script to package.json
    const packageFile = this.fs.readJSON('./package.json');
    packageFile.scripts.storybook = 'start-storybook -p 9001 -c .storybook';
    this.fs.writeJSON('./package.json', packageFile);
  }
};
