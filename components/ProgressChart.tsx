import React from 'react';

interface ProgressChartProps {
  data: { label: string; value: number; color: string }[];
  language: 'en' | 'vi';
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, language }) => {
  const maxValue = Math.max(...data.map(d => d.value), 100);

  const t = {
    en: { title: 'Skill Progress' },
    vi: { title: 'Tiến độ Kỹ năng' }
  }[language];

  return (
    <div className="card-glass p-6">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
        <i className="fa-solid fa-chart-line mr-2 text-blue-500"></i>
        {t.title}
      </h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
              <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;
