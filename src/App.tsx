import "./App.css";
import Card from "./Card";
import { shuffle } from "./helpers";

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

for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < suits.length; j++) {
    deck = [...deck, values[i] + suits[j]];
  }
}

deck = shuffle(deck);

function App() {
  return (
    <div className="main-container">
      <p>
        <b>Introduction</b>: This is an implementation of the game{" "}
        <a
          href="https://boardgamegeek.com/boardgame/341393/oregon"
          target="_blank"
        >
          Oregon
        </a>
        , designed by Reiner Knizia, published on the book "<i>Blazing Aces!</i>
        ", by FRED distribution and Convivium Publications.
      </p>
      <p>
        <b>Rules</b>: Cards are shuffled. Five cards are laid out face-up in a
        row. One card after another is drawn from the deck . Add each card onto
        an old card or start a new row. All new cards may only be played on the
        last row. When all the cards are used up, the points for the poker
        combinations in each row are scored. The more points the better.
      </p>
      <div className="score-list">
        <b>Scores:</b>
        <ul>
          <li>Plugged nickel 0</li>
          <li>One pair 1</li>
          <li>Two pairs 2</li>
          <li> Three of a kind 3</li>
          <li>Straight 3 </li>
          <li>Flush 3</li>
          <li> Full house 5 </li>
          <li>Four of a kind 7 </li>
          <li>Straight flush 10</li>
        </ul>
      </div>
      <div className="card-row">
        {deck.slice(0, 5).map((a) => (
          <Card cardTag={a} />
        ))}
      </div>
    </div>
  );
}

export default App;
