var imgPaths = {
    home: '/Users/travelampel/Google_Drive/web-projects/abm-website/web/wordpress/wp-content/uploads/raster/home-page/'
};

module.exports = {
  home: {
    options: {
      pngquant: true,
      optipng: false,
      advpng: false,
      zopflipng: false,
      pngcrush: true,
      pngout: false,
      mozjpeg: false,
      jpegRecompress: false,
      jpegoptim: true,
      gifsicle: false,
      svgo: false
    },
    files: [{
      expand: true,
      cwd: 'assets/img/raster/home-page/',
      src: ['**/*.{png,jpg,JPG}'],
      dest: imgPaths.home
    }]
  }
};