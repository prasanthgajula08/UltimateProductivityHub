import React, { useState } from 'react';
import { Play, Pause, Volume2, Music, Waves } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import useSound from 'use-sound';

interface Track {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
}

const TRACKS: Track[] = [
  {
    id: 'rain',
    name: 'Rain Sounds',
    icon: <Waves className="w-5 h-5" />,
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-rain-and-thunder-storm-2390.mp3'
  },
  {
    id: 'ambient',
    name: 'Ambient Music',
    icon: <Music className="w-5 h-5" />,
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-ethereal-fairy-win-sound-2019.mp3'
  },
  {
    id: 'nature',
    name: 'Nature Sounds',
    icon: <Waves className="w-5 h-5" />,
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3'
  }
];

const FocusMusic: React.FC = () => {
  const [volume, setVolume] = useState(50);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { stop }] = useSound(activeTrack?.url || '', {
    volume: volume / 100,
    loop: true,
  });

  const togglePlay = (track: Track) => {
    if (activeTrack?.id === track.id) {
      if (isPlaying) {
        stop();
        setIsPlaying(false);
      } else {
        play();
        setIsPlaying(true);
      }
    } else {
      stop();
      setActiveTrack(track);
      play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-8">
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

      <div className="grid gap-4">
        {TRACKS.map(track => (
          <button
            key={track.id}
            onClick={() => togglePlay(track)}
            className={`p-6 rounded-lg transition-all duration-300 flex items-center justify-between
                     ${activeTrack?.id === track.id
                       ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
                       : 'bg-white/5 hover:bg-white/10'
                     }
                     group relative overflow-hidden`}
          >
            <div className="flex items-center gap-4">
              <div className={`text-purple-400 transition-transform duration-300
                           ${activeTrack?.id === track.id && isPlaying ? 'animate-pulse' : ''}`}>
                {track.icon}
              </div>
              <span className="font-bold">{track.name}</span>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center
                         bg-gradient-to-r from-purple-500/10 to-pink-500/10
                         group-hover:from-purple-500/20 group-hover:to-pink-500/20
                         transition-all duration-300`}>
              {activeTrack?.id === track.id && isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                          group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                          transition-all duration-300" />
          </button>
        ))}
      </div>

      <div className="text-center text-sm text-gray-400">
        Select a track and adjust the volume to create your perfect focus environment
      </div>
    </div>
  );
};

export default FocusMusic;