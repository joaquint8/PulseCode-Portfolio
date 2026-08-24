import Navbar from './components/Navbar';
import { ScrollVisualLanding } from './components/ui/landing-page';
import PulseLogo from './components/ui/pulse-logo';
import { useNavigation } from './hooks/useNavigation';
import { cn } from '@/lib/utils';

export const sections = [
  { id: "inicio" },
  { id: "servicios" },
  { id: "portafolio" },
  { id: "equipo" },
  { id: "testimonios" },
  { id: "contacto" }
];

const pulseCodeConfig = {
  positions: [
    { top: "50%", left: "72%", scale: 1.1 },
    { top: "30%", left: "50%", scale: 0.8 },
    { top: "50%", left: "80%", scale: 1.2 },
    { top: "45%", left: "20%", scale: 1.0 },
    { top: "140%", left: "50%", scale: 0.8 },
  ]
};

export default function Home() {
  const { isDark } = useNavigation();

  return (
    <div className={cn(
      "relative min-h-screen w-full transition-colors duration-300",
      isDark ? "bg-black text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Pattern de fondo fino y sutil */}
      <div className="pointer-events-none fixed inset-0 z-20 opacity-5">
        <svg className="h-full w-full" fill="none">
          <defs>
            <pattern id="global-grid-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0L0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#global-grid-pattern)" />
        </svg>
      </div>

      {/* Contenido Landing (z-10) */}
      <div className="relative z-10">
        <Navbar />
        <ScrollVisualLanding
          sections={sections}
          globeConfig={pulseCodeConfig}
          visualContent={<PulseLogo />}
        />
      </div>
    </div>
  );
}