// Set up the canvas
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = '0'; // Remove default margin
document.body.style.overflow = 'hidden'; // Hide scrollbars
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const MIN_RADIUS = 10;
const MAX_RADIUS = 60;
const RING_WIDTH = 5;
const MAX_ATTEMPTS = 5000;
const backgroundColor = 'rgb(240,240,240)';

function drawCircle(x, y, radius) {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  for (let r = radius; r > 0; r -= RING_WIDTH) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'white'
    ctx.fill();
    ctx.stroke();
  }
}

function isSpotUnfilled(x, y, radius) {
  const imageData = ctx.getImageData(x, y, 1, 1).data;
  return imageData[0] === 240 && imageData[1] === 240 && imageData[2] === 240;
}

function fillCanvasWithRings() {
  let attempt = 0;
  while (attempt < MAX_ATTEMPTS) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
    if (isSpotUnfilled(x, y, radius)) {
      drawCircle(x, y, radius);
    }
    attempt++;
  }
}

// Fill the background with light gray color
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw the rings
fillCanvasWithRings();

// Make sure the canvas resizes when the window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fillCanvasWithRings(); // Redraw the rings for the new dimensions
});
