///// PATHS \\\\\

@path-pin-feat    :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/defs/map-pin-wide-empty.svg);
@path-fg    :   url(http://friendsofsleepingbear.org/sbht-i-map/src/assets/img/svg/project/min/trail-cond.svg);

// MAP PIN HEIGHT AND LINE (STROKE) WIDTH \\
@pin-h-mid:       34;
@pin-line-w-mid:  28;
@pin-shift-y-mid: @pin-h-mid/2*-1;

// ICON HEIGHT \\
@icon-h-mid:        4;
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

// FG FILL \\
@c-icon-fill: #43C5DF;

// SELECTED FEATURE \\
@c-sel-feat-fill: red;
@c-sel-feat-stroke: darken(@c-sel-feat-fill, 25%);

#commercial{
  bg/marker-allow-overlap: true;
  bg/marker-file: @path-pin-feat;
  bg/marker-fill: @c-icon-fill;
  bg/marker-height: @pin-h-mid;
  bg/marker-line-color: darken(#43C5DF,20%);
  bg/marker-line-width: @pin-line-w-mid;
  bg/marker-opacity  : .9;
  bg/marker-transform: translate(0,@pin-shift-y-mid);
  fg/marker-allow-overlap: true;
  fg/marker-file: @path-fg;
  fg/marker-fill: darken(#43C5DF,10%);
  fg/marker-height: 14;
  fg/marker-transform: translate(0,@pin-shift-y-mid*1.25);
}