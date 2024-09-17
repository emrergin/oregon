interface CardObject {
  suit: string;
  value: string;
}

export function findCombination(hand: string[]) {
  const handObject = hand.map((a) => ({ suit: a[1], value: a[0] }));
  const isStraight = checkIfStraight(handObject);
  if (isStraight && checkFlush(handObject)) {
    return {
      type: "Straight Flush",
      score: 10,
    };
  }

  const cardCounts = countCards(handObject);
  if (checkFourOfAKind(cardCounts)) {
    return {
      type: "Four Of A Kind",
      score: 7,
    };
  }
  if (checkFullHouse(cardCounts)) {
    return {
      type: "Full House",
      score: 5,
    };
  }
  if (checkFlush(handObject)) {
    return {
      type: "Flush",
      score: 3,
    };
  }
  if (isStraight) {
    return {
      type: "Straight",
      score: 3,
    };
  }
  const maxValue = findMaximumCount(cardCounts);
  if (maxValue === 3) {
    return {
      type: "Three Of A Kind",
      score: 3,
    };
  }
  if (checkTwoPairs(cardCounts)) {
    return {
      type: "Two Pairs",
      score: 2,
    };
  }
  if (maxValue === 2) {
    return {
      type: "One Pair",
      score: 1,
    };
  }

  return {
    type: "Plugged Nickel",
    score: 0,
  };
}

function checkFlush(handObject: CardObject[]) {
  const suits = new Set(handObject.map((a) => a.suit));
  if (handObject.length < 5) {
    return false;
  }
  if (suits.size > 1) {
    return false;
  } else {
    return true;
  }
}

function checkFourOfAKind(cardCounts: { [key: string]: number }) {
  for (const key in cardCounts) {
    if (cardCounts[key] === 4) {
      return true;
    }
  }
  return false;
}

function checkFullHouse(cardCounts: { [key: string]: number }) {
  let threeExists = false;
  let twoExists = false;
  for (const key in cardCounts) {
    if (cardCounts[key] === 3) {
      threeExists = true;
    } else if (cardCounts[key] === 2) {
      twoExists = true;
    }
    if (threeExists && twoExists) {
      return true;
    }
  }
  return false;
}

function checkTwoPairs(cardCounts: { [key: string]: number }) {
  let twoExists1 = false;
  let twoExists2 = false;
  for (const key in cardCounts) {
    if (cardCounts[key] === 2 && !twoExists1) {
      twoExists1 = true;
    } else if (cardCounts[key] === 2) {
      twoExists2 = true;
    }
    if (twoExists1 && twoExists2) {
      return true;
    }
  }
  return false;
}

function findMaximumCount(cardCounts: { [key: string]: number }) {
  let maxValue = 0;
  const values = Object.values(cardCounts);
  values.map((el) => {
    const valueFromObject = el;
    maxValue = Math.max(maxValue, valueFromObject);
  });
  return maxValue;
}

function checkIfStraight(handObject: CardObject[]) {
  const values = [...new Set(handObject.map((a) => a.value))]
    .reduce((acc, curr) => {
      if (curr === "A") {
        return [...acc, 1, 14];
      } else if (curr === "J") {
        return [...acc, 11];
      } else if (curr === "Q") {
        return [...acc, 12];
      } else if (curr === "K") {
        return [...acc, 13];
      } else if (curr === "T") {
        return [...acc, 10];
      } else {
        return [...acc, Number(curr)];
      }
    }, [] as number[])
    .sort((a, b) => a - b);
  let sequenceLength = 1;
  for (let i = 1; i < values.length; i++) {
    if (values[i] === values[i - 1] + 1) {
      sequenceLength++;
      if (sequenceLength >= 5) {
        return true;
      }
    } else {
      sequenceLength = 1;
    }
  }
  return false;
}

function countCards(handObject: CardObject[]) {
  const counts: { [key: string]: number } = {};
  for (const card of handObject) {
    if (counts[card.value] === undefined) {
      counts[card.value] = 1;
    } else {
      counts[card.value] = counts[card.value] + 1;
    }
  }
  return counts;
}

export function getDeck() {
  function shuffle<T>(array: T[]) {
    const resArray = array;
    for (let i = resArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resArray[i], resArray[j]] = [resArray[j], resArray[i]];
    }
    return resArray;
  }

  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
  ];

  const suits = ["d", "s", "c", "h"];

  let deck: string[] = [];

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      deck = [...deck, values[i] + suits[j]];
    }
  }

  return shuffle(deck);
}
