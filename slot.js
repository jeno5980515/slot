const createSlot = (dom, config = {}) => {
  
  dom.style.overflow = 'hidden';
  const wrapper = dom.querySelector('.wrapper');
  wrapper.style.display = 'flex';
  wrapper.style.fontSize = 0;
  wrapper.appendChild(wrapper.querySelector('div').cloneNode(true));

  const items = wrapper.querySelectorAll('div');
  const itemLength = items.length - 1;
  
  let borderHeight = dom.clientHeight;
  let borderWidth = dom.clientWidth;
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
      item.style.flex = '1';
      item.style.justifyContent = 'center';
      item.style.alignItems = 'center';
      item.style.display = 'flex';
    })
    wrapperWidth = dom.clientWidth * ( items.length );
    wrapper.style.height = dom.clientHeight;
  } else {
    wrapper.style.flexWrap = 'nowrap';
    wrapper.style.flexDirection = 'column';
    items.forEach((item) => {
      item.style.flex = '1';
      item.style.justifyContent = 'center';
      item.style.alignItems = 'center';
      item.style.display = 'flex';
    })
    wrapper.style.height = dom.clientHeight * ( items.length );
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
    speed = Math.max(borderWidth, borderHeight);
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
