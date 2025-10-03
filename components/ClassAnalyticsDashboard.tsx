import React from 'react';
import type { Classes, ClassData } from '../types';

interface Props {
  classes: Classes;
  language: 'en' | 'vi';
}

const ClassAnalyticsDashboard: React.FC<Props> = ({ classes, language }) => {
  const title = language === 'vi' ? 'Phân tích lớp học' : 'Class Analytics';

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-sm text-muted mb-4">{Object.keys(classes).length} classes available.</p>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(classes).map(([id, cls]) => {
          const classData = cls as ClassData;
          return (
            <div key={id} className="p-4 bg-white rounded shadow-sm">
              <h3 className="font-semibold">{classData.name}</h3>
              <p className="text-sm text-muted">{classData.students.length} students</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassAnalyticsDashboard;
