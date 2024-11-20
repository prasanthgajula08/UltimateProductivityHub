import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import useSound from 'use-sound';

const MEDITATION_SOUNDS = [
  { id: 'rain', name: 'Rain', url: 'https://assets.mixkit.co/sfx/preview/mixkit-rain-and-thunder-storm-2390.mp3' },
  { id: 'waves', name: 'Ocean Waves', url: 'https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-loop-1196.mp3' },
  { id: 'forest', name: 'Forest', url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3' },
];

const DURATIONS = [
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
  { value: 20, label: '20 min' },
];

const Meditation: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [volume, setVolume] = useState(50);
  const [selectedSound, setSelectedSound] = useState(MEDITATION_SOUNDS[0]);
  
  const [play, { stop }] = useSound(selectedSound.url, {
    volume: volume / 100,
    loop: true,
  });

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      stop();
    }
    return () => {
      clearInterval(interval);
      stop();
    };
  }, [isActive, timeLeft, stop]);

  const toggleMeditation = () => {
    setIsActive(!isActive);
    if (!isActive) {
      play();
    } else {
      stop();
    }
  };

  const resetMeditation = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
    stop();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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

      <div className="flex gap-2">
        {DURATIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => {
              setDuration(value);
              setTimeLeft(value * 60);
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-300
                      ${duration === value
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center gap-4">
          <Volume2 size={20} className="text-purple-400" />
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[volume]}
            onValueChange={([value]) => setVolume(value)}
            max={100}
            step={1}
          >
            <Slider.Track className="bg-white/10 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-gradient-to-r from-pink-500 to-purple-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white rounded-full hover:bg-purple-50 focus:outline-none
                       transition-transform duration-300 hover:scale-110"
              aria-label="Volume"
            />
          </Slider.Root>
          <span className="w-12 text-right text-gray-400">{volume}%</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {MEDITATION_SOUNDS.map((sound) => (
            <button
              key={sound.id}
              onClick={() => setSelectedSound(sound)}
              className={`p-3 rounded-lg transition-all duration-300
                        ${selectedSound.id === sound.id
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                        }`}
            >
              {sound.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggleMeditation}
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
          onClick={resetMeditation}
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
    </div>
  );
};

export default Meditation;