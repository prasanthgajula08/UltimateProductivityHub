import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

interface Event {
  id: string;
  date: string;
  title: string;
  color: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const colors = [
    'bg-purple-500',
    'bg-pink-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500'
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !newEventTitle.trim()) return;

    const newEvent: Event = {
      id: crypto.randomUUID(),
      date: selectedDate.toISOString(),
      title: newEventTitle,
      color: selectedColor
    };

    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setShowEventForm(false);
    setSelectedDate(null);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      new Date(event.date).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 
                      text-transparent bg-clip-text">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm text-gray-400 py-2">
            {day}
          </div>
        ))}
        
        {monthDays.map(day => {
          const dayEvents = getEventsForDate(day);
          return (
            <div
              key={day.toISOString()}
              onClick={() => {
                setSelectedDate(day);
                setShowEventForm(true);
              }}
              className={`aspect-square p-2 rounded-lg transition-all duration-300 cursor-pointer
                        relative group overflow-hidden
                        ${isSameMonth(day, currentDate)
                          ? 'hover:bg-white/10'
                          : 'text-gray-600'
                        }
                        ${isToday(day) && 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'}
                        ${selectedDate?.toDateString() === day.toDateString() && 
                          'ring-2 ring-purple-500/50'}`}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              <div className="absolute bottom-1 left-1 right-1 flex gap-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    className={`h-1 rounded-full ${event.color} opacity-75`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showEventForm && selectedDate && (
        <div className="space-y-4 p-4 rounded-lg bg-white/5">
          <h3 className="font-bold text-lg">
            Add Event for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          <form onSubmit={addEvent} className="space-y-4">
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event title..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                       placeholder-gray-500"
            />
            <div className="flex gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${color} transition-transform
                            ${selectedColor === color ? 'scale-110 ring-2 ring-white' : ''}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10
                         hover:from-purple-500/20 hover:to-pink-500/20
                         transition-all duration-300 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Event
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEventForm(false);
                  setSelectedDate(null);
                }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Calendar;