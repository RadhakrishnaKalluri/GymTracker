import React, { useEffect, useRef } from 'react';
import { CompletedWorkout } from '../types';

declare const Chart: any;

interface ProgressChartProps {
  exerciseName: string;
  history: CompletedWorkout[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ exerciseName, history }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const exerciseHistory = history
      .map(session => {
        const exercise = session.exercises.find(ex => ex.name === exerciseName);
        return exercise ? { date: session.date, exercise } : null;
      })
      .filter(Boolean)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (exerciseHistory.length === 0) {
        return;
    }
      
    const labels = exerciseHistory.map(h => h.date);
    const maxWeightData = exerciseHistory.map(h => 
        Math.max(...h.exercise.sets.map(s => parseFloat(s.weight) || 0))
    );
    const totalVolumeData = exerciseHistory.map(h => 
        h.exercise.sets.reduce((sum, s) => sum + (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0), 0)
    );

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    if (chartInstance.current) {
        chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Max Weight (kg)',
            data: maxWeightData,
            borderColor: '#22d3ee', // cyan-400
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            yAxisID: 'y',
            tension: 0.1,
            fill: true,
          },
          {
            label: 'Total Volume (kg)',
            data: totalVolumeData,
            borderColor: '#a78bfa', // violet-400
            backgroundColor: 'rgba(167, 139, 250, 0.1)',
            yAxisID: 'y1',
            tension: 0.1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                labels: {
                    color: '#e5e7eb' // gray-200
                }
            },
            tooltip: {
                backgroundColor: '#374151', // gray-700
                titleColor: '#e5e7eb',
                bodyColor: '#e5e7eb',
            }
        },
        scales: {
            x: {
                ticks: { color: '#9ca3af' }, // gray-400
                grid: { color: 'rgba(156, 163, 175, 0.1)' }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: { display: true, text: 'Weight (kg)', color: '#22d3ee' },
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(156, 163, 175, 0.2)' }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: { display: true, text: 'Volume (kg)', color: '#a78bfa' },
                ticks: { color: '#9ca3af' },
                grid: { drawOnChartArea: false },
            },
        },
      },
    });

    return () => {
        if(chartInstance.current) {
            chartInstance.current.destroy();
        }
    }

  }, [exerciseName, history]);

  const hasData = history.some(session => session.exercises.some(ex => ex.name === exerciseName));

  return (
    <div>
      {hasData ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <p className="text-gray-400 text-center py-8">No completed workouts logged for this exercise yet. Complete a workout to start tracking your progress!</p>
      )}
    </div>
  );
};

export default ProgressChart;