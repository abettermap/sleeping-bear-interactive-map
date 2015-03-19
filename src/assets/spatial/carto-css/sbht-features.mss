///// PATHS \\\\\

// FEATURES PIN \\
@path-pin-feat  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/defs/map-pin-wide-empty.svg);

// ICONS \\
@path-beach     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/beach.svg);
@path-bikepark  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/bikepark.svg);
@path-commserv  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/commserv.svg);
@path-conc      :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/conc.svg);
@path-historic  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/historic.svg);
@path-parking   :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/parking.svg);
@path-other     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/other.svg);
@path-ranger    :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/ranger.svg);
@path-restroom  :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/restroom.svg);
@path-signs     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/signs.svg);
@path-trails    :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/trails.svg);
@path-vista     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/vista.svg);
@path-water     :   url(https://abettermap.com/fosb/wp-content/plugins/wp-fosb-map/src/assets/img/svg/project/min/water.svg);


///// COLORS \\\\\

// FEATURES MAP PINS \\
@c-perm-pin-fill: #7caad4;

@c-feat-pin-fill: #934e7d;
@c-feat-pin-stroke: darken(@c-feat-pin-fill, 25%);

// WHITE ICON FILL \\
@c-icon-fill: #f9f9f9;


///// SIZES & POSITIONING \\\\\

/// Middle zooms (use as base) \\\

// MAP PIN HEIGHT AND LINE (STROKE) WIDTH \\
@pin-h-mid:       34;
@pin-line-w-mid:  28;
@pin-shift-y-mid: @pin-h-mid/2*-1;

// ICON HEIGHT \\
@icon-h-mid:        17;
@icon-shift-y-mid:  @icon-h-mid * -.25;

/// Close zooms \\\
// MAP PIN HEIGHT AND LINE (STROKE) WIDTH \\
@pin-h-close:       32;
@pin-line-w-close:  24;
@pin-shift-y-close: @pin-h-close/2*-1;

// ICON HEIGHT \\
@icon-h-close:        15;
@icon-shift-y-close:  @icon-h-close * -.25;

#features {
  /* "6 Centers" - zooms <14 */
  [zoom<14]{
    [cartodb_id>=60][cartodb_id<=64],[cartodb_id=6]{
      bg/marker-allow-overlap: true;
      bg/marker-file: @path-pin-feat;
      bg/marker-fill: @c-perm-pin-fill;
      bg/marker-line-color: darken(@c-perm-pin-fill, 25%);
      bg/marker-line-width: @pin-line-w-mid;
      bg/marker-height: @pin-h-mid;
      bg/marker-transform: translate(0,@pin-shift-y-mid*1.25);
      fg/marker-allow-overlap: true;
      fg/marker-fill: @c-icon-fill;
      fg/marker-height: @icon-h-mid;
      fg/marker-transform: translate(0,@pin-shift-y-mid*1.55);
      [type="signs"] {fg/marker-file: @path-signs; }
      [type="historic"] {fg/marker-file: @path-historic; fg/marker-height: @icon-h-mid - 5;}
      [type="vista"] {fg/marker-file: @path-vista;  fg/marker-height: @icon-h-mid - 3;}
      [type="trails"] {fg/marker-file: @path-trails; fg/marker-transform: translate(0,@pin-shift-y-mid*1.5);}
      [type="commserv"]     {fg/marker-file: @path-commserv; }
    }
  }
  [cartodb_id<60][cartodb_id!=6],[cartodb_id>64]{
    bg/marker-fill  : @c-feat-pin-fill;
    /* Opacity for non-centers */
    [zoom<15]{
      bg/marker-opacity  : .7;
    }
    /* "Permanent" types */
    [zoom>=14]{
      [type='ranger'],[type='restroom'],[type='bikepark'],[type='conc'],[type='beach'],[type='water']{
        bg/marker-opacity  : .9;
        bg/marker-allow-overlap: true;
        bg/marker-file: @path-pin-feat;
        bg/marker-line-color: @c-feat-pin-stroke;
        bg/marker-line-width: @pin-line-w-mid;
        bg/marker-height: @pin-h-mid;
        bg/marker-transform: translate(0,@pin-shift-y-mid);
        fg/marker-allow-overlap: true;
        fg/marker-fill: @c-icon-fill;
        fg/marker-height: @icon-h-mid;
        fg/marker-transform: translate(0,@pin-shift-y-mid*1.25);
        [type="beach"]    {fg/marker-file: @path-beach; fg/marker-height: @icon-h-mid*.5;}
        [type="bikepark"] {fg/marker-file: @path-bikepark; }
        [type="conc"]     {fg/marker-file: @path-conc; fg/marker-height: 13; fg/marker-transform: translate(0,@pin-shift-y-mid - 6);}
        [type="ranger"]   {fg/marker-file: @path-ranger; }
        [type="restroom"] {fg/marker-file: @path-restroom; fg/marker-height: 13;}
        [type="water"]    {fg/marker-file: @path-water;}
      }
    }
    /* Remaining types & mid-close zoom */
    [zoom>=15]{
      bg/marker-opacity  : .9;
      bg/marker-allow-overlap: true;
      bg/marker-file: @path-pin-feat;
      bg/marker-line-color: @c-feat-pin-stroke;
      bg/marker-line-width: @pin-line-w-close;
      fg/marker-allow-overlap: true;
      fg/marker-fill: @c-icon-fill;
      /* Set file paths from here on out for these */
      [type="beach"]    {fg/marker-height: @icon-h-mid*.5;}
      [type="commserv"] {fg/marker-file: @path-commserv;}
      [type="historic"] {fg/marker-file: @path-historic;}
      [type="other"]    {fg/marker-file: @path-other;}
      [type="parking"]  {fg/marker-file: @path-parking; fg/marker-height: 15;}
      [type="restroom"] {fg/marker-transform: translate(-1,@pin-shift-y-mid*1.3);}
      [type="signs"]    {fg/marker-file: @path-signs;}
      [type="trails"]   {fg/marker-file: @path-trails;}
      [type="vista"]    {fg/marker-file: @path-vista; fg/marker-height: @icon-h-close*.9; fg/marker-transform: translate(0,@pin-shift-y-mid - 6);}
    }
    /* Second-to-closest zoom level group; set sizes only */
    [zoom>=15][zoom<17]{
      bg/marker-height: @pin-h-close;
      bg/marker-transform: translate(0,@pin-shift-y-close);
      fg/marker-height: @icon-h-close;
      fg/marker-transform: translate(0,@pin-shift-y-close*1.25);

      /* Adjust height again for wider icons*/
      [type="beach"]    {fg/marker-height: @icon-h-mid*.5;}
      [type="conc"]     {fg/marker-height: 12; fg/marker-transform: translate(0,@pin-shift-y-mid - 5);}
      [type="historic"] {fg/marker-height: 12;}
      [type="parking"]  {fg/marker-transform: translate(1,@pin-shift-y-mid*1.1);}
      [type="restroom"] {fg/marker-height: 13;}
      /* [type="signs"]    {
               THIN IT OUT IF NEEDED
        [name=~'.*Miles.*']{
          bg/marker-width: .1;
          bg/marker-height: .1;
          fg/marker-width: .1;
          fg/marker-height: .1;
        }
      }
      */
    }
    /* Closest zoom level group; set sizes only (same as mid?) */
    [zoom>=17]{
      bg/marker-height: @pin-h-mid;
      bg/marker-transform: translate(0,@pin-shift-y-mid);
      fg/marker-height: @icon-h-mid;
      fg/marker-transform: translate(0,@pin-shift-y-mid*1.2);
      [type="conc"]     {fg/marker-height: 14;}
      [type="historic"] {fg/marker-height: 14;}
      [type="restroom"] {fg/marker-height: 15;}
      [type="water"] {fg/marker-transform: translate(0,@pin-shift-y-close*1.25);}
    }
  }
}
