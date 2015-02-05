mapApp.service('cartoCss', function() {

  this.defaultTorque = function(){

    var defaultArray = [
      'Map {',
      '-torque-time-attribute: "yr";',
      '-torque-aggregation-function: "count(cartodb_id)";',
      '-torque-frame-count: 512;',
      '-torque-animation-duration: 30;',
      '-torque-resolution: 1;',
      '-torque-data-aggregation:cumulative;',
      '}',
      '#resume_subproj {',
        'marker-width: 6;',
        'marker-fill: #47A3FF;',
        'marker-fill-opacity: 0.8;',
        'comp-op: "source-over";',
      '}',
      '#resume_subproj[frame-offset = 1] { marker-width: 10; marker-fill-opacity: 0.05; }',
      '#resume_subproj[frame-offset = 2] { marker-width: 15; marker-fill-opacity: 0.02; }'
    ].join('\n');
    var defaultCss = defaultArray;
    return defaultCss;
  }

  this.date = function(){

    var cssArray = [
      'Map {',
        '-torque-time-attribute: "date";',
        '-torque-aggregation-function: "round(avg(team_n))";',
        '-torque-frame-count: 1024;',
        '-torque-animation-duration: 20;',
        '-torque-resolution: 2;',
        '-torque-data-aggregation:cumulative;',
      '}',
      '#resume_subproj {',
        'marker-width: 6;',
        'marker-fill: #47A3FF;',
        'marker-fill-opacity: 0.8;',
        'comp-op: "source-over";',
      '}',
      '#resume_subproj[frame-offset = 1] { marker-width: 10; marker-fill-opacity: 0.05; }',
      '#resume_subproj[frame-offset = 2] { marker-width: 15; marker-fill-opacity: 0.02; }'
    ];

    var i = 4,
      gradient = "",
      prefix = "#resume_subproj[value=",
      middle = "] { marker-fill: hsl(310, 68%, ",
      middleHue = "] { marker-fill: hsl(",
      lightness = 75,
      hue = 25,
      suffix = "%) }",
      suffixHue = ", 68%, 55%) }";

    while (i < 15) {
      lightness = lightness - 5;
      hue = hue + 25;
      // params = prefix + i + middle + lightness + suffix;
      params = prefix + i + middleHue + hue + suffixHue;
      cssArray.push(params);
      i++;
    }

    var dateCss = cssArray.join('\n');
    return dateCss;

  }

});