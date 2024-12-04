const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleInputValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
let SCALE = 100;

scaleInputValue.innerHTML = `${DEFAULT_SCALE}%`;

const scaleImage = (value = DEFAULT_SCALE) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleInputValue.value = `${value}%`;
};

const smallerButtonClick = () => {
  SCALE = SCALE - STEP_SCALE;
  if (SCALE < MIN_SCALE) {
    SCALE = MIN_SCALE;
  }
  scaleImage(SCALE);
};

const biggerButtonClick = () => {
  SCALE = SCALE + STEP_SCALE;
  if (SCALE > MAX_SCALE) {
    SCALE = MAX_SCALE;
  }
  scaleImage(SCALE);
};

const resetScale = () => {
  scaleImage();
};

scaleSmaller.addEventListener('click', smallerButtonClick);
scaleBigger.addEventListener('click', biggerButtonClick);

export { resetScale };


