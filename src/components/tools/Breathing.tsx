import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

interface BreathingPattern {
  name: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
}

const PATTERNS: BreathingPattern[] = [
  { name: '4-7-8', inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
  { name: 'Box', inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
  { name: 'Deep Calm', inhale: 5, hold1: 5, exhale: 7, hold2: 0 },
];

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

const Breathing: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(PATTERNS[0]);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [timeLeft, setTimeLeft] = useState(currentPattern.inhale);

  const getTotalTime = () => {
    return currentPattern.inhale + currentPattern.hold1 + 
           currentPattern.exhale + currentPattern.hold2;
  };

  const getProgress = () => {
    const total = getTotalTime();
    let elapsed = 0;
    
    switch (phase) {
      case 'hold1':
        elapsed = currentPattern.inhale;
        break;
      case 'exhale':
        elapsed = currentPattern.inhale + currentPattern.hold1;
        break;
      case 'hold2':
        elapsed = currentPattern.inhale + currentPattern.hold1 + currentPattern.exhale;
        break;
      default:
        elapsed = 0;
    }
    
    const currentProgress = ((elapsed + (currentPattern[phase] - timeLeft)) / total) * 100;
    return Math.min(100, Math.max(0, currentProgress));
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Inhale';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Exhale';
      case 'hold2': return 'Hold';
    }
  };

  useEffect(() => {
    let interval: number;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time > 1) return time - 1;
          
          // Move to next phase
          switch (phase) {
            case 'inhale':
              setPhase('hold1');
              return currentPattern.hold1;
            case 'hold1':
              setPhase('exhale');
              return currentPattern.exhale;
            case 'exhale':
              if (currentPattern.hold2 > 0) {
                setPhase('hold2');
                return currentPattern.hold2;
              }
              setPhase('inhale');
              return currentPattern.inhale;
            case 'hold2':
              setPhase('inhale');
              return currentPattern.inhale;
            default:
              return currentPattern.inhale;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase, currentPattern]);

  const reset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(currentPattern.inhale);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
        
        <div className="relative text-8xl font-bold tracking-wider">
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {timeLeft}
          </span>
        </div>
      </div>

      <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 
                    text-transparent bg-clip-text">
        {getPhaseText()}
      </div>

      <div className="flex gap-2">
        {PATTERNS.map(pattern => (
          <button
            key={pattern.name}
            onClick={() => {
              setCurrentPattern(pattern);
              reset();
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-300
                      ${currentPattern.name === pattern.name
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
          >
            {pattern.name}
          </button>
        ))}
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
        value={getProgress()}
      >
        <Progress.Indicator
          className="bg-gradient-to-r from-pink-500 to-purple-500 w-full h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - getProgress()}%)` }}
        />
      </Progress.Root>
    </div>
  );
};

export default Breathing;