import { useEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./Card";
import { findCombination, getDeck } from "./helpers";

function App() {
  const [score] = useState(0);
  const [rows, setCurrentRows] = useState<string[][]>([]);
  const deck = useRef(getDeck());

  useEffect(() => {
    if (rows.length === 0) {
      console.log(rows);
      getNewRow();
    }
  }, []);

  function getNewRow() {
    setCurrentRows((rows) => [...rows, deck.current.slice(0, 5)]);
    deck.current = deck.current.slice(5);
  }

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
      <div className="play-area">
        <div className="total-score-box">
          <div>Total score:</div>
          <div>{score}</div>
        </div>
        <div className="card-table">
          {rows.map((row, index) => (
            <div className="card-row" key={index}>
              {row.map((a) => (
                <Card cardTag={a} key={a} />
              ))}
              <div className="score-box">
                <div>{findCombination(row).type}</div>
                <div>{findCombination(row).score}</div>
              </div>
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
}

export default App;
