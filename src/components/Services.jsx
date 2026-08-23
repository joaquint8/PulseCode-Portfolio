import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { services } from '../constants/servicesData';

const Services = () => {
  const { isDark } = useNavigation();

  return (
    <section id="servicios" className="relative z-10 pt-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado arriba */}
        <div className="mb-10 text-left">
          <span className="text-[#d4ff00] font-bold text-[10px] uppercase tracking-[0.3em] mb-2 block">
            SERVICIOS
          </span>
          <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Servicios para diferenciarte
          </h2>
        </div>

        {/* Grilla de Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`p-6 rounded-[28px] border transition-all cursor-default ${
                isDark 
                  ? 'bg-zinc-950/60 border-white/10 hover:border-[#d4ff00]/40' 
                  : 'bg-white border-slate-200 hover:border-[#d4ff00]/40 shadow-sm'
              }`}
            >
              <span className="text-[12px] font-mono text-[#d4ff00] font-bold mb-4 block">
                {service.id}
              </span>

              <h3 className={`text-[20px] font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {service.title}
              </h3>

              <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'} leading-relaxed text-sm`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;