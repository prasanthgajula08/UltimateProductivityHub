import React, { useState } from 'react';
import { Plus, Minus, Trash2, Target, CheckCircle, Circle, Calendar } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  deadline?: string;
  completed: boolean;
  subgoals: SubGoal[];
}

interface SubGoal {
  id: string;
  title: string;
  completed: boolean;
}

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
  const [newSubgoal, setNewSubgoal] = useState('');

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;

    const goal: Goal = {
      id: crypto.randomUUID(),
      title: newGoal,
      deadline: newDeadline || undefined,
      completed: false,
      subgoals: []
    };

    setGoals([...goals, goal]);
    setNewGoal('');
    setNewDeadline('');
    setShowForm(false);
  };

  const addSubgoal = (goalId: string) => {
    if (!newSubgoal.trim()) return;

    const subgoal: SubGoal = {
      id: crypto.randomUUID(),
      title: newSubgoal,
      completed: false
    };

    setGoals(goals.map(goal =>
      goal.id === goalId
        ? { ...goal, subgoals: [...goal.subgoals, subgoal] }
        : goal
    ));
    setNewSubgoal('');
  };

  const toggleGoal = (goalId: string) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            completed: !goal.completed,
            subgoals: goal.subgoals.map(subgoal => ({
              ...subgoal,
              completed: !goal.completed
            }))
          }
        : goal
    ));
  };

  const toggleSubgoal = (goalId: string, subgoalId: string) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            subgoals: goal.subgoals.map(subgoal =>
              subgoal.id === subgoalId
                ? { ...subgoal, completed: !subgoal.completed }
                : subgoal
            ),
            completed: false
          }
        : goal
    ));
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const removeSubgoal = (goalId: string, subgoalId: string) => {
    setGoals(goals.map(goal =>
      goal.id === goalId
        ? {
            ...goal,
            subgoals: goal.subgoals.filter(subgoal => subgoal.id !== subgoalId)
          }
        : goal
    ));
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
          <span>Add Goal</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                        group-hover:from-purple-500/5 group-hover:to-pink-500/5 
                        transition-all duration-300" />
        </button>
      ) : (
        <form onSubmit={addGoal} className="space-y-4 p-4 rounded-lg bg-white/5">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Goal title..."
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                     placeholder-gray-500 transition-all
                     hover:bg-white/[0.15] hover:border-white/20"
          />
          <input
            type="date"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                     focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                     text-white transition-all
                     hover:bg-white/[0.15] hover:border-white/20"
          />
          <div className="flex gap-2">
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
              Add Goal
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No goals set yet. Start by adding a goal!
          </div>
        ) : (
          goals.map(goal => (
            <div
              key={goal.id}
              className={`space-y-2 p-4 rounded-lg transition-all duration-300
                       ${goal.completed
                         ? 'bg-white/5 hover:bg-white/10'
                         : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/15 hover:to-pink-500/15'
                       }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`transition-colors duration-300
                           ${goal.completed
                             ? 'text-green-500'
                             : 'text-gray-400 hover:text-green-500'
                           }`}
                >
                  {goal.completed ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>
                <span className={goal.completed ? 'line-through text-gray-400' : ''}>
                  {goal.title}
                </span>
                {goal.deadline && (
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar size={14} />
                    {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                )}
                <div className="flex-1" />
                <button
                  onClick={() => setExpandedGoal(
                    expandedGoal === goal.id ? null : goal.id
                  )}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {expandedGoal === goal.id ? (
                    <Minus size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
                </button>
                <button
                  onClick={() => removeGoal(goal.id)}
                  className="p-2 rounded-lg hover:bg-white/10 text-red-400 
                           transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {expandedGoal === goal.id && (
                <div className="pl-8 space-y-2 mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSubgoal}
                      onChange={(e) => setNewSubgoal(e.target.value)}
                      placeholder="Add a sub-goal..."
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 
                               focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                               placeholder-gray-500"
                    />
                    <button
                      onClick={() => addSubgoal(goal.id)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 
                               transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  {goal.subgoals.map(subgoal => (
                    <div
                      key={subgoal.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-white/5 
                               hover:bg-white/10 transition-colors"
                    >
                      <button
                        onClick={() => toggleSubgoal(goal.id, subgoal.id)}
                        className={`transition-colors duration-300
                                 ${subgoal.completed
                                   ? 'text-green-500'
                                   : 'text-gray-400 hover:text-green-500'
                                 }`}
                      >
                        {subgoal.completed ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Circle size={16} />
                        )}
                      </button>
                      <span className={subgoal.completed ? 'line-through text-gray-400' : ''}>
                        {subgoal.title}
                      </span>
                      <div className="flex-1" />
                      <button
                        onClick={() => removeSubgoal(goal.id, subgoal.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg 
                                 hover:bg-white/10 text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Goals;