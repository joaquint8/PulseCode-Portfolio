import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { sendEmail } from '../services/emailService';
import { showError, showLoading, showSuccess } from '../utils/alerts';
import { TextHoverEffect } from './Footer';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { Instagram } from 'lucide-react';

const ContactFooter = () => {
  const { isDark } = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading();

    sendEmail(e.target)
      .then(() => {
        showSuccess();
        e.target.reset();
      })
      .catch(() => {
        showError();
      });
  };

  return (
    <footer className={`w-full transition-colors ${isDark ? 'bg-black/80 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Contenedor Grid Principal */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch border rounded-3xl p-8 md:p-12 overflow-hidden ${isDark ? 'bg-zinc-950/50 border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>

          {/* Columna Izquierda: Información de Contacto */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-[#d4ff00] font-bold text-[10px] uppercase tracking-[0.3em] mb-3 block">
                CONTACTO
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                ¿Tenés un{' '}
                <PointerHighlight
                  rectangleClassName="border-[#d4ff00]"
                  pointerClassName="text-[#d4ff00]"
                >
                  <i className="relative z-10 px-1">proyecto?</i>
                </PointerHighlight>
              </h2>
              <p className={`text-base leading-relaxed max-w-md ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Si tenés alguna duda sobre nuestros servicios o necesitás asesoramiento para tu proyecto, completá el formulario.
              </p>
            </div>

            {/* Grid de Cards de Información */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {/* Card Email */}
              <div className={`flex items-start gap-4 p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10 text-[#d4ff00]' : 'bg-white border-slate-200 text-[#d4ff00]'
                  }`}>
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Instagram</p>
                  <a href="https://www.instagram.com/pulsecode.software/" className="text-sm font-semibold hover:text-[#d4ff00] transition-colors block" target='blank'>
                    pulsecode.software
                  </a>
                </div>
              </div>

              {/* Card WhatsApp / Teléfono */}
              <div className={`flex items-start gap-4 p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10 text-[#d4ff00]' : 'bg-white border-slate-200 text-[#d4ff00]'
                  }`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">WhatsApp</p>
                  <a href="https://wa.me/5492324520871" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold hover:text-[#d4ff00] transition-colors block">
                    2324 520871
                  </a>
                  <a href="https://wa.me/5492346599278" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold hover:text-[#d4ff00] transition-colors block">
                    2346 599278
                  </a>
                </div>
              </div>

              {/* Card Ubicación */}
              <div className={`flex items-start gap-4 p-4 rounded-2xl border sm:col-span-2 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10 text-[#d4ff00]' : 'bg-white border-slate-200 text-[#d4ff00]'
                  }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Ubicación</p>
                  <p className="text-sm font-semibold">
                    Chivilcoy, Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className={`lg:col-span-6 lg:border-l lg:pl-12 flex flex-col justify-center ${isDark ? 'lg:border-white/10' : 'lg:border-slate-200'
            }`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wide text-gray-400">
                  Nombre
                </label>
                <input
                  name="user_name"
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all ${isDark
                      ? 'bg-white/5 border-white/10 focus:border-[#d4ff00] text-white placeholder:text-zinc-600'
                      : 'bg-slate-50 border-slate-200 focus:border-[#d4ff00] text-slate-900 placeholder:text-slate-400'
                    }`}
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wide text-gray-400">
                  Email
                </label>
                <input
                  name="user_email"
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all ${isDark
                      ? 'bg-white/5 border-white/10 focus:border-[#d4ff00] text-white placeholder:text-zinc-600'
                      : 'bg-slate-50 border-slate-200 focus:border-[#d4ff00] text-slate-900 placeholder:text-slate-400'
                    }`}
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wide text-gray-400">
                  Teléfono
                </label>
                <input
                  name="user_phone"
                  type="tel"
                  placeholder="+54 9 2346..."
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none border transition-all ${isDark
                      ? 'bg-white/5 border-white/10 focus:border-[#d4ff00] text-white placeholder:text-zinc-600'
                      : 'bg-slate-50 border-slate-200 focus:border-[#d4ff00] text-slate-900 placeholder:text-slate-400'
                    }`}
                />
              </div>

              {/* Mensaje */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wide text-gray-400">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="¿En qué podemos ayudarte?"
                  className={`w-full rounded-xl px-4 py-3 text-sm outline-none border resize-none transition-all ${isDark
                      ? 'bg-white/5 border-white/10 focus:border-[#d4ff00] text-white placeholder:text-zinc-600'
                      : 'bg-slate-50 border-slate-200 focus:border-[#d4ff00] text-slate-900 placeholder:text-slate-400'
                    }`}
                ></textarea>
              </div>

              {/* Botón Enviar */}
              <button
                type="submit"
                className="w-full bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#d4ff00]/10 mt-2"
              >
                <Send className="w-4 h-4" />
                Enviar mensaje
              </button>
            </form>
          </div>

        </div>

        {/* Efecto de Texto PulseCode en Grande */}
        <div className="w-full h-[10rem] md:h-[14rem] flex items-center justify-center mt-12">
          <TextHoverEffect text="PulseCode" />
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 pt-8 mt-4 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">
            © 2026 PulseCode • Desarrollo de software
          </p>
        </div>

      </div>
    </footer>
  );
};

export default ContactFooter;