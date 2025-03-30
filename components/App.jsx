import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die.jsx";
import Confetti from "react-confetti";
export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const gameWon = dice.every(
    (die) => die.isHeld && die.number === dice[0].number
  );

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      number: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function hold(dieId) {
    setDice((prevDice) => {
      return prevDice.map((dice) =>
        dice.id === dieId ? { ...dice, isHeld: !dice.isHeld } : dice
      );
    });
  }

  function getDice() {
    return dice.map((die) => (
      <Die
        key={die.id}
        number={die.number}
        isHeld={die.isHeld}
        hold={hold}
        id={die.id}
      />
    ));
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((dice) =>
        dice.isHeld ? dice : { ...dice, number: Math.ceil(Math.random() * 6) }
      )
    );
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <section className="table">{getDice()}</section>
      <button
        className="roll-btn"
        onClick={gameWon ? () => setDice(generateAllNewDice()) : rollDice}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
