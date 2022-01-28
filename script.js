let gridSize = 16;
let canvasClr = 'white';

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
  e.target.style.backgroundColor = 'black';
}

function clearGrid() {
  grid.childNodes.forEach((pixel) => (pixel.style.backgroundColor = 'white'));
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

// function updateResizeText(e) {
//   resizeText.textContent = `x ${e.target.value}`;
// }

// ------ ON PAGE LOAD ------

resizeGrid();
