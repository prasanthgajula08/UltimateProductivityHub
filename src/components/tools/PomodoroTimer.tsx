import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import * as Progress from '@radix-ui/react-progress';

const PomodoroTimer: React.FC = () => {
  const { pomodoro, startPomodoro, pausePomodoro, resetPomodoro, tick } = useStore();

  useEffect(() => {
    let interval: number;
    if (pomodoro.isActive) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomodoro.isActive, tick]);

  const minutes = Math.floor(pomodoro.timeLeft / 60);
  const seconds = pomodoro.timeLeft % 60;
  const progress = (pomodoro.timeLeft / (pomodoro.isBreak ? pomodoro.breakDuration : pomodoro.workDuration)) * 100;

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

      <div className="text-lg text-gray-400">
        {pomodoro.isBreak ? 'Break Time' : 'Focus Time'}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => pomodoro.isActive ? pausePomodoro() : startPomodoro()}
          className="w-12 h-12 flex items-center justify-center rounded-xl
                   bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden"
        >
          {pomodoro.isActive ? (
            <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
        <button
          onClick={resetPomodoro}
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
};

export default PomodoroTimer;