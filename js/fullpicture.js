/*
Задача
Кекстаграм
Реализовать сценарий просмотра фотографий в полноразмерном режиме. В таком режиме пользователь получает несколько дополнительных возможностей: детально рассмотреть изображение, поставить «лайк», почитать комментарии, оставленные другими пользователями.
Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.
Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:
Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:
<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
Описание фотографии description вставьте строкой в блок .social__caption.
После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.
Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
Подключите модуль в проект.
Как связать модули миниатюр и полноразмерного режима?
Задача не имеет одного верного решения, поэтому будет правильным как использование третьего модуля для связки двух других,
 так и импорт модуля полноразмерных изображений в модуль миниатюр и дальнейшая работа с интерфейсом этого модуля,
 addEventListener и замыканиями. Последнее решение похоже на демонстрацию по учебному проекту.
 А первое — с третьим модулем — более сложное из-за отсутствия примера, но самостоятельное.
 В качестве третьего модуля можно выбрать точку входа, а можно завести отдельный модуль, например «Галерея».
 Решение за вами.
*/
/*
8.14. Правда или действие (часть 2)
Каждый объект с описанием фотографии содержит массив с комментариями. Данные из этого массива мы вывели в соответствующую
 область окна полноразмерного просмотра. Все бы хорошо, но для популярных фотографий комментариев может быть много.
 Если вывести их разом, то пользователю будет неудобно взаимодействовать с окном просмотра. Улучшить пользовательский
 интерфейс поможет кнопка «Загрузить ещё».
Покажите блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, убрав у них класс hidden.
В модуле, который отвечает за отрисовку окна с полноразмерным изображением, доработайте код по выводу списка комментариев
таким образом, чтобы список показывался не полностью, а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию
на кнопку «Загрузить ещё». Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.
Обратите внимание, хотя кнопка называется «Загрузить ещё», никакой загрузки с сервера не происходит. Просто показываются следующие 5 комментариев из списка.
*/
const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderBtn = bigPicture.querySelector('.comments-loader');
const scaleInputValue = document.querySelector('.scale__control--value');

//const DEFAULT_SCALE = 100;
const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;
let comments = [];

//scaleInputValue.value = `${DEFAULT_SCALE}%`;

const createComment = ({ avatar, message, name }) => {
  const comment = document.createElement('li');
  comment.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  const fragment = document.createDocumentFragment();

  if (commentsShown >= comments.length) {
    commentsLoaderBtn.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderBtn.classList.remove('hidden');
  }

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }
  socialComments.innerHTML = '';
  socialComments.append(fragment);
  socialCommentCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;

};

const showBigPicture = (data) => {

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);

  //socialCommentCount.classList.add('hidden');
  //commentsLoader.classList.add('hidden');

  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

const clickCommentsLoaderBtn = () => {
  renderComments();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;

};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);

  commentsShown = 0;
};

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
};

closeButton.addEventListener('click', function () {
  hideBigPicture();
});

commentsLoaderBtn.addEventListener('click', clickCommentsLoaderBtn);

export { showBigPicture };
