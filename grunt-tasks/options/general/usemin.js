module.exports = {

    html: {
        files: {src: ['build/index.php']},
        // files: {src: ['build/index.php']},
        options: {
        //   assetsDirs: ['foo/bar', 'bar']
            concat: 'generated',
            uglify: 'generated',
        }
    },
    // other: {
    //     files: {src: ['build/kiosk.php']},
    //     // files: {src: ['build/index.php']},
    //     options: {
    //     //   assetsDirs: ['foo/bar', 'bar']
    //         concat: 'generated',
    //         uglify: 'generated',
    //     }
    // }

}