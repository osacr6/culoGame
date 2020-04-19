// 14 = A, 15 = 2
export default function cards() {
  const spades = ['3-s', '4-s', '5-s', '6-s', '7-s', '8-s', '9-s', '10-s', '11-s', '12-s', '13-s', '14-s', '15-s', 'joker'];
  const hearts = ['3-h', '4-h', '5-h', '6-h', '7-h', '8-h', '9-h', '10-h', '11-h', '12-h', '13-h', '14-h', '15-h', 'joker'];
  const diamonds = ['3-d', '4-d', '5-d', '6-d', '7-d', '8-d', '9-d', '10-d', '11-d', '12-d', '13-d', '14-d', '15-d'];
  const clubs = ['3-c', '4-c', '5-c', '6-c', '7-c', '8-c', '9-c', '10-c', '11-c', '12-c', '13-c', '14-c', '15-c'];
  return [...spades, ...hearts, ...diamonds, ...clubs];
}