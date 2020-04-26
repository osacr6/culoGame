export default function barajaTpl(i, cards) {
  return `<div class="baraja-game">
    <ul class="baraja-container">
    ${cards[i].reduce( (r, e, index) => {
      return `${r == 0 ? '' : r}<li><img src="/img/cards/${e}.svg"></li>`
    },0)}
  </ul></div>`;
}