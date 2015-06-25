module.exports = {

    options: {
        prefix: 'icon-',
        cleanup: ['fill', 'stroke'],
        includeTitleElement: false
    },
    all: {
        files: {
            'src/assets/img/svg/project/defs/fosb-svg-defs.svg': ['src/assets/img/svg/project/min/*.svg']
        }
    }

};