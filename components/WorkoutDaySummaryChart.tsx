import React, { useEffect, useRef } from 'react';
import { CompletedWorkout, WorkoutDay } from '../types';

declare const Chart: any;

interface WorkoutDaySummaryChartProps {
  workoutDay: WorkoutDay;
  history: CompletedWorkout[];
}

const WorkoutDaySummaryChart: React.FC<WorkoutDaySummaryChartProps> = ({ workoutDay, history }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  const dayHistory = history
    .filter(session => session.workoutDayId === workoutDay.id)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  useEffect(() => {
    if (!chartRef.current || dayHistory.length === 0) return;

    const labels = dayHistory.map(h => h.date);
    const totalVolumeData = dayHistory.map(session => 
      session.exercises.reduce((daySum, ex) => 
        daySum + ex.sets.reduce((exSum, s) => 
          exSum + (parseFloat(s.weight) || 0) * (parseFloat(s.reps) || 0), 
        0),
      0)
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
            label: 'Total Volume (kg)',
            data: totalVolumeData,
            borderColor: '#22d3ee', // cyan-400
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            tension: 0.1,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#374151',
                titleColor: '#e5e7eb',
                bodyColor: '#e5e7eb',
            }
        },
        scales: {
            x: {
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(156, 163, 175, 0.1)' }
            },
            y: {
                title: { display: true, text: 'Total Volume (kg)', color: '#9ca3af' },
                ticks: { color: '#9ca3af' },
                grid: { color: 'rgba(156, 163, 175, 0.2)' }
            },
        },
      },
    });

    return () => {
        if(chartInstance.current) {
            chartInstance.current.destroy();
        }
    }

  }, [dayHistory]);

  const handleDownload = () => {
    if (chartInstance.current) {
      const link = document.createElement('a');
      link.href = chartInstance.current.toBase64Image();
      link.download = `${workoutDay.title.replace(/\s+/g, '_')}_progress.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <div className="bg-gray-900/50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">{workoutDay.title}</h3>
        {dayHistory.length > 0 && (
          <button 
            onClick={handleDownload}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 text-cyan-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
            aria-label={`Download chart for ${workoutDay.title}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            <span>Download Chart</span>
          </button>
        )}
      </div>
      <div>
        {dayHistory.length > 0 ? (
          <canvas ref={chartRef}></canvas>
        ) : (
          <p className="text-gray-500 text-center py-4">No completed workouts logged for {workoutDay.title} yet.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutDaySummaryChart;