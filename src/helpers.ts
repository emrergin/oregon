export function shuffle<T>(array: T[]) {
  const resArray = array;
  for (let i = resArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resArray[i], resArray[j]] = [resArray[j], resArray[i]];
  }
  return resArray;
}

export function scoreCombination(hand: string[]) {
  return hand.length;
}
