module.exports = {

  build: {
    options: {
      report: 'min',
      /* Exact classes did not work for ignore, but regex did: */
      /* FUTURE JASON: this is not worth it unless you're using large/many 3rd-party CSSs */
      ignore: [/ng/, /available/, /no-scrollbars/, /popup/, /icon/]
    },
    files: {
      'build/src/assets/css/map-style.css': [
        'http://sbht.dev/sbht-i-map',
        'http://sbht.dev/sbht-i-map/#/popup/features/63',
        'http://sbht.dev/sbht-i-map/#/popup/commercial/1',
        'http://sbht.dev/sbht-i-map/#/popup/faces/19',
        'http://sbht.dev/sbht-i-map/#/trail_pix/19',
        'http://sbht.dev/sbht-i-map/#/position/45/23',
      ]
    }
  }

};