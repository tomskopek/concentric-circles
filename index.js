// Set up the canvas
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = '0'; // Remove default margin
document.body.style.overflow = 'hidden'; // Hide scrollbars
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d', {willReadFrequently: true});

const MIN_RADIUS = 10;
const MAX_RADIUS = 60;
const MIN_RING_SIZE = 4;
const MAX_RING_SIZE = 6;
const MAX_INITIAL_ATTEMPTS = 2000;
const backgroundColor = 'rgb(240,240,240)';

function drawCircle(x, y, radius) {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  let ringSize = MIN_RING_SIZE
  for (let r = radius; r > 0; r -= ringSize) {
    ringSize = Math.random() * (MAX_RING_SIZE - MIN_RING_SIZE) + MIN_RING_SIZE;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);

    // random color
    // ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;

    // white color
    ctx.fillStyle = `white`;

    ctx.fill();
    ctx.stroke();
  }
}

function isSpotEmpty(x, y) {
  const imageData = ctx.getImageData(x, y, 1, 1).data;
  return imageData[0] === 240 && imageData[1] === 240 && imageData[2] === 240;
}

function fillCanvasWithRings() {
  let attempt = 0;
  while (attempt < MAX_INITIAL_ATTEMPTS) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
    if (isSpotEmpty(x, y)) {
      drawCircle(x, y, radius);
    }
    attempt++;
  }
}

function fillGaps() {
  // we dont want to check EVERY pixel, otherwise it's too many calculations
  const CHECK_PIXEL_GAP = 35
  for (let x = 0; x < canvas.width; x += CHECK_PIXEL_GAP) {
    for (let y = 0; y < canvas.height; y += CHECK_PIXEL_GAP) {
      if (isSpotEmpty(x, y)) {
        const radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
        drawCircle(x, y, radius);
      }
    }
  }
}

// Fill the background with light gray color
ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw the rings
fillCanvasWithRings();
// Fill gaps
fillGaps()

// Make sure the canvas resizes when the window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fillCanvasWithRings(); // Redraw the rings for the new dimensions
});
