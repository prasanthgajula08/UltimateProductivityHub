import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, Circle, Calendar, Star, StarOff } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Task } from '../../types';

const TaskManager: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { tasks, addTask, toggleTask, removeTask } = useStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate || undefined,
      important: false
    };

    addTask(task);
    setNewTask('');
    setDueDate('');
    setShowDatePicker(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const toggleImportant = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = { ...task, important: !task.important };
      // Update task in store
      removeTask(taskId);
      addTask(updatedTask);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddTask} className="flex gap-2">
        <div className="relative flex-1 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                     placeholder-gray-500 text-white backdrop-blur-sm transition-all
                     hover:bg-white/[0.15] hover:border-white/20"
          />
          <button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                     hover:bg-white/[0.15] hover:border-white/20
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                     transition-all duration-300 text-white flex items-center gap-2"
          >
            <Calendar size={16} className="text-purple-400" />
            {dueDate ? (
              <span className="text-sm font-bold tracking-wider">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  {new Date(dueDate).toLocaleDateString()}
                </span>
              </span>
            ) : (
              <span className="text-sm text-gray-400">Due Date</span>
            )}
          </button>
          {showDatePicker && (
            <div className="absolute right-0 top-full mt-2 bg-[#1A1B26] border border-white/10 
                          rounded-lg p-4 shadow-xl z-50">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                         text-white"
              />
            </div>
          )}
        </div>
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

      <div className="flex gap-2 justify-center">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg transition-all duration-300
                      ${filter === f
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No tasks found
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden
                       ${task.completed 
                         ? 'bg-white/5 hover:bg-white/10' 
                         : task.important
                           ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/15 hover:to-pink-500/15'
                           : 'bg-white/5 hover:bg-white/10'
                       }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`text-lg transition-colors duration-300 ${
                  task.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                }`}
              >
                {task.completed ? (
                  <CheckCircle size={20} />
                ) : (
                  <Circle size={20} />
                )}
              </button>
              <span
                className={`flex-1 transition-all duration-300 ${
                  task.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {task.title}
              </span>
              {task.dueDate && (
                <span className="text-sm text-gray-400">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              <button
                onClick={() => toggleImportant(task.id)}
                className={`opacity-0 group-hover:opacity-100 transition-all duration-300
                         ${task.important ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
              >
                {task.important ? <Star size={16} /> : <StarOff size={16} />}
              </button>
              <button
                onClick={() => removeTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 
                         transition-all duration-300"
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

export default TaskManager;