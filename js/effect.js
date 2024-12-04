const form = document.querySelector('.img-upload__form');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFFAULT_EFFECT;

noUiSlider.create(effectSlider, {
  range: {
    min: DEFFAULT_EFFECT.min,
    max: DEFFAULT_EFFECT.max,
  },
  start: DEFFAULT_EFFECT.max,
  step: DEFFAULT_EFFECT.step,
  connect: 'lower',
});

const isDefault = () => {
  if (chosenEffect === DEFFAULT_EFFECT) {
    effectSlider.classList.add('hidden');
    return true;
  }
};

const updateSlider = () => {
  effectSlider.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });
};

effectSlider.noUiSlider.on('update', () => {
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }

  const sliderValue = effectSlider.noUiSlider.get();
  imgUploadPreview.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  imgUploadPreview.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevel.value = sliderValue;
});

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const resetEffect = () => {
  chosenEffect = DEFFAULT_EFFECT;
  updateSlider();
};

updateSlider();

form.addEventListener('change', onFormChange);

export { resetEffect };
