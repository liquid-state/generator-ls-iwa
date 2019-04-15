const Generator = require('yeoman-generator');
const yosay = require('yosay');
const updateStoriesConfig = require('../../utils/stories');

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
    const name = this.props.name.replace('-iwa', '');
    const path = dir => this.destinationPath(`packages/${name}-iwa/${dir}`);

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
    updateStoriesConfig(
      this.fs,
      this.destinationPath('./.storybook/config.js'),
      `${name}-iwa`
    );
  }

  end() {
    this.spawnCommandSync('yarn', ['lerna', 'bootstrap']);
  }
};
