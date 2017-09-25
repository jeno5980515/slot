const createSlot = (dom, config = {}) => {
  
  dom.style.overflow = 'hidden';
  let wrapper = dom.querySelector('.wrapper');
  wrapper.style.display = 'flex';
  wrapper.style.fontSize = 0;
  wrapper.appendChild(wrapper.querySelector('div').cloneNode(true));

  let items = wrapper.querySelectorAll('div');
  let itemLength = items.length - 1;
  
  let itemHeight = dom.clientHeight;
  let itemWidth = dom.clientWidth;

  const BLUR_RATIO = 500;
  const SPEED_RATIO = 10;

  let BLUR = config.blur || 4;
  let TIME = config.time || 500;
  let SPEED = config.speed || 0;
  let accelerate = config.accelerate || 10;
  let decelerate = config.decelerate || 10; 
  let speedBound = config.speedBound || 5;
  let beginDecreaseBound = config.beginDecreaseBound || 50;
  let space = config.space || 0;
  space = 50;
  let speedMinBound = config.speedMinBound || 25;
  let direction = config.direction || 'down' ;
  let currentIndex = 3;

  let speed;
  let blur;
  let timer;
  let offsetX = 0;
  let offsetY = 0;
  let state = 'stop';

  let wrapperWidth = dom.clientWidth;

  init();

  function setProperties(){
    setItemsProperty();
    if ( direction === 'left' || direction === 'right' ){
      setHorizontalProperty();
    } else {
      setVerticalProperty();
    }
    setItemRectProperty(items[0]);
  }

  function setItemsProperty(){
    items.forEach((item) => {
      const fontSize = parseInt(window.getComputedStyle(item, null).fontSize, 10);
      item.style.fontSize = fontSize <= 0 ? '1rem' : `${fontSize}px`;
      item.style.flex = '1';
      item.style.justifyContent = 'center';
      item.style.alignItems = 'center';
      item.style.display = 'flex';
      item.querySelectorAll('img').forEach(img => {
        if ( direction === 'left' || direction === 'right')
          img.style.height = '100%';
        else 
          img.style.width = '100%';
      })
    })
  }

  function setHorizontalProperty(){
    wrapper.style.width = (space + dom.clientWidth ) * ( items.length ) ;
    wrapper.style.height = dom.clientHeight;
    wrapper.style.marginLeft = `-${space/2}px`;
  }

  function setVerticalProperty() {
    wrapper.style.flexWrap = 'nowrap';
    wrapper.style.flexDirection = 'column';
    wrapper.style.width = dom.clientWidth;
    wrapper.style.height = (space + dom.clientHeight) * ( items.length );
    wrapper.style.marginTop = `-${space/2}px`;
  }

  function setItemRectProperty(item) {
    const itemRect = item.getBoundingClientRect();
    itemWidth = itemRect.width;
    itemHeight = itemRect.height;
  }

  function speedUp(){
    if ( speed >= speedBound ) return;

    speed += accelerate / SPEED_RATIO;
    if ( blur < BLUR )
      blur += accelerate / BLUR_RATIO;
  }

  function speedDown(){

    speed = speed - accelerate / SPEED_RATIO > speedMinBound ? speed - accelerate / SPEED_RATIO : speedMinBound;
    if ( blur > 0 )
      blur -= accelerate / BLUR_RATIO;
  }

  function animate() {
    state === 'stop' ? speedDown() : speedUp();

    currentIndex = currentIndex >= itemLength ? 0 : (parseInt(currentIndex * 1000) + speed) / 1000 ;

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
    console.log(blur);
    wrapper.style.filter = `blur(${blur}px)`;
    wrapper.style.transform = `matrix(1, 0, 0, 1, ${offsetX}, ${offsetY})`;
    
    if ( state === 'stop' ) {
      if ( !Number.isInteger(currentIndex) || speed > speedMinBound )
        requestAnimationFrame(animate);
    } else if ( state === 'spin' ){
      requestAnimationFrame(animate);
    }
  }

  function reset() {
    speed = SPEED;
    speedBound = Math.max(itemWidth, itemHeight);
    blur = 0;
    timer = 0;
  }

  function init() {
    setProperties();
  }

  function spin() {
    state = 'spin';
    reset();
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
