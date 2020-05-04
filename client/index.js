import css from './styles/style.scss';
import {generate} from './modules/game.js';
import {postData} from './utils/request.js';
import modalTpl from './templates/modal.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
const newGameBtn = document.querySelector('.c-newGame');

newGameBtn.addEventListener('click', () => {
  const players = 4;
  const deck = generate(players);
  const token = URL.createObjectURL(new Blob([])).slice(-36).replace(/-/g, "");
  const tempUrl = Math.random().toString(36).substr(2, 5);

  console.log(deck);

  //save user
  if (localStorage.getItem('c-user-token')) {
    postData(`/api/game/${tempUrl}`, {'user': localStorage.getItem('c-user-token'), 'deck': deck});
  } else {
    document.body.insertAdjacentHTML('beforeend', modalTpl());
    const modal = document.querySelector('.c-modal');
    const modalClose = modal.querySelector('.close-modal');
    const modalBtn = modal.querySelector('input[type="submit"]');

    modalClose.addEventListener('click', () => modal.remove());

    modalBtn.addEventListener('click', () => {
      const userName = modal.querySelector('input[type="text"]');

      console.log(userName.value);

      if (userName.value != '') {
        localStorage.setItem('c-user-token', token);
        postData(`/api/user/${token}`, {'user': userName.value, 'deck': deck}, (d) => {
          console.log(d);

          //postData(`/game/${tempUrl}`, {'user': token, 'deck': deck}, (t) => {
          //  console.log(t);
          //});
        });
      }
    });
  }
});