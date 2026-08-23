import { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { ProjectCard } from './ProjectCard';
import { projects } from '../constants/portfolioData';
import ProjectModal from './ProjectModal';

const Portfolio = () => {
  const { isDark } = useNavigation();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portafolio" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera adaptada a la estructura de la referencia */}
        <div className="mb-10 flex flex-col gap-3 lg:max-w-4xl">
          <span className="text-[#d4ff00] font-bold uppercase tracking-[0.3em] text-xs">
            Portafolio
          </span>

          <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Nuestros proyectos más recientes
          </h2>
        </div>

        {/* Grilla que pasa a 3 columnas en pantallas grandes (lg) */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Portfolio;