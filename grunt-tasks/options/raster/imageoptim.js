var imgPaths = {
    home: '/Users/travelampel/Google_Drive/web-projects/abm-website/web/wordpress/wp-content/uploads/raster/home-page/'
}

module.exports = {

    home: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        expand: true,
        src: [
            '/Users/travelampel/Google_Drive/web-projects/abm-website/web/wordpress/wp-content/uploads/raster/home-page/**/*.{jpg,JPG}'
        ]
    }

}