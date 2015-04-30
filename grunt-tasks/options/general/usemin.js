module.exports = {

    html: {
        files: {src: ['build/index.php']},
        options: {
        //   assetsDirs: ['foo/bar', 'bar']
            concat: 'generated',
            uglify: 'generated',
        }
    }

}