'use client';

import { useEffect, useState, type FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import { client } from '@/lib/client';

const ANIMALS = ['wolf', 'fox', 'cat', 'dog', 'rabbit', 'bear', 'lion', 'tiger', 'elephant', 'monkey'];
const STORAGE_KEY = 'chat_username';

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`;
};

const HomePage: FC = () => {
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

  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();

      return await res.data;
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-green-500"> {'>'} private_chat </h1>
          <p className="text-sm text-zinc-500"> A private, self destructing chat room.</p>
        </div>

        <div className="border border-zinc-800 bg-zinc-950/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="" className="flex items-center text-zinc-500">
                Youe Identity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 border border-zinc-800 bg-zinc-950 p-3 font-mono text-sm text-zinc-400">
                  {username}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                createRoom();
              }}
              className="mt-2 w-full cursor-pointer bg-zinc-100 p-3 text-sm font-bold text-black transition-colors hover:bg-zinc-50 hover:text-black disabled:opacity-50"
            >
              Create Secure Room
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
