import { isEscapeKey } from "./util.js";

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const body = document.querySelector('body');

const showSuccessMessage = () => {
  body.append(successMessage);
  body.addEventListener('click', onBodyClick);
  body.addEventListener('keydown', onMessageKeydown);

  successMessage.querySelector('.success__button').addEventListener('click', hideMessage);
};

const showErrorMessage = () => {
  body.append(errorMessage);
  body.addEventListener('click', onBodyClick);
  body.addEventListener('keydown', onMessageKeydown);

  errorMessage.querySelector('.error__button').addEventListener('click', hideMessage);
};

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();

  body.removeEventListener('keydown', onMessageKeydown);
  body.removeEventListener('click', onBodyClick);
};

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

function onMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    hideMessage();
  }
}

export { showSuccessMessage, showErrorMessage };
