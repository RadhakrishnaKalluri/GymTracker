// Fix: The 'JSX' namespace is not available in .ts files by default.
// Importing `ReactNode` from react and using it for the `icon` property resolves the error.
import type { ReactNode } from 'react';

export interface SetData {
  id: number;
  reps: string;
  weight: string;
  completed: boolean;
}

export interface Exercise {
  id: number;
  name: string;
  sets: SetData[];
}

export interface WorkoutDay {
  id: string;
  day: string;
  title: string;
  description: string;
  icon: ReactNode;
  exercises: Exercise[];
}

export interface CompletedWorkout {
  date: string; // YYYY-MM-DD
  workoutDayId: string;
  exercises: Exercise[];
}