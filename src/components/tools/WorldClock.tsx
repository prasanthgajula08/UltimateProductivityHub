import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Globe, Search } from 'lucide-react';

interface TimeZone {
  id: string;
  name: string;
  offset: number;
  label: string;
}

const POPULAR_TIMEZONES: TimeZone[] = [
  { id: 'utc', name: 'UTC', offset: 0, label: 'Coordinated Universal Time' },
  { id: 'est', name: 'EST', offset: -5, label: 'Eastern Time' },
  { id: 'pst', name: 'PST', offset: -8, label: 'Pacific Time' },
  { id: 'gmt', name: 'GMT', offset: 0, label: 'Greenwich Mean Time' },
  { id: 'ist', name: 'IST', offset: 5.5, label: 'India Standard Time' },
  { id: 'jst', name: 'JST', offset: 9, label: 'Japan Standard Time' },
  { id: 'aest', name: 'AEST', offset: 10, label: 'Australian Eastern Time' },
  { id: 'cet', name: 'CET', offset: 1, label: 'Central European Time' },
];

const WorldClock: React.FC = () => {
  const [selectedTimezones, setSelectedTimezones] = useState<TimeZone[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredTimezones = POPULAR_TIMEZONES.filter(tz =>
    !selectedTimezones.find(selected => selected.id === tz.id) &&
    (tz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tz.label.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addTimezone = (timezone: TimeZone) => {
    setSelectedTimezones([...selectedTimezones, timezone]);
    setShowSearch(false);
    setSearchTerm('');
  };

  const removeTimezone = (id: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.id !== id));
  };

  const getTimeInTimezone = (offset: number) => {
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    return new Date(utc + offset * 3600000);
  };

  return (
    <div className="space-y-6">
      {!showSearch ? (
        <button
          onClick={() => setShowSearch(true)}
          className="w-full p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 flex items-center justify-center gap-2
                   group relative overflow-hidden"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Add Time Zone</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search time zones..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                       placeholder-gray-500 transition-all
                       hover:bg-white/[0.15] hover:border-white/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <div className="grid gap-2 max-h-48 overflow-y-auto">
            {filteredTimezones.map(timezone => (
              <button
                key={timezone.id}
                onClick={() => addTimezone(timezone)}
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300
                         text-left flex items-center justify-between"
              >
                <div>
                  <div className="font-bold">{timezone.name}</div>
                  <div className="text-sm text-gray-400">{timezone.label}</div>
                </div>
                <Plus size={16} className="text-purple-400" />
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setShowSearch(false);
              setSearchTerm('');
            }}
            className="w-full p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="space-y-4">
        {selectedTimezones.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No time zones added
          </div>
        ) : (
          selectedTimezones.map(timezone => {
            const time = getTimeInTimezone(timezone.offset);
            return (
              <div
                key={timezone.id}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 
                         transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-purple-400" />
                    <span className="font-bold">{timezone.name}</span>
                    <span className="text-sm text-gray-400">({timezone.label})</span>
                  </div>
                  <button
                    onClick={() => removeTimezone(timezone.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg 
                             text-red-500 hover:bg-white/10 transition-all duration-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="text-4xl font-bold tracking-wider">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 
                                text-transparent bg-clip-text">
                    {time.toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {time.toLocaleDateString(undefined, { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WorldClock;