// Script for etch-a-sketch drawing pad
// Author: DustyPriest

// TODO: option to clear grid on mode change
// TODO: cursor brush icon
// TODO: retro, retrocolour modes
// TODO: brush colour picker, canvas colour picker
//          - canvas picker should only change pixels that are old canvas colour
// TODO: add options for hover / click & drag / click?
// TODO: show grid

const DEFAULT_SIZE = 16;
const DEFAULT_CANVAS_CLR = '#ffffff';
const DEFAULT_MODE = 'colour';
const DEFAULT_PAINT_CLR = '#000000';
const DEFAULT_BRUSH_MODE = 'click-drag';

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
const modeOptions = document.querySelectorAll('.mode-options > *');
const brushClrSelection = document.querySelector('#brush-colour');
const canvasClrSelection = document.querySelector('#canvas-colour');
const eraser = document.querySelector('.eraser-box');

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

modeOptions.forEach((option) => {
  option.addEventListener('click', selectMode);
});

eraser.addEventListener('click', selectMode);

brushClrSelection.addEventListener('change', (e) => {
  paintClr = e.target.value;
});

canvasClrSelection.addEventListener('input', updateCanvasClr);

// ------ EVENT FUNCTIONS ------

function selectMode(e) {
  modeOptions.forEach((option) => {
    option.classList.remove('active');
  });
  eraser.classList.remove('active');
  mode = e.target.id;
  e.target.classList.add('active');
}

function etchPixel(e) {
  switch (mode) {
    case 'colour': // immediate full colour
      e.target.style.backgroundColor = paintClr;
      break;
    case 'retro': // +10% darkness per hover (greyscale)
      // set initial shade if still canvas clr
      if (rgbToHex(rgbToObject(e.target.style.backgroundColor)) === canvasClr) {
        e.target.style.backgroundColor = 'rgb(238, 238, 238)';
      }
      // if black do nothing
      else if (e.target.style.backgroundColor === 'rgb(0, 0, 0)') {
        break;
      }
      // otherwise increase darkness
      else {
        const rgb = rgbToObject(e.target.style.backgroundColor);
        // using all 3 rgb values incase applied to previously coloured pixel
        const newShade = (+rgb.red + +rgb.green + +rgb.blue) / 3 - 17;
        e.target.style.backgroundColor = `rgb(${newShade}, ${newShade}, ${newShade})`;
      }
      break;
    case 'rainbow': // random full colour per pixel
      let hue = Math.floor(Math.random() * 361);
      let lightness = randomInRange(40, 70);
      e.target.style.backgroundColor = `hsl(${hue} 100% ${lightness}%)`;
      break;
    case 'eraser-box':
      e.target.style.backgroundColor = canvasClr;
      break;
    default:
      console;
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

function updateCanvasClr(e) {
  console.log('fired');
  const oldCanvasClr = canvasClr;
  canvasClr = e.target.value;
  // update pixels not yet drawn on
  grid.childNodes.forEach((pixel) => {
    rgbToHex(rgbToObject(pixel.style.backgroundColor)) === oldCanvasClr
      ? (pixel.style.backgroundColor = canvasClr)
      : '';
  });
}

// ------ GENERAL FUNCTIONS ------

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgbToObject(rgbStr) {
  const rgbObj = {};
  const rgbList = rgbStr
    .substring(rgbStr.indexOf('(') + 1, rgbStr.lastIndexOf(')'))
    .split(/,s*/);
  rgbObj.red = rgbList[0].trim();
  rgbObj.green = rgbList[1].trim();
  rgbObj.blue = rgbList[2].trim();

  return rgbObj;
}

function rgbToHex(rgbObj) {
  return `#${parseInt(rgbObj.red).toString(16)}${parseInt(
    rgbObj.green
  ).toString(16)}${parseInt(rgbObj.blue).toString(16)}`;
}

// ------ ON PAGE LOAD ------

resizeGrid();
