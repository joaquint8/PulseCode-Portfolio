import Navbar from './components/Navbar';
import { ScrollVisualLanding } from './components/ui/landing-page';
import PulseLogo from './components/ui/pulse-logo';
import fyf1 from "./assets/fyf1.webp"; 

export const sections = [
  {
    id: "inicio",
  },
  {
    id: "servicios",
  },
  {
    id: "portafolio"
  },
  {
    id: "equipo"
  },
  {
    id: "testimonios"
  },
  {
    id: "contacto"
  }
];

const pulseCodeConfig = {
  positions: [
    { top: "50%", left: "72%", scale: 1.1 }, // Inicio: A la derecha del texto del Hero
    { top: "30%", left: "50%", scale: 0.8 }, // Servicios: Arriba al centro
    { top: "50%", left: "80%", scale: 1.2 }, // Portafolio: A la derecha
    { top: "45%", left: "20%", scale: 1.0 }, // Nosotros: A la izquierda
    { top: "140%", left: "50%", scale: 0.8 }, // Contacto: Baja fuera de la pantalla (140%) y se achica un poco
  ]
};

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollVisualLanding 
        sections={sections} 
        globeConfig={pulseCodeConfig} 
        visualContent={<PulseLogo />} 
      />
    </>
  );
}