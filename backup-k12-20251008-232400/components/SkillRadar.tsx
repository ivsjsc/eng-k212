import React from 'react';

interface SkillData {
  skill: string;
  level: number; // 0-100
}

interface SkillRadarProps {
  skills: SkillData[];
  language: 'en' | 'vi';
}

const SkillRadar: React.FC<SkillRadarProps> = ({ skills, language }) => {
  const t = {
    en: { title: 'Skill Proficiency' },
    vi: { title: 'Năng lực Kỹ năng' }
  }[language];

  // Create a simple circular radar-like visualization
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  const angleStep = (2 * Math.PI) / skills.length;

  // Calculate polygon points based on skill levels
  const polygonPoints = skills.map((skill, index) => {
    const angle = angleStep * index - Math.PI / 2; // Start from top
    const radius = (skill.level / 100) * maxRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Calculate label positions
  const labelPositions = skills.map((skill, index) => {
    const angle = angleStep * index - Math.PI / 2;
    const labelRadius = maxRadius + 30;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    return { x, y, skill };
  });

  return (
    <div className="card-glass p-6">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
        <i className="fa-solid fa-chart-radar mr-2 text-green-500"></i>
        {t.title}
      </h3>
      <div className="flex justify-center">
        <svg width="300" height="300" className="overflow-visible">
          {/* Background circles */}
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={maxRadius * scale}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-300 dark:text-slate-700"
              opacity="0.3"
            />
          ))}

          {/* Axis lines */}
          {skills.map((_, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = centerX + maxRadius * Math.cos(angle);
            const y = centerY + maxRadius * Math.sin(angle);
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-300 dark:text-slate-700"
                opacity="0.3"
              />
            );
          })}

          {/* Skill polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
          />

          {/* Skill points */}
          {skills.map((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const radius = (skill.level / 100) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="rgb(59, 130, 246)"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}

          {/* Labels */}
          {labelPositions.map((pos, index) => (
            <text
              key={index}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-slate-700 dark:fill-slate-300"
            >
              {pos.skill.skill}
            </text>
          ))}
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded">
            <span className="text-slate-600 dark:text-slate-400">{skill.skill}</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{skill.level}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRadar;
