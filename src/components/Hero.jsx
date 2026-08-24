import { useNavigation } from '../hooks/useNavigation';
import { useScrollTo } from '../hooks/useScroll';
import { useState } from 'react';
import { ImagesBadge } from './ui/images-badge';
import kazze from "../assets/kazzehome.png";
import fyfhome from "../assets/fyfhome.png";
import mydhome from "../assets/mydhome.png";

const Hero = () => {
  const { isDark } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const { scrollTo } = useScrollTo(() => setIsOpen(false));

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
      <div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] my-8 tracking-tighter">
          Diseñamos software personalizado para tu negocio
        </h1>

        <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'} text-lg mb-10 max-w-lg leading-relaxed`}>
          En PulseCode combinamos estrategia, diseño creativo y desarrollo a medida para crear experiencias web únicas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            onClick={(e) => scrollTo(e, "#portafolio")}
            href="#portafolio"
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
            className="flex items-center justify-center gap-2 px-16 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:scale-101 transition-all"
          >
            <ImagesBadge
              text="Ver Proyectos"
              images={[kazze, fyfhome, mydhome]}
              forceHovered={isCardHovered}
              className="text-white [&_span]:text-white [&_span]:font-semibold"
            />
          </a>
        </div>
      </div>

      {/* Espacio reservado para que el logo/objeto flotante ocupe este cuadrante en el Hero */}
      <div className="hidden lg:block h-[400px] w-full" />
    </div>
  );
};

export default Hero;