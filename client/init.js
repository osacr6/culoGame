import css from './styles/style.scss';
import barajaTpl from './templates/baraja.js';
import {generate, orderCards} from './modules/game.js';
import waitFor from './utils/wait-for.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

waitFor( () => {
  return void 0 !== window.$;
}, () => {
  const table = document.querySelector('.c-table');
  const group = table.querySelector('ul');
  const game = document.querySelector('.c-table-game');
  const cemeteryDeck = $('.c-cemetery-cards').baraja();
  const sidebar = document.querySelector('.c-sidebar');
  const sideBarContainer = sidebar.querySelector('.sidebar-container');
  const sendBtn = sidebar.querySelector('.c-toolbar .send');

  const players = 4; // GAME FOR x PLAYERS
  const deck = generate(players);
  let playerCards = [];
  let currentPlayer = 0;

  group.classList = `c-group-${players}`;

  //array for each plaper
  for (let i = 0; i < players; i++) {
    playerCards[i] = [];
    group.insertAdjacentHTML('beforeend', `<li class="c-gamer c-gamer-${i}"></li>`); // position in the table
  }

  //pop each card from deck 
  for (let j = deck.length -1; j > -1; j--) {
    currentPlayer = currentPlayer < players ? currentPlayer : 0;
    playerCards[currentPlayer].push(deck.pop());
    currentPlayer++;
  }

  //deliver ui deck based on user position
  [].slice.call(document.querySelectorAll('.c-gamer'))
    .filter(function (item, i) {
      game.insertAdjacentHTML('beforeend', barajaTpl(i, playerCards));
      var $el = $(`.c-gamer-id-${i} > ul`);
      $el.css('top', window.getComputedStyle(item, null).top);
      $el.css('left', window.getComputedStyle(item, null).left);
      $el.css('transform', window.getComputedStyle(item, null).transform);
      $el.baraja();
      return item;
    });

  //sidebar open
  document.querySelector('.baraja-game:last-child').addEventListener('click', ({ target }) => {
    const sideBarCards = orderCards(playerCards[playerCards.length-1]);
    sideBarContainer.innerHTML = '';

    for (let i = 0; i < sideBarCards.length; i++) {
      sideBarContainer.insertAdjacentHTML('beforeend', `<li><span class="overlay"></span><img src="/img/cards/${sideBarCards[i]}.png" alt="image1"></li>`);
    }

    target.closest('.baraja-game').classList.toggle('c-open');
    sidebar.classList.toggle('c-open');

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
          cardSelector[i].querySelector('.overlay').remove();
          cardSelector[i].classList.remove('c-selected');
          cemeteryDeck.add($(cardSelector[i].outerHTML));
          cardSelector[i].remove();
        }
      }
      sidebar.classList.toggle('c-open');
      target.closest('.baraja-game').classList.toggle('c-open');
      $(target.closest('.baraja-game')).baraja().close();
    });
  });
});

