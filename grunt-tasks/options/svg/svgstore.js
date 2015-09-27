module.exports = {

    options: {
        prefix: 'icon-',
        cleanup: ['fill', 'stroke'],
        includeTitleElement: false,
        formatting : {
          indent_size : 2
        }
    },
    all: {
        files: {
            'src/assets/img/svg/project/defs/fosb-svg-defs.svg': ['src/assets/img/svg/project/min/*.svg']
        }
    }

};