import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allModules } from '../data/curriculum';
import AudioPlayer from '../components/AudioPlayer';

const Lesson: React.FC = () => {
  const { moduleId, lessonId } = useParams();
  const module = allModules.find((m: any) => m.id === moduleId);
  const lesson = module?.lessons.find((l: any) => l.id === lessonId);

  if (!module || !lesson) return <div className="p-4">Lesson not found</div>;

  return (
    <div className="min-h-screen p-4">
      <nav className="mb-4">
        <Link to="/learn" className="text-sm text-blue-600">&larr; Back to Learn</Link>
      </nav>

      <h2 className="text-2xl font-bold">{lesson.title}</h2>
      <p className="text-sm text-slate-600">Module: {module.title}</p>

      <div className="mt-4">
        <AudioPlayer text={`${lesson.title}. This is a short practice sentence for shadowing.`} />
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">Practice</h3>
        <p className="mt-2">Shadowing exercise: Repeat after the audio, focusing on stress and intonation.</p>
      </section>
    </div>
  );
};

export default Lesson;
