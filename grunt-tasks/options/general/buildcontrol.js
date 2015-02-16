module.exports = {
    options: {
      dir: 'build',
      commit: true,
      push: true,
      message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
    },
    live: {
      options: {
        remote: '/Users/travelampel/vagrant-local/www/wpmulti/htdocs/wp-content/plugins/wp-fosb-built/fosb_build_repo.git',
        branch: 'master'
      }
    }
}