module.exports = {

  build: {
    options: {
      urls: [
        'http://abettermap.dev/',
        'http://abettermap.dev/about',
        'http://abettermap.dev/about/interactive-map-portfolio',
        'http://abettermap.dev/blog',
        'http://abettermap.dev/contact',
        'http://abettermap.dev/interactive-map-services'
      ],
      report: 'min'
    },
    files: {
      'css/tidy.css': ['empty.html']
    }
  }

}