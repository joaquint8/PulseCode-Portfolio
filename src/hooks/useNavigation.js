import { useState } from 'react';

export const useNavigation = () => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('es');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
  };

  const toggleLang = () => {
    setLang(prev => (prev === 'es' ? 'en' : 'es'));
  };

  // Textos para el cambio de idioma
  const content = {
    es: { n1: "Servicios", n2: "Portafolio", n3: "Nosotros", n4: "Testimonios", n5: "Contacto", btn: "Solicitar presupuesto" },
    en: { n1: "Services", n2: "Portfolio", n3: "About Us", n4: "Testimonials", n5: "Contact", btn: "Get a quote" }
  };

  const t = content[lang];

  return { isDark, lang, toggleTheme, toggleLang, t };
};