const Generator = require('yeoman-generator');
const yosay = require('yosay');
const updateStoriesConfig = require('../../utils/stories');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(
        'This generator will create a basic entry (login + registration) IWA using aws cognito.'
      )
    );

    return this.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the default html title for your IWA',
        default: 'Entry'
      }
    ]).then(props => (this.props = props));
  }

  writing() {
    const path = dir => this.destinationPath(`packages/entry-iwa/${dir}`);

    this.fs.copy(this.templatePath('public'), path('public'));
    this.fs.copy(this.templatePath('src'), path('src'));

    this.fs.copyTpl(
      this.templatePath('stories/index.ejs'),
      path('stories/index.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      path('package.json'),
      this.props
    );

    updateStoriesConfig(
      this.fs,
      this.destinationPath('./.storybook/config.js'),
      'entry-iwa'
    );
  }

  end() {
    this.spawnCommandSync('yarn', ['lerna', 'bootstrap']);
  }
};
