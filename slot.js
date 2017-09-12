const createSlot = (dom, config = {}) => {
  
  const wrapper = dom.querySelector('.wrapper');
  wrapper.style.color = 'transparent';

  const items = wrapper.querySelectorAll('div');
  const itemLength = items.length - 1;
  const borderHeight = items[0].clientHeight ;
  const TIME = 300;
  const decelerate = 0.025; 
  const speedBound = 5;
  const beginDecreaseBound = 50;

  let currentIndex = 0;
  let speed = 0.5;
  let blur = 12;
  let timer = 0;

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
}
