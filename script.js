let size = 16;

const grid = document.querySelector('#etch-grid');
const clearBtn = document.querySelector('.clear-btn');

// ------ EVENT LISTENERS ------
clearBtn.addEventListener('click', clearGrid);

// create SIZExSIZE divs & click events
for (let i = 0; i < size; i++) {
  for (let i = 0; i < size; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = 'white';
    pixel.addEventListener('mouseover', etchPixel);
    grid.appendChild(pixel);
  }
}

// ------ EVENT FUNCTIONS ------
function etchPixel(e) {
  e.target.style.backgroundColor = 'black';
}

function clearGrid() {
  grid.childNodes.forEach((pixel) => (pixel.style.backgroundColor = 'white'));
}
