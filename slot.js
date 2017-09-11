let currentIndex = 0;
const itemLength = 7;
const borderHeight = document.querySelector('.slot .wrapper div').clientHeight ;
const TIME = 300;
let speed = 0.5;
const decelerate = 0.025; 
const speedBound = 5;
const beginDecreaseBound = 50;
let timer = 0;

const animate = () => {
  if ( timer >= beginDecreaseBound && timer % speedBound === 0 ){
    speed = speed > decelerate ? speed - decelerate : decelerate
  }
 
  currentIndex += speed ;
  timer ++;
  if ( currentIndex >= itemLength ){
    currentIndex = 0;
  }
  
  document.querySelector('.slot .wrapper').style = 
    `transform: matrix(1, 0, 0, 1, 0, -${currentIndex * borderHeight})`;

  if ( timer <= TIME || (timer > TIME && !Number.isInteger(currentIndex)) ) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);