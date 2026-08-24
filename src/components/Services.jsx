import React, { useState, useRef } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { services } from '../constants/servicesData';

function ServiceCard({ service, isDark }) {
  const cardRef = useRef(null);
  const requestRef = useRef(null);

  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    requestRef.current = requestAnimationFrame(() => {
      const maxTilt = 8;
      setTransform(`perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.015, 1.015, 1.015)`);
      setGlare({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        opacity: 0.1,
      });
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovered ? 'none' : 'transform 0.5s ease, border-color 0.3s ease',
        willChange: 'transform',
        touchAction: 'pan-y',
      }}
      className={`relative p-6 rounded-[28px] border transition-colors cursor-pointer overflow-hidden ${
        isDark
          ? 'bg-zinc-950/60 border-white/10 hover:border-[#d4ff00]/40'
          : 'bg-white border-slate-200 hover:border-[#d4ff00]/40 shadow-sm'
      }`}
    >
      {/* Capa de destello (Glare) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${
            isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)'
          } 0%, rgba(255,255,255,0) 65%)`,
          opacity: glare.opacity,
        }}
      />

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
  );
}

const Services = () => {
  const { isDark } = useNavigation();

  return (
    <section id="servicios" className="relative z-10 pt-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
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
            <ServiceCard key={service.id} service={service} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;