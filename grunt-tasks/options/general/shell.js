module.exports = {
    dandelion: {
        options: {
            execOptions: {
                cwd: 'build'
            }
        },
        command: [
            'git add -u',
            'git commit -m "from grunt shell"',
            'dandelion deploy',
        ].join('&&'),
    }
}
