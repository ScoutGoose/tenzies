export default function Die({ number, isHeld, hold, id }) {
  return (
    <button
      className="single-die"
      style={
        isHeld ? { backgroundColor: "#59E391" } : { backgroundColor: "#fff" }
      }
      onClick={() => hold(id)}
    >
      {number}
    </button>
  );
}
