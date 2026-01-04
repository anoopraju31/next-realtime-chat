'use client';

import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

const ANIMALS = ['wolf', 'fox', 'cat', 'dog', 'rabbit', 'bear', 'lion', 'tiger', 'elephant', 'monkey'];
const STORAGE_KEY = 'chat_username';

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`;
};

export const useUsername = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const main = () => {
      const storedUsername = localStorage.getItem(STORAGE_KEY);

      if (storedUsername) {
        setUsername(storedUsername);
        return;
      }

      const newUsername = generateUsername();

      setUsername(newUsername);
      localStorage.setItem(STORAGE_KEY, newUsername);
    };

    main();
  }, []);

  return username;
};
