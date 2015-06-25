module.exports = {
    options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
    },
    source: {
        files: [{
            src: [
                'build/src/app/map-app.js',
                'build/src/assets/css/map-style.css',
            ]
        }]
    }
};