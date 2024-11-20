import { 
  Timer as TimerIcon, 
  Clock as StopwatchIcon,
  ListTodo as PlannerIcon,
  Calendar as CalendarIcon,
  Bell as RemindersIcon,
  Globe as WorldClockIcon,
  Wind as BreathingIcon,
  Book as JournalIcon,
  Target as GoalsIcon,
  Quote as QuotesIcon,
  Music as MusicIcon,
  CheckSquare as TaskIcon,
  Timer as FocusIcon,
  Cloud as WeatherIcon,
  Calculator as CalculatorIcon
} from 'lucide-react';

import Timer from '../components/tools/Timer';
import PomodoroTimer from '../components/tools/PomodoroTimer';
import DailyPlanner from '../components/tools/DailyPlanner';
import Weather from '../components/tools/Weather';
import Calculator from '../components/tools/Calculator';
import Stopwatch from '../components/tools/Stopwatch';
import Calendar from '../components/tools/Calendar';
import Reminders from '../components/tools/Reminders';
import WorldClock from '../components/tools/WorldClock';
import Breathing from '../components/tools/Breathing';
import Journal from '../components/tools/Journal';
import Goals from '../components/tools/Goals';
import DailyQuotes from '../components/tools/DailyQuotes';
import TaskManager from '../components/tools/TaskManager';
import FocusMusic from '../components/tools/FocusMusic';

export const tools = [
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus timer with breaks',
    icon: TimerIcon,
    color: 'from-[#3D2A3D] to-[#2D1F2D]',
    iconColor: 'text-red-500',
    category: 'Time Management',
    component: PomodoroTimer
  },
  {
    id: 'tasks',
    name: 'Task Manager',
    description: 'Manage your tasks',
    icon: TaskIcon,
    color: 'from-[#2A3D35] to-[#1F2D28]',
    iconColor: 'text-emerald-500',
    category: 'Productivity',
    component: TaskManager
  },
  {
    id: 'focus',
    name: 'Focus Timer',
    description: 'Track focused work',
    icon: FocusIcon,
    color: 'from-[#2D2A3D] to-[#211F2D]',
    iconColor: 'text-violet-500',
    category: 'Time Management',
    component: Timer
  },
  {
    id: 'planner',
    name: 'Daily Planner',
    description: 'Plan your day',
    icon: PlannerIcon,
    color: 'from-[#2A2D3D] to-[#1F212D]',
    iconColor: 'text-blue-500',
    category: 'Time Management',
    component: DailyPlanner
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Check weather conditions',
    icon: WeatherIcon,
    color: 'from-[#2A333D] to-[#1F262D]',
    iconColor: 'text-sky-500',
    category: 'Utilities',
    component: Weather
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Quick calculations',
    icon: CalculatorIcon,
    color: 'from-[#2A3D3D] to-[#1F2D2D]',
    iconColor: 'text-teal-500',
    category: 'Utilities',
    component: Calculator
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch',
    description: 'Track elapsed time',
    icon: StopwatchIcon,
    color: 'from-[#3D2A2A] to-[#2D1F1F]',
    iconColor: 'text-orange-500',
    category: 'Time Management',
    component: Stopwatch
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Manage your schedule',
    icon: CalendarIcon,
    color: 'from-[#2A3D35] to-[#1F2D28]',
    iconColor: 'text-emerald-500',
    category: 'Time Management',
    component: Calendar
  },
  {
    id: 'reminders',
    name: 'Reminders',
    description: 'Set important reminders',
    icon: RemindersIcon,
    color: 'from-[#3D3D2A] to-[#2D2D1F]',
    iconColor: 'text-yellow-500',
    category: 'Productivity',
    component: Reminders
  },
  {
    id: 'worldclock',
    name: 'World Clock',
    description: 'Track different time zones',
    icon: WorldClockIcon,
    color: 'from-[#2A3D3D] to-[#1F2D2D]',
    iconColor: 'text-cyan-500',
    category: 'Utilities',
    component: WorldClock
  },
  {
    id: 'breathing',
    name: 'Breathing',
    description: 'Guided breathing exercises',
    icon: BreathingIcon,
    color: 'from-[#2A3D3D] to-[#1F2D2D]',
    iconColor: 'text-teal-500',
    category: 'Wellness',
    component: Breathing
  },
  {
    id: 'journal',
    name: 'Journal',
    description: 'Record your thoughts',
    icon: JournalIcon,
    color: 'from-[#2D2A3D] to-[#211F2D]',
    iconColor: 'text-purple-500',
    category: 'Wellness',
    component: Journal
  },
  {
    id: 'goals',
    name: 'Goals',
    description: 'Set and track goals',
    icon: GoalsIcon,
    color: 'from-[#2A3D35] to-[#1F2D28]',
    iconColor: 'text-emerald-500',
    category: 'Productivity',
    component: Goals
  },
  {
    id: 'quotes',
    name: 'Daily Quotes',
    description: 'Get inspired daily',
    icon: QuotesIcon,
    color: 'from-[#3D2A3D] to-[#2D1F2D]',
    iconColor: 'text-pink-500',
    category: 'Wellness',
    component: DailyQuotes
  },
  {
    id: 'music',
    name: 'Focus Music',
    description: 'Ambient sounds',
    icon: MusicIcon,
    color: 'from-[#2D2A3D] to-[#211F2D]',
    iconColor: 'text-purple-500',
    category: 'Wellness',
    component: FocusMusic
  }
];

export default tools;