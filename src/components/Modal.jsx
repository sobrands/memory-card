export default function Modal({ reset, numCards, currentScore }) {
  return (
    <div className="dark-BG">
      <div className="modal">
        {currentScore === numCards ? (
          <h1>Congratulations!</h1>
        ) : (
          <h1>Game Over!</h1>
        )}
        <button onClick={reset}>Play again?</button>
      </div>
    </div>
  );
}
