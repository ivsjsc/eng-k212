import React, { useState } from 'react';
import ClassAnalyticsDetails from './ClassAnalyticsDetails';
import { useClassAnalytics } from '../src/hooks/useClassAnalytics';
import type { Classes } from '../types';

interface Props {
  classes?: Classes;
  language?: 'en' | 'vi';
}

const ClassAnalyticsDashboard: React.FC<Props> = ({ classes = {}, language = 'vi' }) => {
  const classIds = Object.keys(classes);
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(classIds[0] || 'class-1');

  // use demo hook — will return demo data for class-1 / class-2 if real classes empty
  const { data, loading, error } = useClassAnalytics(selectedClassId);

  const title = language === 'vi' ? 'Phân tích lớp học' : 'Class Analytics';

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm text-slate-600">{language === 'vi' ? 'Chọn lớp:' : 'Select class:'}</label>
        <select
          className="border rounded px-3 py-1"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          {classIds.length > 0
            ? classIds.map((id) => <option key={id} value={id}>{(classes as any)[id]?.name || id}</option>)
            : (
              <>
                <option value="class-1">Lớp demo: Lớp 6A1</option>
                <option value="class-2">Lớp demo: Lớp 7B2</option>
              </>
            )
          }
        </select>
      </div>

      {loading && <div className="p-4 bg-white rounded shadow">Loading analytics...</div>}
      {error && <div className="p-4 bg-red-50 rounded shadow text-red-700">Error: {error}</div>}
      {!loading && !error && data && <ClassAnalyticsDetails classData={data} />}

      {!loading && !error && !data && (
        <div className="p-4 bg-yellow-50 rounded shadow">
          <p className="text-sm">No analytics data available for the selected class.</p>
        </div>
      )}
    </div>
  );
};

export default ClassAnalyticsDashboard;