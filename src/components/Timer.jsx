import React, { useEffect } from "react";

const Timer = ({ countDown, dispatch }) => {
  const minute = Math.floor(countDown / 60);
  const sec = countDown % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    console.log("question mounted");

    const cleanup = () => clearInterval(id);

    return cleanup;
  }, []);

  return (
    <div>
      <span>
        {minute < 10 && 0}
        {minute}:{sec < 10 && 0}
        {sec}
      </span>
    </div>
  );
};

export default Timer;
