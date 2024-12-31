import "./EmojiGenerator.scss";
import { useEffect, useState } from "react";

const EmojiGenerator = ({ emojis, count = 50 }) => {
  const [emojiElements, setEmojiElements] = useState([]);

  useEffect(() => {
    const generateEmojis = () => {
      return Array.from({ length: count }).map((_, index) => ({
        id: index,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 5 + 3,
      }));
    };
    setEmojiElements(generateEmojis());
  }, [emojis, count]);

  return (
    <div className="EmojiGenerator">
      {emojiElements.map(({ id, emoji, left, duration, delay }) => (
        <span
          key={id}
          className="emoji"
          style={{
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiGenerator;
