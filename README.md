# Slotify
## Usage
```javascript
const slot = createSlot(document.querySelector('.slot'), config);
```

## Configuration
```javascript
{
  blur,
  time,
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