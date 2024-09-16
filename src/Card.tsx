import "./App.css";
import clubsLogo from "./assets/clubs.svg";
import diamondsLogo from "./assets/diamonds.svg";
import spadesLogo from "./assets/spades.svg";
import heartsLogo from "./assets/hearts.svg";

function logoPicker(logoText: string) {
  switch (logoText) {
    case "c":
      return <img src={clubsLogo} className="logo" alt="Vite logo" />;
    case "d":
      return <img src={diamondsLogo} className="logo" alt="Vite logo" />;
    case "s":
      return <img src={spadesLogo} className="logo" alt="Vite logo" />;
    case "h":
      return <img src={heartsLogo} className="logo" alt="Vite logo" />;
  }
}

function Card({ cardTag }: { cardTag: string }) {
  return (
    <div className="card">
      <div>{logoPicker(cardTag[1])}</div>
      <div>{cardTag[0]}</div>
    </div>
  );
}

export default Card;
