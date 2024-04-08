import { useEffect, useState } from "react";
import "./App.css";
import SiteHeader from "./components/SiteHeader";
import MemoryCards from "./components/MemoryCards";
import Modal from "./components/Modal";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [trackedList, setTrackedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finish, setFinish] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);

  const numCards = 9;

  if (!finish && currentScore === numCards) {
    setFinish(true);
  }

  async function fetchData() {
    const fetchPokemon = async (id) => {
      const card = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
      const cardData = await card.json();
      return cardData;
    };

    try {
      let chosenIds = [];
      let cardList = [];
      while (cardList.length < numCards) {
        let randomNum = Math.floor(Math.random() * 151);
        let chose = chosenIds.find((id) => id === randomNum);
        // ID must be unique and more than 0
        if (randomNum === 0 || chose) {
          continue;
        }
        const res = await fetchPokemon(randomNum);
        cardList.push(res);
        chosenIds.push(randomNum);
      }
      setCards(cardList);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [resetFlag]);

  function randomizeArray() {
    // Create copy of Cards Array
    const cardsCopy = [...cards];

    // Randomize items within the array with Fisher-Yates algorithm
    for (let i = cardsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cardsCopy[i];
      cardsCopy[i] = cardsCopy[j];
      cardsCopy[j] = temp;
    }

    setCards(cardsCopy);
  }

  function checkScore(e) {
    const copyList = [...trackedList];
    const name = e.target.closest("button").id;
    const wasClicked = copyList.find((card) => card === name);
    if (!wasClicked) {
      copyList.push(name);
      setTrackedList(copyList);
      setCurrentScore(currentScore + 1);
    } else {
      // Reset everything
      setFinish(true);
    }
  }

  function reset() {
    setTrackedList([]);
    setCurrentScore(0);
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    setFinish(false);
    setLoading(true);
    setResetFlag(!resetFlag);
  }

  function handleClick(e) {
    checkScore(e);
    randomizeArray();
  }

  return (
    <>
      <SiteHeader
        currentScore={currentScore}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
      {finish && (
        <Modal
          reset={reset}
          numCards={numCards}
          currentScore={currentScore}
        ></Modal>
      )}
      <MemoryCards loading={loading} cards={cards} handleClick={handleClick} />
    </>
  );
}

export default App;
