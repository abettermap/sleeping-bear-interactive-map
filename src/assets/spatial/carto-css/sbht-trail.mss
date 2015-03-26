/****** VARIABLES ******/

/* Sizes */
@trail-w-init: 6;

/* Colors */
@c-shadow     : #333;
@c-dash-light : #eee;
@c-dash-dark  : #eee;


/****** TRAIL ******/

#sbht{
  ::bottom {
    line-width: 12;
    line-opacity: .15;
    line-color: #fff;
    line-join: round;
  }
  ::next {
    line-width: 11;
    line-opacity: .3;
    line-color: #fff;
    line-join: round;
  }
  ::mid {
    line-width: 10;
    opacity: .3;
    line-color: @c-shadow;
    line-join: round;
    line-smooth: .25;
  }
  ::tiptop {
    line-width: 4.75;
    line-color: @c-shadow;
    line-join: round;
        line-smooth: .25;
    line-cap: round;
  }
  ::dash {
    line-color: #eee;
    line-width: 3.5;
    line-smooth: .25;
    line-dasharray: 8;
  }

}