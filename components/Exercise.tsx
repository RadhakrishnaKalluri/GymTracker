import React from 'react';
import { Exercise as ExerciseType } from '../types';

interface ExerciseProps {
  exercise: ExerciseType;
  onSetUpdate: (setId: number, field: 'reps' | 'weight' | 'completed', value: string | boolean) => void;
  onAddSet: () => void;
  onRemoveSet: (setId: number) => void;
  onViewProgress: () => void;
}

const Exercise: React.FC<ExerciseProps> = ({ exercise, onSetUpdate, onAddSet, onRemoveSet, onViewProgress }) => {
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-semibold text-cyan-400">{exercise.name}</h4>
        <button 
          onClick={onViewProgress} 
          className="text-gray-400 hover:text-cyan-300 transition-colors"
          aria-label={`View progress for ${exercise.name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-400 px-2">
          <div className="col-span-2">Set</div>
          <div className="col-span-4">Weight (kg)</div>
          <div className="col-span-3">Reps</div>
          <div className="col-span-3 text-center">Done</div>
        </div>

        {/* Sets */}
        {exercise.sets.map((set, index) => (
          <div
            key={set.id}
            className={`grid grid-cols-12 gap-2 items-center p-2 rounded-md transition-colors duration-300 ${set.completed ? 'bg-green-800/20' : 'bg-gray-700/50'}`}
          >
            <div className="col-span-2 font-bold text-cyan-300">{index + 1}</div>
            <div className="col-span-4">
              <input
                type="text"
                value={set.weight}
                onChange={(e) => onSetUpdate(set.id, 'weight', e.target.value)}
                placeholder="0"
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-2 py-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              />
            </div>
            <div className="col-span-3">
              <input
                type="text"
                value={set.reps}
                onChange={(e) => onSetUpdate(set.id, 'reps', e.target.value)}
                placeholder="0"
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-2 py-1 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
              />
            </div>
            <div className="col-span-3 flex justify-center items-center space-x-2">
               <input
                type="checkbox"
                checked={set.completed}
                onChange={(e) => onSetUpdate(set.id, 'completed', e.target.checked)}
                className="h-5 w-5 rounded bg-gray-700 border-gray-500 text-cyan-500 focus:ring-cyan-600 cursor-pointer"
               />
               <button onClick={() => onRemoveSet(set.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
               </button>
            </div>
          </div>
        ))}
        
        <button 
            onClick={onAddSet}
            className="w-full mt-3 py-2 px-4 bg-cyan-600/20 text-cyan-300 font-semibold rounded-lg hover:bg-cyan-600/40 transition-colors duration-300"
        >
          Add Set
        </button>
      </div>
    </div>
  );
};

export default Exercise;