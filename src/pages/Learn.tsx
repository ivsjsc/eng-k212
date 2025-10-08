import React from 'react';
import { allModules } from '../data/curriculum';

const Learn: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Learn</h2>
      <div className="grid grid-cols-1 gap-4">
        {allModules.map((m: any) => (
          <div key={m.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-bold">{m.title}</h3>
            <p className="text-sm text-slate-600">{m.description}</p>
            <div className="mt-2">
              <strong>Lessons:</strong>
              <ul className="list-disc pl-6">
                {m.lessons.map((l: any) => (
                  <li key={l.id}>{l.title}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
