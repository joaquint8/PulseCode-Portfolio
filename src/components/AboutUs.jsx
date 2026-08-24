import React from 'react';
import { Linkedin } from 'lucide-react';
import joaco from "../assets/joaco.jpeg";
import clara from "../assets/clara.jpg";
import { useNavigation } from '../hooks/useNavigation';
import { cn } from '@/lib/utils';

export default function AboutUs() {
  const { isDark } = useNavigation();

  const members = [
    {
      name: "CLARA MIÑO",
      designation: "FullStack Developer • Técnica Univ. en Programación",
      imageSrc: clara,
      socialLinks: [
        { icon: Linkedin, href: "https://www.linkedin.com/in/clara-mino/" }
      ]
    },
    {
      name: "JOAQUIN PAVONE",
      designation: "FullStack Developer • Técnico Informático",
      imageSrc: joaco,
      socialLinks: [
        { icon: Linkedin, href: "https://www.linkedin.com/in/joaquin-pavone/" }
      ]
    }
  ];

  return (
    <section id="nosotros">
      <div className="container relative z-10 mx-auto grid items-center justify-center gap-12 px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex w-full flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
          <div className="grid gap-2">
            <span className="text-[#d4ff00] font-bold text-xs tracking-[0.3em] uppercase">
              SOBRE NOSOTROS
            </span>
            <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl">
              Somos <span className="text-[#d4ff00]">PulseCode</span>
            </h2>
            <p className={cn("max-w-[600px] text-base md:text-lg", isDark ? "text-gray-400" : "text-slate-600")}>
              Transformamos ideas en sistemas modernos, rápidos y seguros.
            </p>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 items-stretch">
          {members.map((member, index) => (
            <div
              key={index}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 text-center border transition-all duration-300 hover:scale-[1.02] h-full",
                isDark 
                  ? "bg-white/5 border-white/10 hover:border-[#d4ff00]/40 shadow-2xl" 
                  : "bg-white border-slate-200 shadow-lg hover:shadow-xl"
              )}
            >
              {/* Background wave animation */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 rounded-t-full bg-gradient-to-t from-[#d4ff00]/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                style={{ transitionDelay: `${index * 50}ms` }}
              />

              {/* Top content wrapper to keep alignment */}
              <div className="flex flex-col items-center">
                {/* Member Image */}
                <div
                  className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-transparent bg-background/20 transition-all duration-500 ease-out group-hover:border-[#d4ff00] group-hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Middle / Text info container */}
              <div className="my-auto py-6 flex flex-col items-center">
                <h3 className="relative z-10 text-xl font-bold tracking-tight">
                  {member.name}
                </h3>
                
                {/* Fixed height wrapper for designation to guarantee symmetry even if lines wrap differently */}
                <div className="relative z-10 mt-1 min-h-[2.5rem] flex items-center justify-center">
                  <p className={cn("text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-400" : "text-slate-500")}>
                    {member.designation}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              {member.socialLinks && (
                <div className="relative z-10 flex justify-center gap-4 opacity-100 transition-opacity duration-300 ease-in-out md:opacity-0 md:group-hover:opacity-100">
                  {member.socialLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#0077b5] transition-colors"
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}