
import { WorkoutDay } from './types';

const UpperBodyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const LowerBodyIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CoreStretchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);


export const INITIAL_WORKOUT_PLAN: WorkoutDay[] = [
  {
    id: 'upper-body',
    day: 'Day 1',
    title: 'Upper Body',
    description: 'Focus on chest, back, shoulders, and arms.',
    icon: UpperBodyIcon,
    exercises: [
      { id: 1, name: 'Bench Press', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 2, name: 'Overhead Press', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 3, name: 'Pull Ups (or Lat Pulldown)', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 4, name: 'Dumbbell Rows', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 5, name: 'Bicep Curls', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
    ],
  },
  {
    id: 'lower-body',
    day: 'Day 2',
    title: 'Lower Body',
    description: 'Build strength in your legs and glutes.',
    icon: LowerBodyIcon,
    exercises: [
      { id: 1, name: 'Squats', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 2, name: 'Romanian Deadlifts', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 3, name: 'Lunges', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 4, name: 'Leg Press', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 5, name: 'Calf Raises', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
    ],
  },
  {
    id: 'core-stretch',
    day: 'Day 3',
    title: 'Core & Stretching',
    description: 'Strengthen your core and improve flexibility.',
    icon: CoreStretchIcon,
    exercises: [
      { id: 1, name: 'Plank', sets: [{ id: 1, reps: '60s', weight: 'BW', completed: false }, { id: 2, reps: '60s', weight: 'BW', completed: false }, { id: 3, reps: '60s', weight: 'BW', completed: false }] },
      { id: 2, name: 'Crunches', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 3, name: 'Leg Raises', sets: [{ id: 1, reps: '', weight: '', completed: false }, { id: 2, reps: '', weight: '', completed: false }, { id: 3, reps: '', weight: '', completed: false }] },
      { id: 4, name: 'Cat-Cow Stretch', sets: [{ id: 1, reps: '10', weight: 'BW', completed: false }, { id: 2, reps: '10', weight: 'BW', completed: false }] },
      { id: 5, name: 'Child\'s Pose', sets: [{ id: 1, reps: '60s', weight: 'BW', completed: false }] },
    ],
  },
];
