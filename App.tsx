import React, { useState, useCallback, useEffect } from 'react';
// Fix: Corrected the import name from `INITIAL_WORK-OUT_PLAN` to `INITIAL_WORKOUT_PLAN`. The hyphenated version is not a valid identifier.
import { INITIAL_WORKOUT_PLAN } from './constants';
import { WorkoutDay as WorkoutDayType, CompletedWorkout, Exercise } from './types';
import Header from './components/Header';
import WorkoutDay from './components/WorkoutDay';
import Modal from './components/Modal';
import ProgressChart from './components/ProgressChart';
import WorkoutDaySummaryChart from './components/WorkoutDaySummaryChart';

const App: React.FC = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDayType[]>(() => {
    try {
      const savedPlan = localStorage.getItem('workoutPlan');
      if (savedPlan) {
        return JSON.parse(savedPlan);
      }
    } catch (error) {
      console.error("Failed to parse workout plan from localStorage", error);
    }
    return INITIAL_WORKOUT_PLAN;
  });
  
  const [workoutHistory, setWorkoutHistory] = useState<CompletedWorkout[]>(() => {
    try {
      const savedHistory = localStorage.getItem('workoutHistory');
      if (savedHistory) {
        return JSON.parse(savedHistory);
      }
    } catch (error)
    {
      console.error("Failed to parse workout history from localStorage", error);
    }
    return [];
  });

  const [selectedDayId, setSelectedDayId] = useState<string>(INITIAL_WORKOUT_PLAN[0].id);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [chartData, setChartData] = useState<{ exercise: Exercise; history: CompletedWorkout[] } | null>(null);


  useEffect(() => {
    try {
      localStorage.setItem('workoutPlan', JSON.stringify(workoutPlan));
    } catch (error) {
      console.error("Failed to save workout plan to localStorage", error);
    }
  }, [workoutPlan]);

  useEffect(() => {
    try {
      localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
    } catch (error) {
      console.error("Failed to save workout history to localStorage", error);
    }
  }, [workoutHistory]);


  const handleSetUpdate = useCallback((dayId: string, exerciseId: number, setId: number, field: 'reps' | 'weight' | 'completed', value: string | boolean) => {
    setWorkoutPlan(prevPlan =>
      prevPlan.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map(exercise => {
              if (exercise.id === exerciseId) {
                return {
                  ...exercise,
                  sets: exercise.sets.map(set => {
                    if (set.id === setId) {
                      return { ...set, [field]: value };
                    }
                    return set;
                  }),
                };
              }
              return exercise;
            }),
          };
        }
        return day;
      })
    );
  }, []);

  const handleAddSet = useCallback((dayId: string, exerciseId: number) => {
    setWorkoutPlan(prevPlan =>
      prevPlan.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map(exercise => {
              if (exercise.id === exerciseId) {
                const newSetId = exercise.sets.length > 0 ? Math.max(...exercise.sets.map(s => s.id)) + 1 : 1;
                return {
                  ...exercise,
                  sets: [...exercise.sets, { id: newSetId, reps: '', weight: '', completed: false }],
                };
              }
              return exercise;
            }),
          };
        }
        return day;
      })
    );
  }, []);

  const handleRemoveSet = useCallback((dayId: string, exerciseId: number, setId: number) => {
    setWorkoutPlan(prevPlan =>
      prevPlan.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            exercises: day.exercises.map(exercise => {
              if (exercise.id === exerciseId) {
                return {
                  ...exercise,
                  sets: exercise.sets.filter(set => set.id !== setId),
                };
              }
              return exercise;
            }),
          };
        }
        return day;
      })
    );
  }, []);

  const handleCompleteWorkout = useCallback((dayId: string) => {
    const dayToComplete = workoutPlan.find(day => day.id === dayId);
    if (!dayToComplete) return;

    const completedExercises = dayToComplete.exercises
        .map(ex => ({...ex, sets: ex.sets.filter(s => s.completed)}))
        .filter(ex => ex.sets.length > 0);

    if (completedExercises.length > 0) {
        const newCompletedWorkout: CompletedWorkout = {
            date: new Date().toISOString().split('T')[0],
            workoutDayId: dayId,
            exercises: completedExercises,
        };
        setWorkoutHistory(prev => [...prev, newCompletedWorkout]);
    }

    // Reset the completed day in the plan
    setWorkoutPlan(prevPlan => prevPlan.map(day => {
        if (day.id === dayId) {
            return {
                ...day,
                exercises: day.exercises.map(ex => ({
                    ...ex,
                    sets: ex.sets.map(s => ({...s, reps: '', weight: '', completed: false}))
                }))
            }
        }
        return day;
    }));

    alert(`${dayToComplete.title} workout saved!`);
  }, [workoutPlan]);

  const handleViewProgress = useCallback((exercise: Exercise) => {
    setChartData({ exercise, history: workoutHistory });
    setIsChartModalOpen(true);
  }, [workoutHistory]);

  const selectedDay = workoutPlan.find(day => day.id === selectedDayId);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header onViewSummary={() => setIsSummaryModalOpen(true)} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">Choose Your Workout</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {workoutPlan.map(day => (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 text-left ${selectedDayId === day.id ? 'bg-cyan-500 text-white ring-2 ring-cyan-300' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`${selectedDayId === day.id ? 'text-white' : 'text-cyan-400'}`}>
                  {day.icon}
                </div>
                <div>
                  <p className="font-bold text-xl">{day.title}</p>
                  <p className={`text-sm ${selectedDayId === day.id ? 'text-cyan-100' : 'text-gray-400'}`}>{day.day}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {selectedDay && (
          <WorkoutDay 
            workoutDay={selectedDay}
            onSetUpdate={handleSetUpdate}
            onAddSet={handleAddSet}
            onRemoveSet={handleRemoveSet}
            onCompleteWorkout={handleCompleteWorkout}
            onViewProgress={handleViewProgress}
          />
        )}
      </main>
      
      {/* Per-exercise progress modal */}
      {chartData && (
         <Modal isOpen={isChartModalOpen} onClose={() => setIsChartModalOpen(false)} title={`Progress for ${chartData.exercise.name}`}>
            <ProgressChart exerciseName={chartData.exercise.name} history={chartData.history} />
         </Modal>
      )}

      {/* Overall summary modal */}
      <Modal isOpen={isSummaryModalOpen} onClose={() => setIsSummaryModalOpen(false)} title="Workout Progress Summary">
        <div className="space-y-10">
          {workoutPlan.map(day => (
            <WorkoutDaySummaryChart
              key={day.id}
              workoutDay={day}
              history={workoutHistory}
            />
          ))}
        </div>
      </Modal>

    </div>
  );
};

export default App;