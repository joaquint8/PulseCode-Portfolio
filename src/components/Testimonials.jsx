import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { testimonials } from '../constants/testimonialsData';

const Testimonials = () => {
  const { isDark } = useNavigation();
  const [current, setCurrent] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setIsFading(false);
    }, 400);
  };

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsFading(false);
    }, 400);
  };

  return (
    <section id="testimonios" className={`py-12 md:py-24 px-4 sm:px-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
      <div className="mx-auto">
        <span className="text-[#d4ff00] font-bold text-xs uppercase tracking-[0.3em] mb-3 md:mb-4 block">
          Testimonios
        </span>
        <h2 className={`text-3xl md:text-4xl font-extrabold mb-8 md:mb-16 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Lo que dicen nuestros clientes
        </h2>

        {/* Tarjeta principal optimizada para responsive */}
        <div className={`glass-card p-6 sm:p-8 md:p-12 rounded-[24px] sm:rounded-[32px] relative overflow-hidden transition-colors min-h-[360px] sm:min-h-[320px] flex flex-col justify-between ${!isDark && 'bg-slate-50 border-slate-200'}`}>
          
          <div className="flex gap-4 sm:gap-6 md:gap-10 items-stretch my-auto">
            {/* Columna lateral estilizada y adaptada a móvil */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-[2px] sm:w-[3px] flex-1 bg-[#d4ff00] min-h-[20px] sm:min-h-[40px]" />
              <Quote className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 my-2 sm:my-3 text-[#d4ff00] fill-[#d4ff00] rotate-180 shrink-0" />
              <div className="w-[2px] sm:w-[3px] flex-1 bg-[#d4ff00] min-h-[20px] sm:min-h-[40px]" />
            </div>

            {/* Contenido animado */}
            <div
              className={`flex-1 flex flex-col justify-between transition-all duration-300 transform ${
                isFading ? 'opacity-0 -translate-x-4 sm:-translate-x-6' : 'opacity-100 translate-x-0'
              }`}
            >
              {/* Texto adaptable */}
              <p
                className={`text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-6 ${
                  isDark ? 'text-gray-100' : 'text-slate-800'
                }`}
              >
                {testimonials[current].text}
              </p>

              {/* Pie de autor y navegación (columna en móvil, fila en escritorio) */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pt-2">
                <div className="sm:ml-auto sm:text-right">
                  <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {testimonials[current].name}
                  </h4>
                  <p className="text-[#d4ff00] font-bold uppercase text-[10px] sm:text-[11px] tracking-widest mt-0.5">
                    {testimonials[current].role}
                  </p>
                </div>

                {/* Botones de navegación */}
                <div className="flex gap-3 justify-end sm:justify-start">
                  <button
                    onClick={handlePrev}
                    className={`cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all ${
                      isDark
                        ? 'border-white/10 hover:bg-white/5 bg-white/[0.02]'
                        : 'border-slate-200 hover:bg-slate-100 bg-white'
                    }`}
                  >
                    <ChevronLeft className={`w-4 h-4 ${isDark ? 'text-white' : 'text-slate-600'}`} />
                  </button>

                  <button
                    onClick={handleNext}
                    className={`cursor-pointer w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all ${
                      isDark
                        ? 'border-white/10 hover:bg-white/5 bg-white/[0.02]'
                        : 'border-slate-200 hover:bg-slate-100 bg-white'
                    }`}
                  >
                    <ChevronRight className={`w-4 h-4 ${isDark ? 'text-white' : 'text-slate-600'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;