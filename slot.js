const createSlot = (dom, config = {}) => {
  
  dom.style.overflow = 'hidden';
  const wrapper = dom.querySelector('.wrapper');
  wrapper.style.display = 'flex';
  wrapper.style.fontSize = 0;
  wrapper.appendChild(wrapper.querySelector('div').cloneNode(true));

  const items = wrapper.querySelectorAll('div');
  const itemLength = items.length - 1;
  
  let itemHeight = dom.clientHeight;
  let itemWidth = dom.clientWidth;
  const TIME = 500;
  const decelerate = 25; 
  const speedBound = 5;
  const beginDecreaseBound = 50;
  
  // let space = config.space || 0;
  let space = 50;
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
    wrapperWidth = (space + dom.clientWidth ) * ( items.length ) ;
    wrapper.style.height = dom.clientHeight;
    wrapper.style.marginLeft = `-${space/2}px`;
    setItemRectProperty(items[0]);
  } else {
    wrapper.style.flexWrap = 'nowrap';
    wrapper.style.flexDirection = 'column';
    items.forEach((item) => {
      item.style.flex = '100px';
      item.style.justifyContent = 'center';
      item.style.alignItems = 'center';
      item.style.display = 'flex';
    })
    wrapper.style.width = dom.clientWidth;
    wrapper.style.height = (space + dom.clientHeight) * ( items.length );
    wrapper.style.marginTop = `-${space/2}px`;
    setItemRectProperty(items[0]);
  }
  wrapper.style.width = `${wrapperWidth}px`;
  
  function setItemRectProperty(item) {
    const itemRect = item.getBoundingClientRect();
    itemWidth = wrapper.clientWidth + space/2;
    itemHeight = itemRect.height;
  }

  function animate() {
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
        offsetY = -currentIndex * itemHeight;
        break;
      case 'down':
        offsetY = -(itemLength - currentIndex) * itemHeight;
        break;
      case 'left':
        offsetX = -currentIndex * itemWidth;
        break;
      case 'right':
        offsetX = -(itemLength - currentIndex) * itemWidth;
        break;
    }
    wrapper.style.textShadow = `0 0 ${blur}px rgba(0,0,0,1)`;
    wrapper.style.transform = `matrix(1, 0, 0, 1, ${offsetX}, ${offsetY})`;
    
    if ( timer <= TIME || (timer > TIME && !Number.isInteger(currentIndex)) ) {
      requestAnimationFrame(animate);
    } 
  }

  function init() {
    wrapper.style.color = 'transparent';
    speed = Math.max(itemWidth, itemHeight);
    blur = 12;
    timer = 0;
  }

  function spin() {
    state = 'spin';
    init();
    requestAnimationFrame(animate);
  }

  function stop() {
    state = 'stop';
  }

  return {
    spin,
    stop
  }
}
