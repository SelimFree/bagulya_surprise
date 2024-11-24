import { useEffect, useState } from "react";
import "./Counter.scss";

function Counter() {
  const startDate = new Date("2024-08-12");
  const [counter, setCounter] = useState();

  const getDayWord = (days) => {
    const remainder10 = days % 10;
    const remainder100 = days % 100;

    if (remainder100 >= 11 && remainder100 <= 14) {
      return `${days} дней`;
    }

    if (remainder10 === 1) {
      return `${days} день`;
    } else if (remainder10 >= 2 && remainder10 <= 4) {
      return `${days} дня`;
    } else {
      return `${days} дней`;
    }
  };

  useEffect(() => {
    const today = new Date();
    const diffInMilliseconds = today - startDate;

    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    setCounter(diffInDays);
  }, []);

  return (
    <div className="Counter">
      <h2 className="counter-text">А мы с тобой вместе уже  <span className="days">{getDayWord(counter)}</span> моя хорошая</h2>
    </div>
  );
}

export default Counter;
