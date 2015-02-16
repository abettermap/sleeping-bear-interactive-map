// will need to dequeue theme style if using this
// probably don't need to mess with this, not a huge stylesheet

module.exports = {

  build: {
    options: {
      urls: [
        'http://wpmulti.dev/fosb/sbht-interactive-map'
      ],
      report: 'min'
    },
    files: {
      'src/assets/css/tidy.css': ['src/assets/css/empty.html']
    }
  }

}