import React from 'react';
import { WorkoutDay as WorkoutDayType, Exercise as ExerciseType } from '../types';
import Exercise from './Exercise';

interface WorkoutDayProps {
  workoutDay: WorkoutDayType;
  onSetUpdate: (dayId: string, exerciseId: number, setId: number, field: 'reps' | 'weight' | 'completed', value: string | boolean) => void;
  onAddSet: (dayId: string, exerciseId: number) => void;
  onRemoveSet: (dayId: string, exerciseId: number, setId: number) => void;
  onCompleteWorkout: (dayId: string) => void;
  onViewProgress: (exercise: ExerciseType) => void;
}

const WorkoutDay: React.FC<WorkoutDayProps> = ({ workoutDay, onSetUpdate, onAddSet, onRemoveSet, onCompleteWorkout, onViewProgress }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="border-b border-gray-700 pb-4 mb-6">
        <h3 className="text-3xl font-bold text-white">{workoutDay.title}</h3>
        <p className="text-gray-400 mt-1">{workoutDay.description}</p>
      </div>
      <div className="space-y-6">
        {workoutDay.exercises.map((exercise) => (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            onSetUpdate={(setId, field, value) => onSetUpdate(workoutDay.id, exercise.id, setId, field, value)}
            onAddSet={() => onAddSet(workoutDay.id, exercise.id)}
            onRemoveSet={(setId) => onRemoveSet(workoutDay.id, exercise.id, setId)}
            onViewProgress={() => onViewProgress(exercise)}
          />
        ))}
      </div>
       <button 
        onClick={() => onCompleteWorkout(workoutDay.id)}
        className="w-full mt-8 py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2"
        aria-label={`Complete and save ${workoutDay.title} workout`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span>Complete & Save Workout</span>
      </button>
    </div>
  );
};

export default WorkoutDay;