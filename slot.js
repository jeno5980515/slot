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

  let BLUR = config.blur || 4;
  let TIME = config.time || 500;
  let decelerate = config.decelerate || 25; 
  let speedBound = config.speedBound || 5;
  let beginDecreaseBound = config.beginDecreaseBound || 50;
  let space = config.space || 0;
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

  function animate() {
    if ( state === 'stop' ){
      if ( timer >= beginDecreaseBound && timer % speedBound === 0 ){
        blur --;
        speed = speed > decelerate ? speed - decelerate : decelerate
      }
      timer ++;
    }
  
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
    wrapper.style.filter = `blur(${blur}px)`;
    wrapper.style.transform = `matrix(1, 0, 0, 1, ${offsetX}, ${offsetY})`;
    
    if ( timer <= TIME || (timer > TIME && !Number.isInteger(currentIndex)) ) {
      requestAnimationFrame(animate);
    } 
  }

  function reset() {
    speed = Math.max(itemWidth, itemHeight);
    blur = BLUR;
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
