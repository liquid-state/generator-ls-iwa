/**
 * A sub generator which creates the minimal project inside src,
 * including the app entrypoint.
 */

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copy(this.templatePath('src/**/*'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('public/**/*'), this.destinationPath('public'));

    this.fs.copyTpl(
      this.templatePath('webapp.json.ejs'),
      this.destinationPath('src/webapp.json'),
      {
        projectName: this.options.projectName
      }
    );
  }
};
