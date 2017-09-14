const createSlot = (dom, config = {}) => {
  
  const wrapper = dom.querySelector('.wrapper');
  wrapper.style.color = 'transparent';

  const items = wrapper.querySelectorAll('div');
  const itemLength = items.length - 1;
  const borderHeight = items[0].clientHeight;
  const borderWidth = items[0].clientWidth;
  const TIME = 300;
  const decelerate = 25; 
  const speedBound = 5;
  const beginDecreaseBound = 50;

  let direction = config.direction || 'down' ;
  let currentIndex = 0;
  let speed = 500;
  let blur = 12;
  let timer = 0;

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
    if ( timer >= beginDecreaseBound && timer % speedBound === 0 ){
      blur --;
      speed = speed > decelerate ? speed - decelerate : decelerate
    }
  
    currentIndex = (parseInt(currentIndex * 1000) + speed) / 1000 ;
    timer ++;
    if ( currentIndex >= itemLength ){
      currentIndex = 0;
    }

    wrapper.style.textShadow = `0 0 ${blur}px rgba(0,0,0,1)`;
    switch ( direction ){
      case 'up':
        wrapper.style.transform = `matrix(1, 0, 0, 1, 0, -${currentIndex * borderHeight})`;
        break;
      case 'down':
        wrapper.style.transform = `matrix(1, 0, 0, 1, 0, -${(itemLength - currentIndex) * borderHeight})`;
        break;
      case 'left':
        wrapper.style.transform = `matrix(1, 0, 0, 1, -${currentIndex * borderWidth}, 0)`;
        break;
      case 'right':
        wrapper.style.transform = `matrix(1, 0, 0, 1, -${currentIndex * borderWidth}, 0)`;
        break;
      default:
        wrapper.style.transform = `matrix(1, 0, 0, 1, 0, -${(itemLength - currentIndex) * borderHeight})`;
    }
    if ( timer <= TIME || (timer > TIME && !Number.isInteger(currentIndex)) ) {
      requestAnimationFrame(animate);
    } 
  }

  requestAnimationFrame(animate);
}
