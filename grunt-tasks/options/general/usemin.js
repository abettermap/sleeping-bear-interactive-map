module.exports = {

    html: {
        files: {src: ['build/index.php']},
        // files: {src: ['build/index.php']},
        options: {
            // assetsDirs: [
            //     'build/src/assets/css',
            // ],
            patterns: {
                html: [
                    [/loadCSS\(['"]([^"']+)['"]\)/gm, 'Replacing reference to CSS within loadCSS']
                ]
            },
            concat: 'generated',
            cssmin: 'generated',
            uglify: 'generated'
        }
    },

};