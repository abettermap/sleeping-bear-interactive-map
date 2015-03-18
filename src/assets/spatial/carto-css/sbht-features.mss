///// COLORS \\\\\

// FEATURES MAP PINS \\
@c-feat-pin-fill: #934e7d;
@c-feat-pin-stroke: darken(@c-feat-pin-fill, 25%);

// WHITE ICON FILL \\
@c-icon-fill: #f9f9f9;


///// SIZES & POSITIONING -- MIDDLE ZOOMS (USE AS BASE) \\\\\

// MAP PIN HEIGHT AND LINE (STROKE) WIDTH \\
@pin-h:       40;
@pin-line-w:  28;
@pin-shift-y: @pin-h/2*-1;

// ICON HEIGHT \\
@icon-h:        20;
@icon-shift-y:  @icon-h * -.25;


///// PATHS \\\\\

// FEATURES PIN \\
@path-pin-feat  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/defs/map-pin-wide-empty.svg);

// ICONS \\
@path-beach     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/beach.svg);
@path-commserv  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/commserv.svg);
@path-conc      :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/conc.svg);
@path-historic  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/historic.svg);
@path-parking   :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/parking.svg);
@path-ranger    :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/ranger.svg);
@path-restroom  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/restroom.svg);
@path-signs     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/signs.svg);
@path-trails    :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/trails.svg);
@path-vista     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/vista.svg);
@path-water     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/water.svg);


///// FEATURES - MIDDLE ZOOMS \\\\\
#features[zoom>=13] {
  bg/marker-allow-overlap: true;
  bg/marker-file: @path-pin-feat;
  bg/marker-fill: @c-feat-pin-fill;
  bg/marker-line-color: @c-feat-pin-stroke;
  bg/marker-line-width: @pin-line-w;
  bg/marker-height: @pin-h;
  bg/marker-transform: translate(0,@pin-shift-y);
  fg/marker-allow-overlap: true;
  fg/marker-fill: @c-icon-fill;
  fg/marker-height: @icon-h;
  fg/marker-transform: translate(0,@pin-shift-y - 4);
  [type="beach"]    {fg/marker-file: @path-beach; fg/marker-height: @icon-h*.5;}
  [type="commserv"] {fg/marker-file: @path-commserv; }
  [type="conc"]     {fg/marker-file: @path-conc; fg/marker-height: 16; fg/marker-transform: translate(0,@pin-shift-y - 6);}
  [type="historic"] {fg/marker-file: @path-historic; fg/marker-height: 16;}
  [type="parking"]  {fg/marker-file: @path-parking;}
  [type="ranger"]   {fg/marker-file: @path-ranger; }
  [type="restroom"] {fg/marker-file: @path-restroom; fg/marker-height: 16;}
  [type="trails"]   {fg/marker-file: @path-trails;}
  [type="vista"]    {fg/marker-file: @path-vista; fg/marker-height: @icon-h*.9;}
  [type="water"]    {fg/marker-file: @path-water;}
  [type="signs"]    {fg/marker-file: @path-signs;
    [name=~'.*Mile.*']{
      bg/marker-width: .1;
      bg/marker-height: .1;
      fg/marker-width: .1;
      fg/marker-height: .1;
    }
  }
}

// Primary features at initial zoom
#features {
  [zoom<=12]{
    [cartodb_id>=60][cartodb_id<=64]{
      bg/marker-allow-overlap: true;
      bg/marker-file: @path-pin-feat;
      bg/marker-fill: @c-feat-pin-fill;
      bg/marker-line-color: @c-feat-pin-stroke;
      bg/marker-line-width: @pin-line-w;
      bg/marker-height: 50;
      bg/marker-transform: translate(0,@pin-shift-y*1.25);
      fg/marker-allow-overlap: true;
      fg/marker-fill: @c-icon-fill;
      fg/marker-height: 28;
      fg/marker-transform: translate(0,@pin-shift-y*1.55);
      [type="signs"] {fg/marker-file: @path-signs; }
      [type="historic"] {fg/marker-file: @path-historic; fg/marker-height: 21;}
      [type="vista"] {fg/marker-file: @path-vista;  fg/marker-height: 25;}
      [type="trails"] {fg/marker-file: @path-trails; }
      [type="commserv"]     {fg/marker-file: @path-commserv; }
    }
  }
}
