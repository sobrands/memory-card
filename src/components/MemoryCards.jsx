function MemoryCards({ loading, cards, handleClick }) {
  if (loading)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  return (
    <main className="game-board">
      <div className="cards">
        {cards.map((card) => {
          return (
            <button
              className="card"
              id={card.species.name}
              key={card.id}
              onClick={handleClick}
            >
              <img src={card.sprites.front_default} />
              <span>{card.species.name}</span>
            </button>
          );
        })}
      </div>
    </main>
  );
}

export default MemoryCards;
