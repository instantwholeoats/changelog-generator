'use strict';

const { simpleGit } = require('simple-git');

module.exports = class ChangelogGenerator {

  constructor(remotePath, currentPath, gitFactory = simpleGit) {
    this.remotePath = remotePath;
    this.localPath = currentPath;
    this.tagName = '';
    this.tagComment = '';
    this.tagNameFormat = 'v%x.%y.%z';
    this.git = gitFactory(this.localPath);
  }

  async prepare(target) {
    this.target = target;
    await this.git.clone(this.remotePath);
    await this.git.checkout(this.target);
  }
  generate() {
    // Not implemented in the original API.
  }

  async tag() {
    // Not implemented in the original API.
  }
};
