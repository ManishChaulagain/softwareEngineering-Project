import React, { useState, useEffect } from 'react';

const TypeScript = () => {
  const words = ['Want.', 'Love.', 'Need.', 'See.'];
  const staticText = 'Buy what you ';
  const [displayedWord, setDisplayedWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        setDisplayedWord(currentWord.substring(0, charIndex + 1));
        timeout = setTimeout(() => setCharIndex(charIndex + 1), 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1000);
      }
    } else {
      if (charIndex > 0) {
        setDisplayedWord(currentWord.substring(0, charIndex - 1));
        timeout = setTimeout(() => setCharIndex(charIndex - 1), 50);
      } else {
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % words.length);
        timeout = setTimeout(() => setCharIndex(0), 200);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <span className="typewriter-text">
      Buy what you <span className="changing-word">{displayedWord}</span>
    </span>
  );
};

export default TypeScript;
