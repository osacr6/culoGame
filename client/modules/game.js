import cards from './cards.js';
import {deckSize} from './utils.js';


// Function to create an array with ordened cards (low to high)
// Receive: An array of cards
// Return: An array with ordened cards (low to high)
export const orderCards = (a) => {
  let cardsOrdened = []
  let orderValue = [];

  // Create a array [{name: card number,value: index in a}, ...]
  a.forEach((element, index) => {
    let ele = "";
    if(element === 'joker'){
      ele = 'joker';
    }
    else {
      ele = parseInt(element);
    }

    orderValue.push({ name: ele, value: index })
  })

  // In orderValue array order the cards (low to high)
  orderValue.sort(function (a, b) {
    let nameA = a.name;
    let nameB = b.name;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  // Add the cards in cardsOrdened with the order of orderValue array and with the information of a array
  for (let i = orderValue.length - 1; i > 0; i--) {
    let cardPosition = orderValue[i].value;
    cardsOrdened[i]= a[cardPosition]
  }

  return cardsOrdened;
}

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function generate(numPlayers) {
  let gamecards = [];

  for (let index = 0; index < deckSize(numPlayers); index++) {
    gamecards = [...gamecards, ...cards()];
  }

  return shuffle(gamecards);
}
