const createSlot = (dom, config = {}) => {
  
  dom.style.overflow = 'hidden';
  const wrapper = dom.querySelector('.wrapper');
  wrapper.style.fontSize = 0;
  wrapper.appendChild(wrapper.querySelector('div').cloneNode(true));

  const items = wrapper.querySelectorAll('div');
  const itemLength = items.length - 1;
  
  const borderHeight = items[0].clientHeight;
  const borderWidth = items[0].clientWidth;
  const TIME = 500;
  const decelerate = 25; 
  const speedBound = 5;
  const beginDecreaseBound = 50;
  
  let direction = config.direction || 'down' ;
  let currentIndex = 3;
  let speed;
  let blur;
  let timer;
  let offsetX = 0;
  let offsetY = 0;
  let state = 'stop';

  let wrapperWidth = dom.clientWidth;
  if ( direction === 'left' || direction === 'right' ){
    items.forEach((item) => {
      item.style.display = 'inline-block';
      item.style.width = dom.clientWidth;
    })
    wrapperWidth = dom.clientWidth * ( items.length + 1);
  } else {
    wrapper.style.marginLeft = `-${(wrapperWidth - dom.clientWidth)/2}px` ; 
  }
  wrapper.style.width = `${wrapperWidth}px`;
  

  const animate = () => {

    if ( state === 'stop' ){
      if ( timer >= beginDecreaseBound && timer % speedBound === 0 ){
        blur --;
        speed = speed > decelerate ? speed - decelerate : decelerate
      }
      timer ++;
    }
  
    currentIndex = (parseInt(currentIndex * 1000) + speed) / 1000 ;

    if ( currentIndex >= itemLength ){
      currentIndex = 0;
    }
    
    switch ( direction ){
      case 'up':
        offsetY = -currentIndex * borderHeight;
        break;
      case 'down':
        offsetY = -(itemLength - currentIndex) * borderHeight;
        break;
      case 'left':
        offsetX = -currentIndex * borderWidth
        break;
      case 'right':
        offsetX = -(itemLength - currentIndex) * borderWidth
        break;
    }
    wrapper.style.textShadow = `0 0 ${blur}px rgba(0,0,0,1)`;
    wrapper.style.transform = `matrix(1, 0, 0, 1, ${offsetX}, ${offsetY})`;
    
    if ( timer <= TIME || (timer > TIME && !Number.isInteger(currentIndex)) ) {
      requestAnimationFrame(animate);
    } 
  }

  const init = () => {
    wrapper.style.color = 'transparent';
    speed = 500;
    blur = 12;
    timer = 0;
  }

  const spin = () => {
    state = 'spin';
    init();
    requestAnimationFrame(animate);
  }

  const stop = () => {
    state = 'stop';
  }

  return {
    spin,
    stop
  }
}
