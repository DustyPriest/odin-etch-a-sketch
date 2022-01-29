// Script for etch-a-sketch drawing pad
// Author: DustyPriest

const DEFAULT_SIZE = 16;
const DEFAULT_CANVAS_CLR = '#ffffff';
const DEFAULT_MODE = 'colour';
const DEFAULT_PAINT_CLR = '#000000';

let gridSize = DEFAULT_SIZE;
let canvasClr = DEFAULT_CANVAS_CLR;
let mode = DEFAULT_MODE;
let paintClr = DEFAULT_PAINT_CLR;

// ------ DOM ELEMENTS ------
const grid = document.querySelector('#etch-grid');
const clearBtn = document.querySelector('.clear-btn');
const sizeBtn = document.querySelector('.size-btn');
const formCurtain = document.querySelector('.form-curtain');
const applyBtn = document.querySelector('.apply-size-btn');
const cancelBtn = document.querySelector('.cancel-size-btn');
const sizeInput = document.querySelector('#size-input');
const resizeText = document.querySelector('.resize-text');

// ------ EVENT LISTENERS ------
clearBtn.addEventListener('click', clearGrid);

sizeInput.addEventListener('input', (e) => {
  resizeText.textContent = `x ${e.target.value}`;
});

sizeBtn.addEventListener('click', () => {
  formCurtain.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
  formCurtain.style.display = 'none';
});

applyBtn.addEventListener('click', handleInput);

// ------ EVENT FUNCTIONS ------
function etchPixel(e) {
  switch (mode) {
    case 'colour': // immediate full colour
      e.target.style.backgroundColor = paintClr;
      break;
    case 'retro': // +10% darkness per hover (greyscale)
      break;
    case 'rainbow': // random full colour per pixel
      break;
    case 'retro-colour': // +10% saturation with colour
      break;
    default:
      e.target.style.backgroundColor = 'red'; // red for testing
  }
}

function clearGrid() {
  grid.childNodes.forEach((pixel) => (pixel.style.backgroundColor = canvasClr));
}

function handleInput() {
  if (sizeInput.valueAsNumber > 100) {
    gridSize = 100;
    sizeInput.value = 100;
    resizeText.textContent = 'x 100';
  } else if (sizeInput.valueAsNumber < 1) {
    gridSize = 1;
    sizeInput.value = 1;
    resizeText.textContent = 'x 1';
  } else {
    gridSize = sizeInput.valueAsNumber;
  }
  formCurtain.style.display = 'none';
  resizeGrid();
}

function resizeGrid() {
  // remove current grid children
  grid.innerHTML = '';
  // resize grid template
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  // create & insert new children
  for (let i = 0; i < gridSize; i++) {
    for (let i = 0; i < gridSize; i++) {
      const pixel = document.createElement('div');
      pixel.style.backgroundColor = canvasClr;
      pixel.addEventListener('mouseover', etchPixel);
      grid.appendChild(pixel);
    }
  }
}

// ------ ON PAGE LOAD ------

resizeGrid();
