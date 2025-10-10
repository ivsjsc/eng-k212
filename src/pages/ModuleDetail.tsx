import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allModules } from '../data/curriculum';
import AudioPlayer from '../components/AudioPlayer';

const ModuleDetail: React.FC = () => {
  const { moduleId } = useParams();
  const module = allModules.find((m: any) => m.id === moduleId);
  if (!module) return <div className="p-4">Module not found</div>;

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
      <p className="text-sm text-slate-600 mb-4">{module.description}</p>
      <div className="mb-4">
        <AudioPlayer text={`${module.title}. ${module.description}`} />
      </div>

      <h3 className="font-semibold mb-2">Lessons</h3>
      <ul className="list-disc pl-6">
        {module.lessons.map((l: any) => (
          <li key={l.id} className="mb-2">
            <Link to={`/learn/${module.id}/${l.id}`} className="text-blue-600">{l.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleDetail;
