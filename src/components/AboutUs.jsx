import { useNavigation } from '../hooks/useNavigation';
import nosotros from "../assets/nosotros.jpeg";
 
const AboutUs = () => {
  const { isDark } = useNavigation();

  return (
    <section id="nosotros" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        <img
          loading='lazy'
          src={nosotros}
          className="hidden lg:block w-full h-full object-cover rounded-[40px] transition-all duration-700"
          alt="Equipo PulseCode"
        />

        <div>
          <span className="text-[#d4ff00] font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
            Equipo
          </span>

          <h2 className={`text-4xl font-extrabold mb-8 tracking-tighter leading-tight ${isDark ? 'text-white' : 'text-slate-900'
            }`}>
            Somos PulseCode: un enfoque obsesivo por el detalle
          </h2>

          <p className={`text-lg mb-12 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
           Transformamos ideas en páginas web modernas, rápidas y seguras.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Tarjeta Clara */}
            <div className={`glass-card p-8 rounded-[32px] border-l-4 border-l-brandPurple flex flex-col items-start ${!isDark && 'bg-slate-50'
              }`}>
              <h4 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Clara Miño
              </h4>
              <div className="text-[#d4ff00] text-[10px] font-bold uppercase mb-4 tracking-widest">
                <p className='py-1'>FullStack developer</p>
                <p>Técnica Universitaria en programación</p>
              </div>

              <a
                href="https://www.linkedin.com/in/clara-mino/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#0077b5] transition-all group"
              >
                {/* SVG de LinkedIn */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:fill-[#0077b5] group-hover:stroke-[#0077b5] transition-colors align-middle"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="leading-none">LinkedIn</span>
              </a>
            </div>

            {/* Tarjeta Joaquin */}
            <div className={`glass-card p-8 rounded-[32px] border-l-4 border-l-brandLime flex flex-col items-start ${!isDark && 'bg-slate-50'
              }`}>
              <h4 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Joaquin Pavone
              </h4>
              <div className="text-[#d4ff00] text-[10px] font-bold uppercase mb-4 tracking-widest">
                <p className='py-1'>FullStack developer</p>
                <p>Técnico Informático</p>
              </div>
              <a
                href="https://www.linkedin.com/in/joaquin-pavone/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#0077b5] transition-all group"
              >
                {/* SVG de LinkedIn */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:fill-[#0077b5] group-hover:stroke-[#0077b5] transition-colors align-middle"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="leading-none">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;