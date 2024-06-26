import React from 'react'

const StartScreen = ({numQuestions,dispatch}) => {
  return (
    <div>
        <h2>Welcome to React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery.</h3>
        <button onClick={()=>dispatch({type:"active"})}>Start Quiz</button>
    </div>
  )
}

export default StartScreen