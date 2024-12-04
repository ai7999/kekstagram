
/*
7.10. Отрисуй меня полностью (часть 1)
Отобразить фотографии других пользователей.
Заведите модуль, который будет отвечать за отрисовку миниатюр.
На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:
Адрес изображения url подставьте как атрибут src изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments.
Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
Подключите модуль в проект.
*/

import { showBigPicture } from "./fullpicture.js";

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createPicture = (data) => {
  const { url, description, likes, comments } = data;
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;//

  picture.addEventListener('click', () => {
    showBigPicture(data);
  });

  return picture;
};

const renderPictures = (picturesOfUsers) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const usersPictureFragment = document.createDocumentFragment();
  picturesOfUsers.forEach((picture) => {
    const pictureElement = createPicture(picture);
    usersPictureFragment.append(pictureElement);
  });
  container.append(usersPictureFragment);
};

export { renderPictures };
