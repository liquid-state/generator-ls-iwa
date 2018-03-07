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

  writing() {
    if (!this.props.examples) {
      return;
    }

    this.fs.copy(this.templatePath('./**/*'), this.destinationPath('src'));
  }
};
