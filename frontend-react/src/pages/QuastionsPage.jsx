import { useNavigate } from "react-router";
import { useSyncExternalStore } from "react";
import { store } from "../store/dataSet.store";
import { useEffect } from "react";
import { useState } from "react";
import { DataSetService } from "../services/dataSet/dataSet.service.remote";

export function QuestionsPage() {
  const navigate = useNavigate();
  const { dataForQuastions, currentQustion, currentQustionCopy, answer } =
    useSyncExternalStore(store.subscribe, store.getState);
  const currentState = store.getState();
  const [answerState, setAnwer] = useState({
    userAnswer: "",
    realAnswer: "",
    username: "",
  });

  const [isErrorMsg, setIsErrorMsg] = useState(false);
  const [quastionId, setQuastionId ] = useState(0)

  useEffect(() => {
    generateQuastion();
  }, []);

  function generateQuastion() {
    const idx = getRandomIntInclusive(0, dataForQuastions.length);
    const object = dataForQuastions[idx];

    let keys = Object.keys(object);
    const key1Idx = getRandomIntInclusive(0, keys.length - 1);
    const key2Idx = getRandomIntInclusive(0, keys.length - 1);
    const key3Idx = getRandomIntInclusive(0, keys.length - 1);

    const quastion = `When ${keys[key1Idx]} = ${object[keys[key1Idx]]} and ${keys[key2Idx]} = ${object[keys[key2Idx]]} what is ${keys[key3Idx]}`;

    store.setState({
      ...currentState,
      currentQustion: quastion,
      answer: object[keys[key3Idx]],
    });
  }

  function handleChange(ev) {
    const { name, value } = ev.target;
    setAnwer((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function checkAnswer(ev) {
    ev.preventDefault();
    if (answerState.userAnswer === answer) {
      DataSetService.save({ username: answerState.username, score: 1 });
    } else {
      setIsErrorMsg(true);
    }
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleClick() {
    if (!currentQustionCopy) {
      store.setState({ ...currentState, currentQustionCopy: currentQustion });
    }
    navigate("/");
  }

  return (
    <div className="quastions-page">
      <form onSubmit={checkAnswer}>
        <p>{currentQustionCopy ? currentQustionCopy : currentQustion}</p>

        <label htmlFor="answer">Your Answer</label>
        <input
          name="username"
          id="name"
          type="text"
          placeholder="Your Name"
          onChange={handleChange}
          value={answerState.username}
        />
        <label htmlFor="answer">Your Answer</label>
        <input
          name="userAnswer"
          id="answer"
          type="text"
          placeholder="Your answer"
          onChange={handleChange}
          value={answerState.userAnswer}
        />
        <button type="submit">Submit Your Answer</button>

        <div className="navigation-btns">
          <button onClick={handleClick}>To data Page</button>
          <button>Next Quastion</button>
        </div>
      </form>

      {isErrorMsg && (
        <div className="error-msg">"No matching result found. No point."</div>
      )}
    </div>
  );
}
