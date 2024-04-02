function SiteHeader({ currentScore, bestScore, setBestScore }) {
  return (
    <header>
      <div className="header-content">
        <h1>Memory Card</h1>
        <div className="scoreboard">
          <p>Current Score: {currentScore}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
