import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';

export const ProjectCard = ({ project, onClick }) => {
  const { isDark } = useNavigation();

  return (
    <div 
      onClick={onClick}
      className={`group border overflow-hidden rounded-2xl shadow transition-all duration-300 cursor-pointer relative ${
        isDark 
          ? 'glass-card border-slate-800 bg-transparent hover:border-slate-700' 
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Contenedor de Imagen con proporción exacta 5:3 y posición relativa para la flecha */}
      <div className="aspect-[5/3] overflow-hidden relative">
        <img 
          alt={project.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
          src={project.image} 
        />

        {/* Tu Flechita Original: ahora posicionada arriba a la derecha de la IMAGEN */}
        <div className="absolute top-4 right-4 opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 z-10">
          <div className="w-9 h-9 rounded-full bg-[#d4ff00] flex items-center justify-center shadow-lg">
            <ArrowRight className="w-4 h-4 text-black" />
          </div>
        </div>
      </div>

      {/* Cuerpo de la tarjeta con espaciado controlado */}
      <div className="space-y-3 p-5">
        
        {/* Título y Categoría (Estilo Badge "Ventas") aprovechando todo el ancho */}
        <div className="flex items-center justify-between gap-2">
          <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {project.title}
          </h4>
          
          {/* Badge de categoría */}
          {project.category && (
            <span className="rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/10 px-2 py-1 text-xs font-bold text-[#d4ff00] shrink-0 whitespace-nowrap">
              {project.category}
            </span>
          )}
        </div>

        {/* Descripción breve */}
        <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
          {project.description}
        </p>

        {/* Mapeo dinámico de las Tags originales al final */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase font-medium tracking-wider ${
                  isDark
                    ? 'border-slate-800 bg-white/5 text-gray-400'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};