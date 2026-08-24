const PulseLogo = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Resplandor / Glow de fondo usando el tono verde/lima del logo */}
      <div className="absolute inset-0 rounded-full bg-[#ccff00]/20 blur-3xl animate-pulse pointer-events-none" />
      
      {/* Contenedor del Logo con animación de flotado */}
      <div className="relative z-10 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center p-6 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl transition-all duration-500 hover:scale-105">
        <img
          src="LogosinFondo3.png"
          alt="PulseCode Logo"
          className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(204,255,0,0.15)]"
        />
      </div>
    </div>
  );
};

export default PulseLogo;