import cards from './cards.js';
import {deckSize, shuffle, orderCards} from '../utils/global.js';

/**
 * 
 * @param {*} numPlayers 
 */
export function generate(numPlayers) {
  let deck = [];
  let playerCards = [];
  let currentPlayer = 0;

  for (let index = 0; index < deckSize(numPlayers); index++) {
    deck = [...deck, ...cards()];
  }

  deck = shuffle(deck);

  for (let i = 0; i < numPlayers; i++) {
    playerCards[i] = [];
  }

  //pop each card from deck 
  for (let j = deck.length -1; j > -1; j--) {
    currentPlayer = currentPlayer < numPlayers ? currentPlayer : 0;
    playerCards[currentPlayer].push(deck.pop());
    currentPlayer++;
  }

  return playerCards;
}
