import { useState, useRef } from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../constants/testimonialsData';

function TiltTestimonialCard({ item }) {
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
        transition: isHovered ? 'none' : 'transform 0.5s ease, box-shadow 0.3s ease',
        willChange: 'transform',
        touchAction: 'pan-y'
      }}
      className="glass-card w-full rounded-[24px] border border-white/10 bg-black/40 p-7 sm:p-8 shadow-xl backdrop-blur-md flex flex-col justify-between relative cursor-pointer hover:border-[#d4ff00]/40 transition-colors duration-300 group"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
          opacity: glare.opacity,
        }}
      />

      <div>
        <div className="mb-4 text-[#d4ff00]">
          <Quote className="h-8 w-8 fill-[#d4ff00] rotate-180" />
        </div>

        <p className="mb-8 text-base font-medium leading-relaxed text-gray-200">
          "{item.text}"
        </p>
      </div>

      <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
        <img
          className="h-12 w-12 rounded-full object-cover border border-white/10"
          src={item.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"}
          alt={item.name}
        />
        <div>
          <h4 className="text-base font-bold text-white leading-snug">{item.name}</h4>
          <p className="text-[#d4ff00] font-bold uppercase text-[10px] tracking-widest mt-0.5">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialCards() {
  const firstItem = testimonials[0];
  const secondItem = testimonials[1];
  const stackedItems = testimonials.slice(2, 4);

  return (
    <div className="w-full max-w-7xl mx-auto py-6">
      {/* 
        Móvil/Tablet: carrusel deslizable continuo (flex + overflow-x-auto)
        Desktop (lg): grilla de 3 columnas puras
      */}
      <div className="flex max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory lg:grid lg:grid-cols-3 gap-8 pb-6 lg:pb-0 scrollbar-none px-4 lg:px-0">
        
        {/* Columna 1: 1 Testimonio */}
        {firstItem && (
          <div className="min-w-[340px] lg:min-w-0 w-full snap-center flex">
            <TiltTestimonialCard item={firstItem} />
          </div>
        )}

        {/* Columna 2: 1 Testimonio */}
        {secondItem && (
          <div className="min-w-[340px] lg:min-w-0 w-full snap-center flex">
            <TiltTestimonialCard item={secondItem} />
          </div>
        )}

        {/* Columna 3: 2 Testimonios apilados (aplica flex-col solo en Desktop) */}
        <div className="flex max-lg:contents lg:flex-col gap-8 min-w-[340px] lg:min-w-0 w-full snap-center">
          {stackedItems.map((item, index) => (
            <div key={index} className="min-w-[340px] lg:min-w-0 w-full snap-center flex">
              <TiltTestimonialCard item={item} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}