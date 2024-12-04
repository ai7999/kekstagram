
import { renderPictures } from './pics.js';
import { setOnFormSubmit, closeModal } from './form.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { turnFilterOn, filterPictures, filterOnClick } from './filter.js';

/*
В файле main.js на основе написанных по заданию ранее вспомогательных функций напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.
Структура каждого объекта должна быть следующей:
id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
description, строка — описание фотографии. Описание придумайте самостоятельно.
likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
{
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}
У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.
Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

Когда вы делаете фотографию, хорошо бы убирать палец из кадра.
Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
*/

//renderPictures(getSimilarPhotos());

const onSendDataSuccess = () => {
  closeModal();
  showSuccessMessage();
};

const onSendDataError = () => {
  closeModal();
  showErrorMessage();
};

setOnFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});

const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  renderPictures(filterPictures());
  filterOnClick(renderPictures);
};

/*
примеры сортировки массива
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function (a, b) {
  console.log('a: ' + a + ', b:' + b);//-2 3 1 -3 -1 -1 1
  console.log(a - b);
  return a - b;
});
console.log(numbers); // [1, 2, 3, 4, 5]
*/
///////
/*
// массив для сортировки
var list = ["Дельта", "альфа", "ЧАРЛИ", "браво"];
console.log(list);

// временный массив содержит объекты с позицией и значением сортировки
var mapped = list.map(function (el, i) {
  return { index: i, value: el.toLowerCase() };
});

// сортируем массив, содержащий уменьшенные значения
mapped.sort(function (a, b) {
  if (a.value > b.value) {
    return 1;
  }
  if (a.value < b.value) {
    return -1;
  }
  return 0;
});
console.log(mapped);

// контейнер для результа
var result = mapped.map(function (el) {
  return list[el.index];
});
console.log(result);
*/
/*
// Изменение всех элементов
let words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];

const modifiedWords = words.filter((word, index, arr) => {
  arr[index + 1] += " extra";
  return word.length < 6;
});

console.log(modifiedWords);
console.log(words);
// Обратите внимание, что есть три слова длиной менее 6, но так как они были изменены,
// возвращается одно слово ['spray']

// Добавление новых элементов
words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];
const appendedWords = words.filter((word, index, arr) => {
  arr.push("new");
  return word.length < 6;
});

console.log(appendedWords);
console.log(words);
// Только три слова удовлетворяют условию, хотя `words` теперь имеет куда больше слов,
// длинной меньше 6 символов: ['spray', 'limit', 'elite']

// Удаление элементов
words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];
const deleteWords = words.filter((word, index, arr) => {
  arr.pop();
  return word.length < 6;
});

console.log(deleteWords);
console.log(words);
// Заметьте, что 'elite' не получено, так как удалено из `words` до того,
// как filter смог получить его: ['spray', 'limit']

*/
getData(onGetDataSuccess, showAlert);
