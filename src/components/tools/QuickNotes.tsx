import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Note } from '../../types';
import ReactMarkdown from 'react-markdown';

const QuickNotes: React.FC = () => {
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { notes, addNote, removeNote, updateNote } = useStore();

  useEffect(() => {
    if (editingId && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editingId]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const note: Note = {
      id: crypto.randomUUID(),
      content: newNote,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addNote(note);
    setNewNote('');
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = (id: string) => {
    updateNote(id, editContent);
    setEditingId(null);
    setEditContent('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    if (editingId) {
      setEditContent(textarea.value);
    } else {
      setNewNote(textarea.value);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddNote} className="flex gap-2">
        <div className="relative flex-1">
          <textarea
            value={newNote}
            onChange={handleTextareaChange}
            placeholder="Write a note... (Supports Markdown)"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                     placeholder-gray-500 text-white backdrop-blur-sm transition-all
                     hover:bg-white/[0.15] hover:border-white/20 resize-none min-h-[100px]"
            style={{ height: 'auto' }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            Markdown supported
          </div>
        </div>
        <button
          type="submit"
          className="px-4 self-start rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10
                   hover:from-purple-500/20 hover:to-pink-500/20
                   transition-all duration-300 hover:scale-105
                   group relative overflow-hidden h-[46px]"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      </form>

      <div className="grid gap-4">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No notes yet. Start writing!
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="group relative p-4 rounded-lg bg-white/5 hover:bg-white/10 
                       transition-all duration-300 space-y-2"
            >
              {editingId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    ref={textareaRef}
                    value={editContent}
                    onChange={handleTextareaChange}
                    className="w-full bg-white/5 rounded-lg p-2 focus:outline-none 
                             focus:ring-2 focus:ring-purple-500/50 resize-none"
                    style={{ minHeight: '100px' }}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => saveEdit(note.id)}
                      className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 
                               text-green-500 transition-all duration-300"
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 
                               text-red-500 transition-all duration-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/10">
                    <span className="text-sm text-gray-400">
                      {new Date(note.updatedAt).toLocaleDateString()} at{' '}
                      {new Date(note.updatedAt).toLocaleTimeString()}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditing(note)}
                        className="p-2 rounded-lg hover:bg-white/10 text-blue-400 
                                 transition-all duration-300"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => removeNote(note.id)}
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

export default QuickNotes;