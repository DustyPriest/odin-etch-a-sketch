// main grid container
const grid = document.querySelector('#etch-grid');

// create 16x16 divs
for (let i = 0; i < 16; i++) {
  for (let i = 0; i < 16; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.addEventListener('mouseover', etchPixel);
    grid.appendChild(pixel);
  }
}

function etchPixel(e) {
  e.target.style.backgroundColor = 'black';
}
