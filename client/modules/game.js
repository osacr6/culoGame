import cards from './cards.js';
import {deckSize} from './utils.js';

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function generate(numPlayers) {
  let gamecards = [];

  for (let index = 0; index < deckSize(numPlayers); index++) {
    gamecards = [...gamecards, ...cards()];
  }

  return shuffle(gamecards);
}