import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Plus, Minus } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

const FocusTimer: React.FC = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(25);

  useEffect(() => {
    let interval: number;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(duration * 60);
  };

  const adjustDuration = (change: number) => {
    const newDuration = Math.max(1, Math.min(120, duration + change));
    setDuration(newDuration);
    setTime(newDuration * 60);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl font-mono font-bold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => adjustDuration(-5)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Minus size={20} />
          </button>
          <span className="w-16 text-center">{duration} min</span>
          <button
            onClick={() => adjustDuration(5)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2
                    ${isActive 
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-purple-500 hover:bg-purple-600'
                    }`}
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={20} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;