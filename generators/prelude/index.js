/**
 * A sub generator which creates the minimal project inside src,
 * including the app entrypoint.
 */

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(this.templatePath('theme/**/*'), this.destinationPath('packages/theme'));
    this.fs.copy(
      this.templatePath('common/**/*'),
      this.destinationPath('packages/common')
    );
  }
};
