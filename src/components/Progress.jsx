import React from "react";

const Progress = ({ index, numQuestions, points, totalPoints ,answer}) => {
    // console.log("index",index)
  return (
    <div className="progress-bar">
      <progress value={answer===null ? index:index+1} max="15"></progress>
      <div>
        <span>
          {index+1}/{numQuestions}
        </span>
        <span>{points}/{totalPoints} points</span>
      </div>
    </div>
  );
};

export default Progress;
