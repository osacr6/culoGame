import debounce from '../utils/debounce.js';
import {orderCards} from '../utils/global.js';

export default function(deck, cemetery) {
  const sidebar = document.querySelector('.c-sidebar');
  const sideBarContainer = sidebar.querySelector('.sidebar-container');
  const sendBtn = sidebar.querySelector('.c-toolbar .send');
  const user = 1;

  document.querySelector(`.c-gamer-${user} .baraja-game`).addEventListener('click', debounce(({target}) => {
    const sideBarCards = orderCards(deck[user]);
    const game = target.closest('.baraja-container');
    sideBarContainer.innerHTML = '';

    for (let i = 0; i < sideBarCards.length; i++) {
      sideBarContainer.insertAdjacentHTML('beforeend', `<li data-card="${sideBarCards[i]}"><span class="overlay"></span><img src="/img/cards/${sideBarCards[i]}.svg"></li>`);
    }

    if(game.classList.contains('c-open')) {
      game.classList.remove('c-open');
      sidebar.classList.remove('c-open');
      return;
    } else {
      game.classList.add('c-open');
      sidebar.classList.add('c-open');
    }

    // card selector
    const cardSelector = [].slice.call(sideBarContainer.querySelectorAll('li'));
    for (let i = 0; i < cardSelector.length; i++) {
      cardSelector[i].addEventListener('click', ({ target }) => {
        target.closest('li').classList.toggle('c-selected');
      });
    }

    //send to cemetery
    sendBtn.addEventListener('click', () => {
      for (let i = 0; i < cardSelector.length; i++) {
        if (cardSelector[i].classList.contains('c-selected')) {
          cemetery.insertAdjacentHTML('beforeend', `<li><img src="/img/cards/${cardSelector[i].dataset.card}.svg"></li>`);
        }
      }

      //close deck
      for (var key in game) {
        if (key.startsWith('jQuery')) {
          if(game[key].baraja) {
            game.classList.remove('c-open');
            sidebar.classList.remove('c-open');
            game[key].baraja.close();
          }
        }
      }
    })
  }), 200); //debounce
}