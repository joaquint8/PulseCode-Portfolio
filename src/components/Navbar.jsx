import { Menu, X } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { useState } from 'react';
import { useScrollTo } from '../hooks/useScroll';

const Navbar = () => {
  const { t } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const { scrollTo } = useScrollTo(() => setIsOpen(false));

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-opacity-80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex flex-col justify-center">

        <div className="flex justify-between items-center">

          {/* Logo */}
          <a href="#inicio" className="flex items-center h-full">
            <img 
              src="LogosinFondo4.png" 
              alt="PulseCode" 
              className="h-30 w-auto object-contain" 
            />
          </a>

          {/* Links Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <a onClick={(e) => scrollTo(e, "#servicios")} href="#servicios" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest"> {t.n1} </a>
            <a onClick={(e) => scrollTo(e, "#portafolio")} href="#portafolio" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">{t.n2}</a>
            <a onClick={(e) => scrollTo(e, "#nosotros")} href="#nosotros" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">{t.n3}</a>
            <a onClick={(e) => scrollTo(e, "#testimonios")} href="#testimonios" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">{t.n4}</a>
            <a onClick={(e) => scrollTo(e, "#contacto")} href="#contacto" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">{t.n5}</a>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Botón SOLO desktop */}
            <a 
              href="#contacto" 
              className="hidden lg:block btn-lime px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-101 transition-all text-black text-xs"
            >
              {t.btn}
            </a>

            {/* (solo mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>

          </div>
        </div>
      </div>

      {/* Menú Mobile */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="flex flex-col px-6 pb-6 pt-6 gap-4 bg-black/90 backdrop-blur-md">

          <a onClick={(e) => scrollTo(e, "#servicios")} href="#servicios" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest"> {t.n1} </a>
          <a onClick={(e) => scrollTo(e, "#portafolio")} href="#portafolio" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">{t.n2}</a>
          <a onClick={(e) => scrollTo(e, "#nosotros")} href="#nosotros" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">{t.n3}</a>
          <a onClick={(e) => scrollTo(e, "#testimonios")} href="#testimonios" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">{t.n4}</a>
          <a onClick={(e) => scrollTo(e, "#contacto")} href="#contacto" className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest">{t.n5}</a>

          <a
            href="#contacto"
            onClick={(e) => scrollTo(e, "#contacto")}
            className="btn-lime px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center"
          >
            {t.btn}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;