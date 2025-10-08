import React from 'react';
import { allModules } from '../data/curriculum';

const Learn: React.FC = () => {
  const handleListen = (text: string) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 1.0;
      synth.speak(utter);
    } catch (e) {
      console.warn('Speech synth not available', e);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Learn</h2>
      <div className="grid grid-cols-1 gap-4">
        {allModules.map((m: any) => (
          <div key={m.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold">{m.title}</h3>
                <p className="text-sm text-slate-600">{m.description}</p>
              </div>
              <div className="ml-4">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded-md"
                  onClick={() => handleListen(m.title + '. ' + (m.description || ''))}
                >
                  Listen
                </button>
              </div>
            </div>
            <div className="mt-2">
              <strong>Lessons:</strong>
              <ul className="list-disc pl-6">
                {m.lessons.map((l: any) => (
                  <li key={l.id} className="flex items-center justify-between">
                    <span>{l.title}</span>
                    <button
                      className="ml-3 text-sm text-blue-600"
                      onClick={() => handleListen(l.title)}
                    >
                      Listen
                    </button>
                  </li>
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
