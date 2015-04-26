///// PATHS \\\\\

// FEATURES PIN \\
@path-pin-feat    :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/defs/map-pin-wide-empty.svg);

// ICONS \\
@path-bb            :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/bb.svg);
@path-cottage       :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/cottage.svg);
@path-financial     :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/financial.svg);
@path-food          :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/food.svg);
@path-gallery       :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/gallery.svg);
@path-grocery       :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/grocery.svg);
@path-hardware      :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/hardware.svg);
@path-health        :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/health.svg);
@path-motel         :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/motel.svg);
@path-organization  :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/organization.svg);
@path-professional  :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/professional.svg);
@path-realestate    :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/realestate.svg);
@path-recreation    :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/recreation.svg);
@path-rental        :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/rental.svg);
@path-shops         :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/shops.svg);



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

///// COLORS \\\\\

// MAP PINS \\
@c-feat-pin-fill: #f7892e;
@c-feat-pin-stroke: darken(@c-feat-pin-fill, 25%);

// WHITE ICON FILL \\
@c-icon-fill: #f9f9f9;

// SELECTED FEATURE \\
@c-sel-feat-fill: red;
@c-sel-feat-stroke: darken(@c-sel-feat-fill, 25%);

#commercial{
  bg/marker-allow-overlap: true;
  bg/marker-file: @path-pin-feat;
  bg/marker-fill: #f7892e;
  bg/marker-height: @pin-h-mid;
  bg/marker-line-color: darken(#f7892e,25%);
  bg/marker-line-width: @pin-line-w-mid;
  bg/marker-opacity  : .9;
  bg/marker-transform: translate(0,@pin-shift-y-mid);
  fg/marker-allow-overlap: true;
  fg/marker-fill: @c-icon-fill;
  fg/marker-height: @icon-h-mid;
  fg/marker-transform: translate(0,@pin-shift-y-mid*1.25);

  [type="bb"]             {fg/marker-file: @path-bb;}
  [type="cottage"]        {fg/marker-file: @path-cottage;}
  [type="financial"]      {fg/marker-file: @path-financial;}
  [type="food"]           {fg/marker-file: @path-food;}
  [type="gallery"]        {fg/marker-file: @path-gallery;}
  [type="grocery"]        {fg/marker-file: @path-grocery;}
  [type="hardware"]       {fg/marker-file: @path-hardware;}
  [type="health"]         {fg/marker-file: @path-health;}
  [type="motel"]          {fg/marker-file: @path-motel;}
  [type="organization"]   {fg/marker-file: @path-organization;}
  [type="professional"]   {fg/marker-file: @path-professional;}
  [type="realestate"]     {fg/marker-file: @path-realestate;}
  [type="recreation"]     {fg/marker-file: @path-recreation;}
  [type="rental"]         {fg/marker-file: @path-rental;}
  [type="shops"]          {fg/marker-file: @path-shops;}

  /* Second-to-closest zoom level group; set sizes only */
  [zoom>=15][zoom<17]{
    bg/marker-height: @pin-h-close;
    bg/marker-transform: translate(0,@pin-shift-y-close);
    fg/marker-height: @icon-h-close;
    fg/marker-transform: translate(0,@pin-shift-y-close*1.25);
  }
  /* Closest zoom level group; set sizes only (same as mid?) */
  [zoom>=17]{
    bg/marker-height: @pin-h-mid;
    bg/marker-transform: translate(0,@pin-shift-y-mid);
    fg/marker-height: @icon-h-mid;
    fg/marker-transform: translate(0,@pin-shift-y-mid*1.2);
  }
}