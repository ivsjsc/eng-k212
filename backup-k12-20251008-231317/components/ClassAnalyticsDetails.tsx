import React from 'react';
import type { ClassData } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface Props {
  classData: ClassData;
}

const ClassAnalyticsDetails: React.FC<Props> = ({ classData }) => {
  // prepare simple demo chart data from students' averageScore if available
  const chartData = (classData.students || []).map((s) => ({ name: s.name, score: s.averageScore || 0 }));

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-3">{classData.name}</h3>
      <p className="text-sm text-muted mb-4">{(classData.students || []).length} students</p>

      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 bg-slate-50 rounded">Average Score: <strong>{
          (() => {
            const arr = (classData.students || []).map(s => s.averageScore || 0);
            if (!arr.length) return 'N/A';
            return (arr.reduce((a,b) => a+b, 0)/arr.length).toFixed(1);
          })()
        }</strong></div>
        <div className="p-3 bg-slate-50 rounded">Students Struggling: <strong>{(classData.students || []).filter(s => s.isStruggling).length}</strong></div>
      </div>
    </div>
  );
};

export default ClassAnalyticsDetails;