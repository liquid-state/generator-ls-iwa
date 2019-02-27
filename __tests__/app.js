const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-ls-iwa:app', () => {
  describe('Default setup', () => {
    beforeAll(() =>
      helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
        yarn: true,
        name: 'test-project',
        description: 'test',
        authorName: 'Chris',
        authorEmail: 'test@example.com'
      }));

    it('creates package.json', () => {
      assert.file(['package.json']);
    });

    it('sets package name', () => {
      assert.fileContent('package.json', '"name": "test-project"');
    });

    it('sets package description', () => {
      assert.fileContent('package.json', '"description": "test"');
    });

    it('creates dotfiles', () => {
      assert.file(['.editorconfig', '.gitignore']);
    });
  });
});
