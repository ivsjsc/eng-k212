import React from 'react';
import { allModules } from '../data/curriculum';
import { Link } from 'react-router-dom';

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
          <Link to={`/learn/${m.id}`} key={m.id} className="block p-4 border rounded-lg shadow-sm hover:shadow-md touch-manipulation">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">{m.title}</h3>
                <p className="text-sm text-slate-600">{m.description}</p>
              </div>
              <div className="ml-4 text-sm text-blue-600">View</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Learn;
