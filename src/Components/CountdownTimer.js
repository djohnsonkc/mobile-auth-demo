import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CountdownTimer = ({ start, seconds, onFinish }) => {
  const [currentValue, setCurrentValue] = useState(start);

  useEffect(() => {
    if (seconds <= 0) return; // Ensure interval is valid

    const interval = setInterval(() => {
      setCurrentValue((prevValue) => {
        if (prevValue > 0) {
          return prevValue - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, seconds * 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [seconds]);

  
  useEffect(() => {

    if(currentValue <= 0) {
        console.log("firing onFinish")
        onFinish()
    }
  }, [currentValue]);

  return (
    <div>
      <p>Token Expires In: {currentValue}</p>
    </div>
  );
};

CountdownTimer.propTypes = {
  start: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default CountdownTimer;
