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
      },
      {
        type: 'confirm',
        name: 'yarn',
        message: 'Would you like to use yarn with this project?',
        default: true
      }
    ];
  }

  _runGitPrompts(props) {
    let gitRepo = '';
    const result = this.spawnCommandSync('git', ['remote', 'get-url', 'origin'], {
      stdio: 'pipe'
    });
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

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json.ejs'),
      this.destinationPath('package.json'),
      this.props
    );

    // Copy dotfiles.
    this.fs.copy(this.templatePath('dotfiles/.*'), this.destinationPath('.'));
    // Add react app rewired overrides.
    this.fs.copy(
      this.templatePath('config-overrides.js'),
      this.destinationPath('config-overrides.js')
    );
  }

  install() {
    if (this.props.yarn) {
      this.yarnInstall();
    } else {
      this.npmInstall();
    }
  }
};
