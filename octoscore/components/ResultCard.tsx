'use client';
import { GitProfileScore, ScoreBreakdown } from '@/lib/scorer';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface ResultCardProps {
  scoreData: GitProfileScore;
}

const getRadarChartData = (breakdown: ScoreBreakdown[]) => {
  return {
    labels: breakdown.map(b => b.metric),
    datasets: [{
      label: 'Normalized Score',
      data: breakdown.map(b => b.normalized),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };
};

export default function ResultCard({ scoreData }: ResultCardProps) {
  const { score, eligible, breakdown, remarks } = scoreData;
  const chartData = getRadarChartData(breakdown);

  return (
    <div className="card w-full max-w-3xl bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
      <div className="card-body">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <h2 className="text-6xl font-extrabold mb-2">
              {score}
              <span className="text-xl">/10</span>
            </h2>
            <span className={`badge text-white px-3 py-1 rounded-full ${eligible ? 'bg-green-500' : 'bg-red-500'}`}>
              {eligible ? 'Eligible' : 'Not Eligible'}
            </span>
          </div>
          <div className="w-64 h-64">
            <Radar data={chartData} options={{ scales: { r: { min: 0, max: 1 } } }} />
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Remarks</h3>
          <ul className="list-disc list-inside">
            {remarks.map((remark, index) => (
              <li key={index}>{remark}</li>
            ))}
          </ul>
        </div>
        <div className="collapse bg-gray-100 dark:bg-gray-700 rounded-md mt-4">
          <input type="checkbox" className="min-h-0" />
          <div className="collapse-title font-medium text-lg">
            Detailed Breakdown
          </div>
          <div className="collapse-content">
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="py-2 px-4">Metric</th>
                  <th className="py-2 px-4">Raw Value</th>
                  <th className="py-2 px-4">Normalized</th>
                  <th className="py-2 px-4">Weight</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="py-2 px-4">{item.metric}</td>
                    <td className="py-2 px-4">{typeof item.raw === 'object' ? JSON.stringify(item.raw) : item.raw}</td>
                    <td className="py-2 px-4">{item.normalized.toFixed(2)}</td>
                    <td className="py-2 px-4">{item.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}