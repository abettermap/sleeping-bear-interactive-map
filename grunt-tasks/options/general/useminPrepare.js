module.exports = {

    main: {
        src: [
            'index.php',
        ],
        options: {
            dest: 'build/',
            flow: {
                steps: {'js' : ['uglifyjs'] }
            }
        }
    },

};