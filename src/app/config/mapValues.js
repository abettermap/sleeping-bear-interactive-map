  mapApp.constant('MapValues', {
    id: 'map',
    table: 'sbht_rough_013115',
    cartodb: {
      user_name: 'travelampel',
      type: 'cartodb',
      // interaction: true,
      sublayers: [{
        cartocss: "#sbht_rough_013115{marker-fill: #109DCD; marker-width: 5; marker-line-color: white; marker-line-width: 0;}",
        // cartocss: getMss(),
        // interactivity: 'cartodb_id, job',
        sql: "SELECT the_geom_webmercator, cartodb_id FROM sbht_rough_013115"
      }]
    },
    sqlQueries: {
        date: "SELECT the_geom_webmercator, date, yr, cartodb_id, job, CASE yr WHEN 2004 THEN 4 WHEN 2005 THEN 5 WHEN 2006 THEN 6 WHEN 2007 THEN 7 WHEN 2008 THEN 8 WHEN 2009 THEN 9 WHEN 2010 THEN 10 WHEN 2011 THEN 11 WHEN 2012 THEN 12 WHEN 2013 THEN 13 WHEN 2014 THEN 14 END as team_n FROM sbht_rough_013115",
        // date: "SELECT the_geom_webmercator, date, yr, cartodb_id, job, CASE yr WHEN 2004 THEN 4 WHEN 2005 THEN 5 WHEN 2006 THEN 6 WHEN 2007 THEN 7 WHEN 2008 THEN 8 WHEN 2009 THEN 9 WHEN 2010 THEN 10 WHEN 2011 THEN 11 WHEN 2012 THEN 12 WHEN 2013 THEN 13 WHEN 2014 THEN 14 END as team_n FROM sbht_rough_013115",
        all: "SELECT * FROM sbht_rough_013115"
    },
    leafletDefaults: {
      tileLayer: 'http://tile.stamen.com/toner-lite/{z}/{x}/{y}.jpg',
      tileLayerOptions: {
          attribution: '&copy; <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCAQFjAA&url=http%3A%2F%2Fmaps.stamen.com%2F&ei=YASqVPOSJYWhyASky4CoBg&usg=AFQjCNH45Se7Q4ss_N_OiCN4Jqc-TXCk-w&sig2=LAfiRGpwSILDBDkeD6CoVA">Stamen Maps</a> contributors'
      },
      center: {
        lat: 22,
        lng: -77,
        zoom: 3
      },
      zoomControl: true
    },
    panels: [
      { hide: true, name: 'time', fa: 'clock-o'},
      { hide: true, name: 'employers', fa: 'users'},
      { hide: true, name: 'skills', fa: 'code'},
      { hide: true, name: 'list', fa: 'list-ul'},
      { hide: true, name: 'favorites', fa: 'star'}
    ]
  });