import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';

const HabitTracker: React.FC = () => {
  const [newHabit, setNewHabit] = useState('');
  const { habits, addHabit, toggleHabitDay, removeHabit } = useStore();

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    addHabit(newHabit);
    setNewHabit('');
  };

  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddHabit} className="flex gap-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Habit</th>
              {weekDays.map((day) => (
                <th key={day.toISOString()} className="p-2 text-center">
                  {format(day, 'EEE')}
                </th>
              ))}
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id} className="group">
                <td className="p-2">{habit.name}</td>
                {weekDays.map((day) => {
                  const dateStr = format(day, 'yyyy-MM-dd');
                  return (
                    <td key={dateStr} className="p-2">
                      <button
                        onClick={() => toggleHabitDay(habit.id, dateStr)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                                  ${
                                    habit.dates[dateStr]
                                      ? 'bg-green-500'
                                      : 'bg-white/10 hover:bg-white/20'
                                  }`}
                      >
                        {habit.dates[dateStr] && <Check size={16} />}
                      </button>
                    </td>
                  );
                })}
                <td className="p-2">
                  <button
                    onClick={() => removeHabit(habit.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitTracker;