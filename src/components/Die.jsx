export default function Die({ value, isHeld, holdDie }) {
  const styles = {
    backgroundColor: isHeld ? "#59e391" : "white",
  };
  return (
    <button
      className="die"
      style={styles}
      onClick={holdDie}
      aria-pressed={isHeld}
      aria-label="{`Die with value ${value} is ${isHeld ? 'held' : 'not held'}`}"
    >
      {value}
    </button>
  );
}
