import css from './styles/style.scss';
import barajaTpl from './templates/baraja.js';
import {generate} from './modules/game.js';
import waitFor from './utils/wait-for.js';
import sidebar from './modules/sidebar.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

waitFor( () => {
  return void 0 !== window.$;
}, () => {
  const players = 4; // GAME FOR x PLAYERS
  const deck = generate(players);
  
  const table = document.querySelector('.c-table');
  const group = table.querySelector('ul');
  group.classList = `c-group c-group-${players}`;
  const cemetery = document.querySelector('.c-cemetery-cards');

  console.log(deck);

  //render players
  for (let i = 0; i < players; i++) {
    group.insertAdjacentHTML('beforeend', `<li class="c-gamer c-gamer-${i}">${barajaTpl(i, deck)}</li>`);
  }

  //deliver ui deck based on user position
  [].slice.call(document.querySelectorAll('.c-gamer'))
    .filter(function (item) {
      var $el = $(item.querySelector('.baraja-container'));
      $el.baraja();
      return item;
    });

  //sidebar
  sidebar(deck, cemetery);
});