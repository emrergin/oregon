import { useEffect, useRef, useState } from "react";
import "./App.css";
import Card from "./Card";
import { findCombination, getDeck } from "./helpers";

function App() {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState<string[][]>([]);
  const [deck, setDeck] = useState(getDeck());
  const isStarted = useRef(false);
  const lastRowRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!isStarted.current) {
      isStarted.current = true;
      getNewRow();
    }
  }, []);

  useEffect(() => {
    if (deck.length === 0) {
      setScore((score) => score + findCombination(rows[rows.length - 1]).score);
    }
    console.log("hehehe");
  }, [deck.length, rows]);

  function getNewRow() {
    setRows((rows) => [...rows, deck.slice(0, 5)]);
    setDeck((deck) => deck.slice(5));
    if (rows.length > 0) {
      setScore((score) => score + findCombination(rows[rows.length - 1]).score);
    }
    if (lastRowRef.current) {
      lastRowRef.current.scrollIntoView();
    }
  }

  function placeCard(index: number) {
    const newRow = rows[rows.length - 1];
    if (deck.length !== 0) {
      newRow[index] = deck[0];
    }
    setRows((rows) => [...rows.slice(0, -1), newRow]);
    setDeck((deck) => deck.slice(1));
  }

  function gameEnd() {
    const highScore = localStorage.getItem("highscore") || 0;
    let message = "You earned " + score + " points.";
    if (score > Number(highScore)) {
      localStorage.setItem("highscore", `${score}`);
      message += "\n NEW HIGHSCORE!";
    }
    alert(message);
  }

  return (
    <div className="main-container">
      <div className="play-area">
        <div className="total-score-box">
          <div>Total score:</div>
          <div>{score}</div>
        </div>
        <div className="card-table">
          {rows.map((row, index) => (
            <div
              className="card-row"
              key={index}
              ref={index === rows.length - 1 ? lastRowRef : null}
            >
              {row.map((a, cardIndex) => (
                <Card
                  cardTag={a}
                  key={a}
                  clickable={index === rows.length - 1 && deck.length > 0}
                  onClick={() => {
                    placeCard(cardIndex);
                  }}
                />
              ))}
              <div className="score-box">
                <div>{findCombination(row).type}</div>
                <div>{findCombination(row).score}</div>
                {index === rows.length - 1 && deck.length > 0 && (
                  <button onClick={() => getNewRow()}>New Row +</button>
                )}
              </div>
              {index === rows.length - 1 && (
                <div>
                  {deck.length !== 0 && (
                    <>
                      <Card cardTag={deck[0]} onClick={() => {}} />
                      <div>{deck.length}</div>
                    </>
                  )}
                </div>
              )}
              {deck.length === 0 && index === rows.length - 1 && (
                <button onClick={() => gameEnd()}>Game End</button>
              )}
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

      <p>
        This is an implementation of the game{" "}
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
        row. One card after another is drawn from the deck. Add each card onto
        an old card or start a new row. All new cards may only be played on the
        last row. When all the cards are used up, the points for the poker
        combinations in each row are scored. The more points the better.
      </p>
      <div className="footer">
        <a href="https://github.com/emrergin/oregon" target="_blank">
          Source code
        </a>
      </div>
    </div>
  );
}

export default App;
