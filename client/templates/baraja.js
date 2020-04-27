import {orderCards} from '../utils/global.js';

export default function barajaTpl(i, cards) {
  console.log(orderCards(cards[i]));
  return `<div class="baraja-game">
    <ul class="baraja-container">
    ${orderCards(cards[i]).reduce( (r, e, index) => {
      return `${r == 0 ? '' : r}<li><img src="/img/cards/${e}.svg"></li>`
    },0)}
  </ul></div>`;
}