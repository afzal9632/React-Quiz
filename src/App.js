import { useEffect, useReducer } from "react";
import "./App.css";
import Error from "./components/Error";
import Finished from "./components/Finished";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Main from "./components/Main";
import Progress from "./components/Progress";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  countDown: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        countDown: action.payload.length * 30,
      };
    case "error":
      return { ...state, status: action.type };
    case "active":
      return { ...state, status: action.type };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        status: "ready",
        questions: state.questions,
      };
    case "timer":
      return {
        ...state,
        countDown: state.countDown - 1,
        status: state.countDown === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown Action");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, countDown },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const totalPoints = questions.reduce(
    (accumulator, currValue) => accumulator + currValue.points,
    0
  );

  useEffect(() => {
    fetch("https://react-quiz-json-server-z675.onrender.com/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "active" && (
          <Progress
            index={index}
            answer={answer}
            numQuestions={numQuestions}
            points={points}
            totalPoints={totalPoints}
          />
        )}
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
            <Timer dispatch={dispatch} countDown={countDown} />
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
