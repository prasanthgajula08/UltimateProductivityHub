import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(300);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const adjustTime = (seconds: number) => {
    const newDuration = Math.max(0, Math.min(3600, duration + seconds));
    setDuration(newDuration);
    setTimeLeft(newDuration);
  };

  const reset = () => {
    setIsActive(false);
    setTimeLeft(duration);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / duration) * 100;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
        
        <div className="relative text-8xl font-bold tracking-wider">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {String(minutes).padStart(2, '0')}
          </span>
          <span className="text-purple-300">:</span>
          <span className="text-purple-300">
            {String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => adjustTime(-60)}
          className="w-10 h-10 flex items-center justify-center rounded-xl
                   bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden"
        >
          <Minus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
        <span className="text-lg text-gray-400 w-20 text-center">
          {Math.floor(duration / 60)} min
        </span>
        <button
          onClick={() => adjustTime(60)}
          className="w-10 h-10 flex items-center justify-center rounded-xl
                   bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className="w-12 h-12 flex items-center justify-center rounded-xl
                   bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden"
        >
          {isActive ? (
            <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
        <button
          onClick={reset}
          className="w-12 h-12 flex items-center justify-center rounded-xl
                   bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden"
        >
          <RotateCcw className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      </div>

      <Progress.Root 
        className="relative overflow-hidden bg-white/5 rounded-full w-full h-1"
        value={progress}
      >
        <Progress.Indicator
          className="bg-gradient-to-r from-pink-500 to-purple-500 w-full h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  );
}

export default Timer;