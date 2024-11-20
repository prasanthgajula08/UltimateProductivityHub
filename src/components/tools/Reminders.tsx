import React, { useState } from 'react';
import { Bell, Plus, Trash2, Calendar, Clock, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Reminder {
  id: string;
  title: string;
  datetime: string;
  completed: boolean;
  important: boolean;
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDateTime, setNewDateTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDateTime) return;

    const newReminder: Reminder = {
      id: crypto.randomUUID(),
      title: newTitle,
      datetime: newDateTime,
      completed: false,
      important: isImportant
    };

    setReminders([...reminders, newReminder].sort((a, b) => 
      new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    ));
    setNewTitle('');
    setNewDateTime('');
    setIsImportant(false);
    setShowForm(false);
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  return (
    <div className="space-y-6">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 flex items-center justify-center gap-2
                   group relative overflow-hidden"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Add Reminder</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      ) : (
        <form onSubmit={addReminder} className="space-y-4 p-4 rounded-lg bg-white/5">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Reminder title..."
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                     placeholder-gray-500 transition-all
                     hover:bg-white/[0.15] hover:border-white/20"
          />
          <input
            type="datetime-local"
            value={newDateTime}
            onChange={(e) => setNewDateTime(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                     text-white transition-all
                     hover:bg-white/[0.15] hover:border-white/20"
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsImportant(!isImportant)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                       ${isImportant
                         ? 'bg-yellow-500/20 text-yellow-500'
                         : 'bg-white/10 text-gray-400 hover:text-yellow-500'
                       }`}
            >
              <Star size={16} />
              Important
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10
                       hover:from-purple-500/20 hover:to-pink-500/20
                       transition-all duration-300 flex items-center gap-2"
            >
              Add Reminder
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No reminders set
          </div>
        ) : (
          reminders.map((reminder) => {
            const datetime = new Date(reminder.datetime);
            const isPast = datetime < new Date();
            
            return (
              <div
                key={reminder.id}
                className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300
                         ${reminder.completed
                           ? 'bg-white/5 hover:bg-white/10'
                           : reminder.important
                             ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/15 hover:to-pink-500/15'
                             : 'bg-white/5 hover:bg-white/10'
                         }
                         ${isPast && !reminder.completed ? 'border-l-4 border-red-500' : ''}`}
              >
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`p-2 rounded-full transition-colors
                           ${reminder.completed
                             ? 'bg-green-500/20 text-green-500'
                             : 'bg-white/10 text-gray-400 hover:text-green-500'
                           }`}
                >
                  <Bell size={16} />
                </button>
                <div className="flex-1">
                  <div className={reminder.completed ? 'line-through text-gray-400' : ''}>
                    {reminder.title}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={12} />
                    {datetime.toLocaleDateString()}
                    <Clock size={12} />
                    {datetime.toLocaleTimeString()}
                  </div>
                </div>
                {reminder.important && (
                  <Star size={16} className="text-yellow-500" />
                )}
                <button
                  onClick={() => removeReminder(reminder.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-white/10 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Reminders;