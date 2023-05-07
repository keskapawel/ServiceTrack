function isInGitRepository() {
  try {
    require('child_process').execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

module.exports.isInGitRepository = isInGitRepository;
