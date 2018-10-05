'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.green('Liquid State IWA')} generator`));

    return this.prompt(this._getCommonPrompts())
      .then(this._runGitPrompts.bind(this))
      .then(props => {
        this.props = props;
      });
  }

  _getCommonPrompts() {
    return [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        store: true,
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        store: true
      },
      {
        type: 'input',
        name: 'authorName',
        message: "Author's name",
        store: true,
        default: this.user.git.name()
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: "Author's email",
        store: true,
        default: this.user.git.email()
      },
      {
        type: 'confirm',
        name: 'private',
        message: 'Is this a private package',
        store: true,
        default: true
      }
    ];
  }

  _runGitPrompts(props) {
    let gitRepo = '';
    const command = ['git', ['remote', 'get-url', 'origin']];
    const result = this.spawnCommandSync(...command, { stdio: 'pipe' });
    if (result.status === 0) {
      // Git has already been initialised with a remote.
      gitRepo = result.stdout.toString().trim();
    }
    return this.prompt({
      type: 'input',
      name: 'gitUrl',
      message: 'Git Repository url',
      store: true,
      default: gitRepo
    }).then(results => Object.assign({}, props, results));
  }

  default() {
    this.composeWith(require.resolve('../prelude'));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      this.destinationPath('package.json'),
      this.props
    );

    // Copy lerna
    this.fs.copy(this.templatePath('lerna.json'), this.destinationPath('lerna.json'));
    // Copy webpack
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.fs.copy(
      this.templatePath('webpack-dev.config.js'),
      this.destinationPath('webpack-dev.config.js')
    );

    // Copy dotfiles.
    this.fs.copy(this.templatePath('dotfiles/.*'), this.destinationPath('.'));
  }

  install() {
    this.yarnInstall();
  }

  end() {
    this.spawnCommandSync('yarn', ['lerna', 'bootstrap']);
  }
};
