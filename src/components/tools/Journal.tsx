import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, Smile, Frown, Meh } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { JournalEntry } from '../../types';
import ReactMarkdown from 'react-markdown';

const MOODS = [
  { icon: Smile, label: 'Good', color: 'text-green-500' },
  { icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
  { icon: Frown, label: 'Bad', color: 'text-red-500' },
];

const Journal: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { journal, addJournalEntry, updateJournalEntry, removeJournalEntry } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date().toISOString(),
      mood: selectedMood || undefined,
    };

    addJournalEntry(entry);
    setContent('');
    setSelectedMood(null);
    setShowForm(false);
  };

  const handleEdit = (id: string, content: string) => {
    updateJournalEntry(id, content);
    setEditingId(null);
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
          <span>Write Journal Entry</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 mb-4">
            {MOODS.map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                type="button"
                onClick={() => setSelectedMood(label)}
                className={`flex-1 p-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
                         ${selectedMood === label
                           ? `${color} bg-white/10`
                           : 'text-gray-400 hover:text-white hover:bg-white/5'
                         }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts... (Supports Markdown)"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                     placeholder-gray-500 min-h-[200px] resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setContent('');
                setSelectedMood(null);
              }}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10
                       hover:from-purple-500/20 hover:to-pink-500/20
                       transition-all duration-300"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {journal.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No journal entries yet. Start writing!
          </div>
        ) : (
          journal.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 
                       transition-all duration-300 space-y-4"
            >
              {editingId === entry.id ? (
                <div className="space-y-2">
                  <textarea
                    value={entry.content}
                    onChange={(e) => updateJournalEntry(entry.id, e.target.value)}
                    className="w-full bg-white/5 rounded-lg p-2 focus:outline-none 
                             focus:ring-2 focus:ring-purple-500/50 min-h-[100px] resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 
                               text-gray-400 transition-all duration-300"
                    >
                      <X size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(entry.id, entry.content)}
                      className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 
                               text-green-500 transition-all duration-300"
                    >
                      <Save size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{entry.content}</ReactMarkdown>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">
                        {new Date(entry.createdAt).toLocaleDateString()} at{' '}
                        {new Date(entry.createdAt).toLocaleTimeString()}
                      </span>
                      {entry.mood && (
                        <span className={`flex items-center gap-1
                                     ${entry.mood === 'Good' ? 'text-green-500' :
                                       entry.mood === 'Bad' ? 'text-red-500' :
                                       'text-yellow-500'}`}
                        >
                          {entry.mood === 'Good' ? <Smile size={16} /> :
                           entry.mood === 'Bad' ? <Frown size={16} /> :
                           <Meh size={16} />}
                          {entry.mood}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(entry.id)}
                        className="p-2 rounded-lg hover:bg-white/10 text-blue-400 
                                 transition-all duration-300"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => removeJournalEntry(entry.id)}
                        className="p-2 rounded-lg hover:bg-white/10 text-red-400 
                                 transition-all duration-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;