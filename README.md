# Slotify
[![npm version](https://img.shields.io/npm/v/slotify.svg?style=flat-square)](https://www.npmjs.com/package/slotify)
## Usage
```javascript
const slot = createSlot(document.querySelector('.slot'), config);
```

## Configuration
```javascript
{
  blur,
  time,
  speed,
  accelerate,
  decelerate,
  speedBound,
  speedMinBound,
  beginDecreaseBound,
  space,
  direction
}
```
## Method
```javascript
slot.spin();
slot.stop();
slot.stop(3);
```
