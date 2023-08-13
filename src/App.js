import { useEffect, useRef, useState } from 'react';
function App() {
  let interval;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  let hours = Math.floor(inputValue / 60 / 60);
  hours = hours < 10 ? '0' + hours : hours;

  let seconds = Math.floor(inputValue % 60);
  seconds = seconds < 10 ? '0' + seconds : seconds;
  let minutes = Math.floor(inputValue / 60 - hours * 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const substractTime = () => {
    setInputValue((prev) => prev - 1);
  };
  useEffect(() => {
    if (timerActive && inputValue > 0) {
      clearInterval(interval);
      interval = setInterval(substractTime, 1000);
    } else {
      setTimerActive(false);
      clearInterval(interval);
    }
    inputRef.current.value = ''
    return () => clearInterval(interval);
  }, [inputValue, timerActive]);
  return (
    <div>
      <input
        ref={inputRef}
        placeholder="Seconds"
        type="text"
        value={inputValue}
        onChange={(e) => !isNaN(+e.target.value) && setInputValue(+e.target.value)}
      />
      <button onClick={() => setTimerActive(!timerActive)}>{timerActive ? 'Stop' : 'Start'}</button>
      <br />
      <br />
      <span>{`${hours}:${minutes}:${seconds}`}</span>
    </div>
  );
}

export default App;
