let currentIndex = 0;
const itemLength = 7;
const borderHeight = document.querySelector('.slot .wrapper div').clientHeight ;
const TIME = 300;
let speed = 0.5;
const decelerate = 0.025; 
const speedBound = 5;
const beginDecreaseBound = 50;
let blur = 12;
let timer = 0;

const wrapper = document.querySelector('.slot .wrapper');
wrapper.style.color = 'transparent';

const animate = () => {
  if ( timer >= beginDecreaseBound && timer % speedBound === 0 ){
    blur --;
    speed = speed > decelerate ? speed - decelerate : decelerate
  }
 
  currentIndex += speed ;
  timer ++;
  if ( currentIndex >= itemLength ){
    currentIndex = 0;
  }

  wrapper.style.textShadow = `0 0 ${blur}px rgba(0,0,0,1)`;
  wrapper.style.transform = `matrix(1, 0, 0, 1, 0, -${currentIndex * borderHeight})`;

  if ( timer <= TIME || (timer > TIME && !Number.isInteger(currentIndex)) ) {
    requestAnimationFrame(animate);
  } 
}

requestAnimationFrame(animate);