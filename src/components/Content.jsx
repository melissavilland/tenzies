// Improvement suggestions:
// 1. Add a timer to track how long it takes to win the game.
// 2. Add a high score feature that saves the best time.
// 3. Add a reset button to clear the high sccore.
// 4. Style the dice to look like actual dice.
// 5. Add sound effects for rolling the dice and winning the game.
// 6. Add a leaderboard to show the top scores of players.
// 7. Add a theme switcher to change the appearance of the game.
// 8. Add a tutorial or help section to explain the game rules.
// 9. Add animations for rolling the dice and winning the game.

import Die from "./Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Content() {
  const { width, height } = useWindowSize();
  const [dice, setDice] = useState(() => generateAllNewDice());
  const rollDiceButton = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      rollDiceButton.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      const dieValue = Math.ceil(Math.random() * 6);
      newDice.push({ value: dieValue, isHeld: false, id: nanoid() });
    }
    return newDice;

    // return new Array(10)
    // .fill(0)
    // .map(() => Math.ceil(Math.random() * 6))
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDie={() => holdDie(die.id)}
      />
    );
  });

  return (
    <main>
      {gameWon && <Confetti width={width} height={height} />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>
            Congratulations! You've won the game! Press "New Game" to play
            again.
          </p>
        )}
      </div>

      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>

      <button
        ref={rollDiceButton}
        className="roll-btn"
        onClick={gameWon ? () => setDice(generateAllNewDice()) : rollDice}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
