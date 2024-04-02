import { useEffect, useState } from "react";
import "./App.css";
import SiteHeader from "./components/SiteHeader";
import MemoryCards from "./components/MemoryCards";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const numCards = 3;

  async function fetchData() {
    const fetchPokemon = async (id) => {
      try {
        const card = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
        const cardData = await card.json();
        return cardData;
      } catch (error) {
        return error;
      }
    };

    try {
      let cardList = [];
      for (let i = 0; i < numCards; i++) {
        let randomNum = Math.floor(Math.random() * 151);
        // Id cannot be 0
        while (randomNum === 0) {
          randomNum = Math.floor(Math.random() * 151);
        }
        const res = await fetchPokemon(randomNum);
        cardList.push(res);
      }
      setCards(cardList);
      setLoading(false);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function increaseCurrent() {
    setCurrentScore(currentScore + 1);
  }

  return (
    <>
      <SiteHeader
        currentScore={currentScore}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
      <MemoryCards
        loading={loading}
        cards={cards}
        handleClick={increaseCurrent}
      />
    </>
  );
}

export default App;
