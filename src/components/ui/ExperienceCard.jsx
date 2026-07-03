// src/components/ui/ExperienceCard.jsx
const ExperienceCard = ({ date, role, company, description }) => {
  return (
    <div className="relative pl-8 pb-12 border-l border-gray-800 last:pb-0">
      {/* Timeline Dot */}
      <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-white" />
      
      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <h3 className="text-xl font-bold text-white">{role}</h3>
        <span className="text-gray-500 font-mono text-sm uppercase">{date}</span>
      </div>
      <p className="text-gray-400 font-medium mb-3 italic">{company}</p>
      {description && <p className="text-gray-500 max-w-2xl leading-relaxed">{description}</p>}
    </div>
  );
};

export default ExperienceCard;