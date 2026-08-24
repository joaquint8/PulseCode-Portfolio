import { useState, useRef, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../constants/testimonialsData';

function TiltTestimonialCard({ item }) {
  const cardRef = useRef(null);
  const requestRef = useRef(null);

  const [canTilt] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );

  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !canTilt) return;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Guardamos la posición relativa del mouse para el borde brillante
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    requestRef.current = requestAnimationFrame(() => {
      const maxTilt = 8;
      setTransform(`perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.015, 1.015, 1.015)`);
      setGlare({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
        opacity: 0.12,
      });
    });
  };

  const handleMouseEnter = () => {
    if (!canTilt) return;
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
        transform: canTilt ? transform : 'none',
        transition: isHovered ? 'none' : 'transform 0.5s ease, box-shadow 0.3s ease',
        willChange: 'transform',
        touchAction: canTilt ? 'pan-y' : 'auto',
        // Sombra de luz trasera en color #d4ff00 muy sutil al hacer hover
        boxShadow: isHovered ? '0 10px 30px -10px rgba(212, 255, 0, 0.15)' : '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
      }}
      className="glass-card w-full rounded-[24px] border border-white/10 bg-black/40 p-5 sm:p-6 backdrop-blur-md flex flex-col justify-between relative cursor-pointer transition-colors duration-300 group overflow-hidden"
    >
      {/* EFECTO NUEVO: Borde de luz que sigue al cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,255,0,0.35), transparent 70%)`
        }}
      />

      {/* Capa interna para asegurar el fondo negro y tapar el centro del borde brillante */}
      <div className="absolute inset-[1px] rounded-[23px] bg-black/85 z-0 pointer-events-none" />

      {/* Brillo interno tipo cristal (Glare) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 65%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Contenido de la Card (con z-20 para que quede arriba de las capas de efectos) */}
      <div className="relative z-20">
        <div className="mb-2 sm:mb-3 text-[#d4ff00]">
          <Quote className="h-6 w-6 sm:h-7 sm:w-7 fill-[#d4ff00] rotate-180" />
        </div>

        <p className="mb-4 sm:mb-5 text-sm sm:text-[15px] font-medium leading-relaxed text-gray-200">
          "{item.text}"
        </p>
      </div>

      <div className="relative z-20 flex items-center space-x-3 pt-3 border-t border-white/5">
        <img
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border border-white/10 shrink-0"
          src={item.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"}
          alt={item.name}
        />
        <div>
          <h4 className="text-sm font-bold text-white leading-snug">{item.name}</h4>
          <p className="text-[#d4ff00] font-bold uppercase text-[10px] tracking-widest mt-0.5">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialCards() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const firstItem = testimonials[0];
  const secondItem = testimonials[1];
  const stackedItems = testimonials.slice(2, 4);

  const mobileSlideCount = [firstItem, secondItem, ...stackedItems].filter(Boolean).length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cardWidth = el.firstElementChild?.offsetWidth || 1;
        const gap = 32; // gap-8
        const index = Math.round(el.scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.min(Math.max(index, 0), mobileSlideCount - 1));
        ticking = false;
      });
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [mobileSlideCount]);

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6">
      <div
        ref={scrollRef}
        className="flex max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory lg:grid lg:grid-cols-3 gap-6 sm:gap-8 pb-6 lg:pb-0 scrollbar-none px-4 lg:px-0 scroll-px-4"
      >
        {firstItem && (
          <div className="min-w-[85vw] sm:min-w-[340px] lg:min-w-0 w-full snap-center flex">
            <TiltTestimonialCard item={firstItem} />
          </div>
        )}

        {secondItem && (
          <div className="min-w-[85vw] sm:min-w-[340px] lg:min-w-0 w-full snap-center flex">
            <TiltTestimonialCard item={secondItem} />
          </div>
        )}

        <div className="flex max-lg:contents lg:flex-col gap-6 sm:gap-8 min-w-[85vw] sm:min-w-[340px] lg:min-w-0 w-full snap-center">
          {stackedItems.map((item, index) => (
            <div key={index} className="min-w-[85vw] sm:min-w-[340px] lg:min-w-0 w-full snap-center flex">
              <TiltTestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex lg:hidden justify-center items-center gap-2 mt-4">
        {Array.from({ length: mobileSlideCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            aria-label={`Ir al testimonio ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'w-6 bg-[#d4ff00]' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}