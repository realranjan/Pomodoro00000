import React from 'react';
import { useState, useEffect } from 'react';
import { Play, Settings } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="w-[400px] h-[600px] bg-[#1C2128] text-white p-6 font-sans">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold">Pal AI</h1>
        <Settings className="w-6 h-6 cursor-pointer" />
      </div>

      <div className="text-center mb-12">
        <div className="text-8xl font-bold mb-6">{formatTime(timeLeft)}</div>
        <div className="text-2xl">Ready to focus?</div>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={handleStart}
          className="flex items-center gap-2 bg-[#0A4B94] text-white px-8 py-3 rounded-full hover:bg-[#0A5AAA] transition-colors"
        >
          <Play className="w-5 h-5" />
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 border border-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          <Play className="w-5 h-5" />
          Reset
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <div className="text-center p-6 border border-white/20 rounded-lg">
          <div className="text-xl mb-2">5 min</div>
          <div className="text-gray-400">Short Break</div>
        </div>
        <div className="text-center p-6 border border-white/20 rounded-lg">
          <div className="text-xl mb-2">10 min</div>
          <div className="text-gray-400">Long Break</div>
        </div>
      </div>

      <div className="bg-[#2D333B] rounded-lg p-6">
        <h2 className="text-2xl mb-4">Tasks</h2>
        <button className="text-white/60 flex items-center gap-2">
          <span className="text-2xl">+</span> Add tasks
        </button>
      </div>
    </div>
  );
}

export default App;
