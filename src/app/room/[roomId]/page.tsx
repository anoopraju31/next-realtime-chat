'use client';

import { useEffect, useState, type FC } from 'react';
import { useParams } from 'next/navigation';
import { MdDelete } from 'react-icons/md';

type CopyStatus = 'COPY' | 'COPIED';

const formatTimeRemaining = (timeRemaining: number) => {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;

  return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
};

const RoomPage: FC = () => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('COPY');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(121);
  const params = useParams();
  const roomId = params.roomId;

  useEffect(() => {}, []);

  const handleCopyLink = () => {
    const url = window.location.href;

    navigator.clipboard.writeText(url);
    setCopyStatus('COPIED');

    setTimeout(() => setCopyStatus('COPY'), 2000);
  };

  const copyButtonText = copyStatus === 'COPY' ? 'Copy' : 'Copied';

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 p-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase"> Room ID </span>

            <div className="flex items-center gap-2">
              <span className="font-bold text-green-500"> {roomId} </span>

              <button
                onClick={handleCopyLink}
                className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200"
              >
                {copyButtonText}
              </button>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-800" />

          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase"> Self-Destruct </span>
            <span
              className={`flex items-center gap-2 text-sm font-bold ${timeRemaining !== null && timeRemaining < 60 ? 'text-red-500' : 'text-amber-500'}`}
            >
              {' '}
              {timeRemaining !== null ? formatTimeRemaining(timeRemaining) : '-- : --'}{' '}
            </span>
          </div>
        </div>

        <button className="group flex items-center gap-2 rounded bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-400 transition-all hover:bg-red-600 hover:text-white disabled:opacity-50">
          <MdDelete className="group-hover:animate-pulse" />
          DESTROY NOW
        </button>
      </header>
    </main>
  );
};

export default RoomPage;
