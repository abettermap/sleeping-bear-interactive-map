module.exports = {

    fullWidth: {
        options: {
          engine: 'im',
          newFilesOnly: false,
          sizes: [{
            name: "sm",
            width: 650
          },{
            name: "med",
            width: 1050
          },{
            name: "lg",
            width: 1450
          },{
            name: "xl",
            width: 2000
          }]
        },
        files: [{
            expand: true,
            cwd: 'assets/img/raster/home-page/',
            src: [
                'background/**/*.jpg'
            ],
            dest: '/Users/travelampel/Google_Drive/web-projects/abm-website/web/wordpress/wp-content/uploads/raster/home-page/'
        }]
    },
    other: {
        options: {
          engine: 'im',
          newFilesOnly: false,
          sizes: [{
            name: 'sm',
            width: 570
          }]
        },
        files: [{
            expand: true,
            cwd: 'assets/img/raster/home-page/',
            src: [
                'use-cases/**/*.{jpg,JPG,png}',
                'logos/**/*.{jpg,JPG,png}'
            ],
            dest: '/Users/travelampel/Google_Drive/web-projects/abm-website/web/wordpress/wp-content/uploads/home-page/raster/'
        }]
    },

};