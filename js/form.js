import { isEscapeKey } from "./util.js";
import { resetScale } from './scale.js';
import { resetEffect } from "./effect.js";

/*
Заведите модуль, который будет отвечать за работу с формой.
Пропишите тегу <form>правильные значения атрибутовmethod и адрес action для отправки формы на сервер.
Обратите внимание. В разделе про работу с сетью мы доработаем механизм отправки данных, а пока достаточно правильных атрибутов у тега <form>.
Если форма заполнена верно, то после отправки покажется страница сервера (по адресу из атрибута action тега form) с успешно отправленными данными. Если же форма пропустила какие-то некорректные значения, то будет показана страница с допущенными ошибками. В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.
Проверьте разметку вашего проекта и добавьте недостающие атрибуты. Например, всем обязательным полям нужно добавить атрибут required. Затем проверьте, правильные ли типы стоят у нужных полей, если нет — проставьте правильные.
Изучите, что значит загрузка изображения, и как, когда и каким образом показывается форма редактирования изображения. Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания. В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.
Важно. Подстановка выбранного изображения в форму — это отдельная домашняя работа. В данном задании этот пункт реализовывать не нужно.
После реализуйте закрытие формы.
Обратите внимание, что при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла #upload-file. В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию. Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию, а значит окно с формой не отобразится, что будет нарушением техзадания. Значение других полей формы также нужно сбрасывать.
Напишите код для валидации формы добавления изображения. Список полей для валидации:
Хэш-теги
Комментарий
2.3. Хэш-теги:
хэш-тег начинается с символа # (решётка);
строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
хеш-тег не может состоять только из одной решётки;
максимальная длина одного хэш-тега 20 символов, включая решётку;
хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
хэш-теги разделяются пробелами;
один и тот же хэш-тег не может быть использован дважды;
нельзя указать больше пяти хэш-тегов;
хэш-теги необязательны;
если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
2.4. Комментарий:
комментарий не обязателен;
длина комментария не может составлять больше 140 символов;
если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.
Как отменить обработчик Esc при фокусе?
Задача не имеет одного верного решения, однако намекнём на самый простой — использовать stopPropagation для события нажатия клавиш в поле при фокусе.
Валидация хеш-тегов?
Для валидации хэш-тегов вам придётся вспомнить, как работать с массивами. Набор хэш-тегов можно превратить в массив, воспользовавшись методом .split(). Он разбивает строки на массивы. После этого, вы можете написать цикл, который будет ходить по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям. Если хотя бы один из тегов не проходит нужных проверок, показывать сообщение об ошибке.
Поля, не перечисленные в техзадании, но существующие в разметке, особой валидации не требуют.
На примере проекта «Кекстаграм» вы можете посмотреть, как должен выглядеть проект после выполнения этого задания.
*/

const form = document.querySelector('.img-upload__form');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const uploadFile = form.querySelector('#upload-file');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = form.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;//regular expression for hashtag
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',//элемент, на который будут добавляться классы
  errorTextParent: 'img-upload__element',//элемент, куда будет выводиться текст с ошибкой
  errorTextClass: 'img-upload__error',//класс для элемента с текстом ошибки
});

const showModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
}

const closeModal = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
}

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const fileInputChange = () => {
  const file = uploadFile.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);

    effectsPreviews.forEach((preview) => {
      photoPreview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }

  showModal();
}

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !onInputFocus()) {
    evt.preventDefault();
    closeModal();
  }
}


const sendForm = (value) => {

  const valueLowerCase = value.trim().toLowerCase();//хэш-теги нечувствительны к регистру
  const hashtags = valueLowerCase.split(' ');//хэш-теги разделяются пробелами;

  let result = hashtags.every((hashtag) => re.test(hashtag));//функция проверки хештегов в соответствии регулярному выражению

  result = checkDuplicates(hashtags);

  return result;
};

const checkDuplicates = (tags) => {
  let res = true;
  const duplicates = tags.filter((number, index, numbers) => {//функция поиска одинаковых тегов
    /* console.log(number);// number - элемент массива
     console.log(index);// index - индекс элемента массива
     console.log(numbers);// numbers - представление массива values
 */
    return numbers.indexOf(number) !== index;
  });

  if (tags.length > MAX_HASHTAG_COUNT || duplicates != 0) {//нельзя указать больше пяти хэш-тегов;
    res = false;
  }
  return res;
}

const onInputFocus = () => {
  document.activeElement === hashtagInput || document.activeElement === commentField;
}

const checkCommentField = () => {
  return commentField.value.length < MAX_COMMENT_LENGTH;
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


pristine.addValidator(hashtagInput, sendForm, 'not valid');


pristine.addValidator(commentField, checkCommentField, 'not valid');

uploadFile.addEventListener('change', fileInputChange);
uploadCancel.addEventListener('click', closeModal);

const setOnFormSubmit = (cb) => {
  form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(form));
      unblockSubmitButton();
    }
  });
};

export { setOnFormSubmit, closeModal };


