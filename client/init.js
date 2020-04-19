import css from './styles/style.scss';
import barajaTpl from './templates/baraja.js';
import generate from './modules/game.js';
import waitFor from './utils/wait-for.js';

document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

waitFor( () => {
  return void 0 !== window.$;
}, () => {
  const table = document.querySelector('.c-table');
  const group = table.querySelector('ul');
  const game = document.querySelector('.c-table-game');
  
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

  //deliver ui deck based on position
  [].slice.call(document.querySelectorAll('.c-gamer'))
    .filter(function (item, i) {
      game.insertAdjacentHTML('beforeend', barajaTpl(i, playerCards));
      var $el = $(`.c-gamer-id-${i} > ul`);
      $el.css('top', window.getComputedStyle(item, null).top);
      $el.css('left', window.getComputedStyle(item, null).left);
      $el.css('transform', window.getComputedStyle(item, null).transform);
      $el.baraja();
      //var baraja = $el.baraja();
      //baraja.fan();
      return item;
    });

  $('.c-cemetery-cards').baraja();

  /*$( '#add' ).on( 'click', function( event ) {
    if( $( this ).hasClass( 'disabled' ) ) {
      return false;
    }
    $( this ).addClass( 'disabled' );
    baraja.add( $('<li><img src="images/6.jpg" alt="image6"/><h4>Serenity</h4><p>Truffaut wes anderson hoodie 3 wolf moon labore, fugiat lomo iphone eiusmod vegan.</p></li><li><img src="images/7.jpg" alt="image7"/><h4>Dark Honor</h4><p>Chillwave mustache pinterest, marfa seitan umami id farm-to-table iphone.</p></li><li><img src="images/8.jpg" alt="image8"/><h4>Nested Happiness</h4><p>Minim post-ironic banksy american apparel iphone wayfarers.</p></li><li><img src="images/9.jpg" alt="image9"/><h4>Cherry Country</h4><p>Sint vinyl Austin street art odd future id trust fund, terry richardson cray.</p></li>') );
  });
  */
});

