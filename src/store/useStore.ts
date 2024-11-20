import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tool, ModalState, Task, Note, HabitTrack, JournalEntry } from '../types';
import { addDays, startOfToday } from 'date-fns';

interface PomodoroState {
  isActive: boolean;
  timeLeft: number;
  workDuration: number;
  breakDuration: number;
  isBreak: boolean;
}

interface Store {
  // Modal State
  modal: ModalState;
  openModal: (tool: Tool) => void;
  closeModal: () => void;

  // Pomodoro Timer
  pomodoro: PomodoroState;
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: () => void;
  setWorkDuration: (minutes: number) => void;
  setBreakDuration: (minutes: number) => void;
  tick: () => void;

  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;

  // Notes
  notes: Note[];
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, content: string) => void;

  // Habits
  habits: HabitTrack[];
  addHabit: (habit: string) => void;
  toggleHabitDay: (habitId: string, date: string) => void;
  removeHabit: (id: string) => void;

  // Journal
  journal: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (id: string, content: string) => void;
  removeJournalEntry: (id: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Modal
      modal: {
        isOpen: false,
        activeTool: null,
      },
      openModal: (tool) => set({ modal: { isOpen: true, activeTool: tool } }),
      closeModal: () => set({ modal: { isOpen: false, activeTool: null } }),

      // Pomodoro
      pomodoro: {
        isActive: false,
        timeLeft: 25 * 60,
        workDuration: 25 * 60,
        breakDuration: 5 * 60,
        isBreak: false,
      },
      startPomodoro: () =>
        set((state) => ({
          pomodoro: { ...state.pomodoro, isActive: true },
        })),
      pausePomodoro: () =>
        set((state) => ({
          pomodoro: { ...state.pomodoro, isActive: false },
        })),
      resetPomodoro: () =>
        set((state) => ({
          pomodoro: {
            ...state.pomodoro,
            isActive: false,
            timeLeft: state.pomodoro.workDuration,
            isBreak: false,
          },
        })),
      setWorkDuration: (minutes) =>
        set((state) => ({
          pomodoro: {
            ...state.pomodoro,
            workDuration: minutes * 60,
            timeLeft: minutes * 60,
          },
        })),
      setBreakDuration: (minutes) =>
        set((state) => ({
          pomodoro: { ...state.pomodoro, breakDuration: minutes * 60 },
        })),
      tick: () =>
        set((state) => {
          if (state.pomodoro.timeLeft <= 0) {
            const newIsBreak = !state.pomodoro.isBreak;
            return {
              pomodoro: {
                ...state.pomodoro,
                isBreak: newIsBreak,
                timeLeft: newIsBreak
                  ? state.pomodoro.breakDuration
                  : state.pomodoro.workDuration,
              },
            };
          }
          return {
            pomodoro: {
              ...state.pomodoro,
              timeLeft: state.pomodoro.timeLeft - 1,
            },
          };
        }),

      // Tasks
      tasks: [],
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      // Notes
      notes: [],
      addNote: (note) =>
        set((state) => ({ notes: [...state.notes, note] })),
      removeNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      updateNote: (id, content) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, content } : note
          ),
        })),

      // Habits
      habits: [],
      addHabit: (habit) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              id: crypto.randomUUID(),
              name: habit,
              dates: {},
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleHabitDay: (habitId, date) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  dates: {
                    ...habit.dates,
                    [date]: !habit.dates[date],
                  },
                }
              : habit
          ),
        })),
      removeHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),

      // Journal
      journal: [],
      addJournalEntry: (entry) =>
        set((state) => ({
          journal: [...state.journal, entry],
        })),
      updateJournalEntry: (id, content) =>
        set((state) => ({
          journal: state.journal.map((entry) =>
            entry.id === id ? { ...entry, content } : entry
          ),
        })),
      removeJournalEntry: (id) =>
        set((state) => ({
          journal: state.journal.filter((entry) => entry.id !== id),
        })),
    }),
    {
      name: 'productivity-hub-storage',
    }
  )
);