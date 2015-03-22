/****** VARIABLES ******/

/* Sizes */
@trail-w-init: 6;

/* Colors */
@c-caution: orange;
@c-grade: brown;

/****** TRAIL ******/

#sbht{
  ::bottom {
    line-width: 18;
    line-opacity: .15;
    line-color: #fff;
    line-join: round;
  }
  ::next {
    line-width: 16;
    line-opacity: .1;
    line-color: #fff;
    line-join: round;
  }
  ::mid {
    line-width: 12;
      opacity: .2;
    line-color: #F84F40;
    line-join: round;
        line-smooth: .25;
  }
  ::tiptop {
    line-width: 3.75;
    line-color: #D6301D;
    line-join: round;
        line-smooth: .25;
    line-cap: round;
  }
  ::dash {
    line-color: #eee;
    line-width: 2.5;
    line-smooth: .25;
    line-dasharray: 4;
  }

}