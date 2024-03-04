import { useState, useRef, useEffect } from "react";

function StopWatch() {
  const [startClock, setStartClock] = useState(2);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timeElapsedRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (startClock < 2) {
      intervalRef.current = setInterval(() => {
        timeElapsedRef.current += 100;
        setTimeElapsed(timeElapsedRef.current);
      }, 100);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startClock]);

  function startWatch() {
    if (startClock) {
      setStartClock(0);
    } else {
      setStartClock(1);
    }
  }

  function stopWatch() {
    clearInterval(intervalRef.current);
  }

  function resetWatch() {
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    timeElapsedRef.current = 0;
  }

  function padding(value) {
    return String(value).padStart(2, "0");
  }

  function formatTime(time) {
    minutes = Math.floor(time / (1000 * 60));
    seconds = Math.floor((time - minutes * 60 * 1000) / 1000);
    milliseconds = (time - seconds * 1000) / 10;

    return `${padding(minutes)}:${padding(seconds)}:${padding(milliseconds)}`;
  }

  return (
    <div className="stop-watch">
      <div className="stop-watch-text">{formatTime(timeElapsed)}</div>
      <div className="stop-watch-actions">
        <button onClick={startWatch} className="start-btn">
          Start
        </button>
        <button onClick={stopWatch} className="stop-btn">
          Stop
        </button>
        <button onClick={resetWatch} className="reset-btn">
          Reset Clock
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
