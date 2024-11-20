import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

interface Lap {
  id: string;
  time: number;
  delta: number;
}

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleLap = () => {
    const lastLap = laps[0]?.time || 0;
    const newLap: Lap = {
      id: crypto.randomUUID(),
      time,
      delta: time - lastLap
    };
    setLaps([newLap, ...laps]);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return {
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      milliseconds: String(milliseconds).padStart(2, '0')
    };
  };

  const { minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
        
        <div className="relative text-8xl font-bold tracking-wider">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {minutes}:{seconds}
          </span>
          <span className="text-4xl text-purple-300">.{milliseconds}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="w-12 h-12 flex items-center justify-center rounded-xl
                   bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden"
        >
          {isRunning ? (
            <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
        <button
          onClick={handleLap}
          disabled={!isRunning}
          className="w-12 h-12 flex items-center justify-center rounded-xl
                   bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Flag className="w-5 h-5 group-hover:scale-110 transition-transform" />
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

      {laps.length > 0 && (
        <div className="w-full space-y-2 max-h-[300px] overflow-y-auto">
          {laps.map((lap, index) => {
            const { minutes: lapMin, seconds: lapSec, milliseconds: lapMs } = formatTime(lap.delta);
            const { minutes: totalMin, seconds: totalSec, milliseconds: totalMs } = formatTime(lap.time);
            
            return (
              <div
                key={lap.id}
                className="flex justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 
                         transition-all duration-300"
              >
                <span className="text-gray-400">Lap {laps.length - index}</span>
                <span className="font-mono text-xl">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                    {lapMin}:{lapSec}
                  </span>
                  <span className="text-purple-300">.{lapMs}</span>
                </span>
                <span className="font-mono text-gray-400">
                  {totalMin}:{totalSec}.{totalMs}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Stopwatch;