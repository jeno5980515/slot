
const slot1 = createSlot(document.querySelector('.slot'));
const slot2 = createSlot(document.querySelector('.slot.up'), {
	direction: 'up'
});
const slot3 = createSlot(document.querySelector('.slot.left'), {
	direction: 'left'
});
const slot4 = createSlot(document.querySelector('.slot.right'), {
	direction: 'right'
});

document.getElementById('startButton').addEventListener('click', () => {
	slot1.spin();
	slot2.spin();
	slot3.spin();
	slot4.spin();
})

document.getElementById('stopButton').addEventListener('click', () => {
	slot1.stop();
	slot2.stop();
	slot3.stop();
	slot4.stop();
})
