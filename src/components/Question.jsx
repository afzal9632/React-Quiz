import React, { useEffect } from "react";

const Question = ({ question, dispatch, answer, index, numQuestions }) => {


    if(index<numQuestions-1)
  return (
    <div>
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
     {answer!==null && <button onClick={()=>dispatch({type:"nextQuestion"})}>Next question</button>}
    </div>
  );

  if(index===numQuestions-1)
  return (
    <div>
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
     {answer!==null && <button onClick={()=>dispatch({type:"finished"})}>Finish</button>}
    </div>
  );
};

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((opt, index) => (
        <button
          className={`${answer === index ? "selected" : ""}
          ${
            hasAnswered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={opt}
          disabled={hasAnswered}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Question;
