var imgPaths = {
    home: '/Users/travelampel/Google_Drive/web-projects/abm-website/web/wordpress/wp-content/uploads/raster/home-page'
};

module.exports = {

    mygroup: {
        src: [
            'assets/img/raster/home-page/**/*.png',
            'assets/img/raster/home-page/**/*.jpg'
        ],
        dest: imgPaths.home
    }

};