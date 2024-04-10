import React from "react";

const Finished = ({ points, totalPoints, highScore,dispatch }) => {
  const percentage = Math.ceil((points / totalPoints) * 100);

  return (
    <div>
      <p>
        You scored {points} out of {totalPoints} ({percentage}%)
      </p>
      <p>HighScore: {highScore}</p>
      <button onClick={()=>dispatch({type:"restart"})} >Restart Quiz</button>
    </div>
  );
};

export default Finished;
