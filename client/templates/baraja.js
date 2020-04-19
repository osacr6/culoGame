export default function barajaTpl(i, cards) {
  let htmlTpl = `<div class="baraja-game c-gamer-id-${i}"><ul class="baraja-container">`;
  for (let index = 0; index < cards[i].length; index++) {
    htmlTpl += `<li><img src="/img/cards/${cards[i][index]}.png" alt="image1"></li>`;
  }
  return htmlTpl+'</ul></div>';
}