mapApp.constant('MapValueDefaults', {
    cartodb: {
        type: 'CartoDB',
        user_name: 'remcaninch',
        sublayers: [
            {   // TRAIL FOR NOW
                sql: "SELECT * FROM sbht_temp",
                cartocss: "#sbht_temp{line-color:green;line-width:3.5;}",
                interactivity: "name",
                name: "Sleeping Bear Heritage Trail"
            },
            {   // GRADE FOR NOW
                sql: "SELECT * FROM sbht_grade_temp",
                cartocss: "#sbht_grade_temp{line-color: #000000;line-width: 3;line-opacity: 0.7;line-dasharray: 2,3;}",
                interactivity: "name, direction, grade",
                name: "Grade"
            },
            {   // CAUTION FOR NOW
                sql: "SELECT * FROM sbht_caution_temp",
                cartocss: "#sbht_caution_temp{line-color:#F11810;line-width:4;line-opacity:0.55;}",
                interactivity: "descrip, type",
                name: 'Caution'
            },
            {   // NPS POI
                sql: "SELECT * FROM nps_poi_digitize",
                cartocss: "#nps_poi_giscloud{marker-fill:#A6CEE3;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                name: 'NPS POI'
            },
            {   // SBHT POI
                sql: "SELECT * FROM sbht_poi_digitize",
                cartocss: "#sbht_poi_digitize{marker-fill:#000;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                interactivity: "name, type, mile, name_id, season, sw_offset, ne_offset, descrip, video, audio",
                name: 'SBHT POI'
            },
            {   // COMM POI
                sql: "SELECT * FROM comm_poi_master",
                cartocss: "#trail_pix_digitize{marker-fill:orange;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                interactivity: "name, type, mile, name_id, season, x, y, sw_offset, ne_offset, descrip, video, audio, phone, addr_no, addr_name, addr_type, city, zip, email, website",
                name: 'Commercial POI'
            },
            {   // TRAIL PIX
                sql: "SELECT * FROM trail_pix_digitize",
                cartocss: "#trail_pix_digitize{marker-fill:red;marker-placement:point;marker-type:ellipse;marker-width:17.5;marker-allow-overlap:true;}",
                interactivity: "img_file, season",
                name: 'Trail Pics'
            }
        ]
    },
    tileLayer: {
        url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        options: {
            attribution: "\u00a9 <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors \u00a9 <a href= \"http://cartodb.com/attributions#basemaps\">CartoDB</a>"
        }
    },
    leaflet: {
        // tileLayer: 'http://tile.stamen.com/toner-lite/{z}/{x}/{y}.jpg',
        // tileLayerOptions: {
        //     attribution: '&copy; <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCAQFjAA&url=http%3A%2F%2Fmaps.stamen.com%2F&ei=YASqVPOSJYWhyASky4CoBg&usg=AFQjCNH45Se7Q4ss_N_OiCN4Jqc-TXCk-w&sig2=LAfiRGpwSILDBDkeD6CoVA">Stamen Maps</a> contributors'
        // },
        zoom: 11,
        zoomControl: true,
        center: [44.8957686012,-86.00646972]
    }
});