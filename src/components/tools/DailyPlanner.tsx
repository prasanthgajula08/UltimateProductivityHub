import React, { useState } from 'react';
import { Plus, Trash2, Clock, ChevronUp, ChevronDown } from 'lucide-react';

interface PlannerItem {
  id: string;
  time: string;
  task: string;
}

const DailyPlanner: React.FC = () => {
  const [items, setItems] = useState<PlannerItem[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const periods = ['AM', 'PM'];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const formattedTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    const newItem: PlannerItem = {
      id: crypto.randomUUID(),
      time: formattedTime,
      task: newTask,
    };

    const updatedItems = [...items, newItem].sort((a, b) => {
      const timeA = new Date(`2000/01/01 ${a.time}`).getTime();
      const timeB = new Date(`2000/01/01 ${b.time}`).getTime();
      return timeA - timeB;
    });
    
    setItems(updatedItems);
    setNewTask('');
    setShowTimePicker(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const TimePickerSection = ({ 
    values, 
    selected, 
    onChange,
    showGradient = true
  }: { 
    values: string[], 
    selected: string, 
    onChange: (value: string) => void,
    showGradient?: boolean
  }) => (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => {
          const currentIndex = values.indexOf(selected);
          const nextIndex = (currentIndex + 1) % values.length;
          onChange(values[nextIndex]);
        }}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <ChevronUp size={16} />
      </button>
      <div className={`text-2xl font-bold tracking-wider ${
        showGradient 
          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text'
          : 'text-purple-300'
      }`}>
        {selected}
      </div>
      <button
        onClick={() => {
          const currentIndex = values.indexOf(selected);
          const prevIndex = (currentIndex - 1 + values.length) % values.length;
          onChange(values[prevIndex]);
        }}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddItem} className="flex gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTimePicker(!showTimePicker)}
            className="min-w-[140px] px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                     hover:bg-white/[0.15] hover:border-white/20
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                     transition-all duration-300 text-white flex items-center gap-2"
          >
            <Clock size={16} className="text-purple-400" />
            <span className="text-xl font-bold tracking-wider">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                {selectedHour}:{selectedMinute}
              </span>
              <span className="text-purple-300 ml-1">{selectedPeriod}</span>
            </span>
          </button>

          {showTimePicker && (
            <div className="absolute top-full mt-2 bg-[#1A1B26] border border-white/10 
                          rounded-lg p-4 shadow-xl z-50 flex gap-6 items-center">
              <TimePickerSection
                values={hours}
                selected={selectedHour}
                onChange={setSelectedHour}
              />
              <div className="text-3xl font-bold text-purple-300 -mt-1">:</div>
              <TimePickerSection
                values={minutes}
                selected={selectedMinute}
                onChange={setSelectedMinute}
              />
              <TimePickerSection
                values={periods}
                selected={selectedPeriod}
                onChange={setSelectedPeriod}
                showGradient={false}
              />
            </div>
          )}
        </div>

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                   focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                   placeholder-gray-500 text-white backdrop-blur-sm transition-all
                   hover:bg-white/[0.15] hover:border-white/20"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      </form>

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No tasks planned for today
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 
                       transition-all duration-300 group relative overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-purple-400" />
                <span className="text-lg font-bold tracking-wider">
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                    {item.time.split(' ')[0]}
                  </span>
                  <span className="text-purple-300 ml-1">{item.time.split(' ')[1]}</span>
                </span>
              </div>
              <span className="flex-1 text-white/90">{item.task}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 
                         transition-all duration-300 p-1 rounded-lg hover:bg-white/5"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyPlanner;