// Set up the canvas
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.style.margin = '0'; // Remove default margin
document.body.style.overflow = 'hidden'; // Hide scrollbars
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const MIN_RADIUS = 10;
const MAX_RADIUS = 80;
const RING_WIDTH = 5;
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



function fillCanvasWithRings() {
  let rings = [];
  for (let i = 0; i < 500; i++) {
    rings.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS
    });
  }

  // Sort rings by radius, largest to smallest
  rings.sort((a, b) => b.radius - a.radius);

  // Draw the rings
  rings.forEach(ring => drawCircle(ring.x, ring.y, ring.radius));
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
