import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import Hero from "@/components/Hero";
import { FooterBackgroundGradient } from "../Footer";
import Contact from "../Contact";
import Services from "../Services";
import Portfolio from "../Portfolio";
import AboutUs from "../AboutUs";
import Testimonials from "../Testimonials";

export function ScrollVisualLanding({
    sections,
    globeConfig,
    visualContent,
    className
}) {
    const [activeSection, setActiveSection] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [visualTransform, setVisualTransform] = useState("");
    const containerRef = useRef(null);
    const sectionRefs = useRef([]);
    const animationFrameId = useRef();

    const calculatedPositions = useMemo(() => {
        return globeConfig.positions.map(pos => ({
            top: parseFloat(pos.top.replace('%', '')),
            left: parseFloat(pos.left.replace('%', '')),
            scale: pos.scale
        }));
    }, [globeConfig.positions]);

    const updateScrollPosition = useCallback(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        setScrollProgress(progress);

        const viewportCenter = window.innerHeight / 2;
        let newActiveSection = 0;
        let minDistance = Infinity;

        sectionRefs.current.forEach((ref, index) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    newActiveSection = index;
                }
            }
        });

        const currentPos = calculatedPositions[newActiveSection] || calculatedPositions[0];
        const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`;

        setVisualTransform(transform);
        setActiveSection(newActiveSection);
    }, [calculatedPositions]);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                animationFrameId.current = requestAnimationFrame(() => {
                    updateScrollPosition();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateScrollPosition();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [updateScrollPosition]);

    return (
        <div ref={containerRef} className={cn("relative w-full overflow-x-hidden min-h-screen flex flex-col bg-black text-white", className)}>

            {/* Progress Bar Top */}
            <div className="fixed top-0 left-0 w-full h-0.5 bg-white/10 z-50">
                <div
                    className="h-full bg-[#ccff00] will-change-transform shadow-[0_0_10px_#ccff00]"
                    style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: 'left center' }}
                />
            </div>

            {/* Floating Visual Element (Logo de PulseCode u otro objeto) */}
            <div
                className="fixed z-10 pointer-events-none will-change-transform transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transform: visualTransform }}
            >
                <div className="scale-75 sm:scale-90 lg:scale-100">
                    {visualContent}
                </div>
            </div>

            {/* Wrapper de Secciones */}
            <div className="flex-grow">
                {sections.map((section, index) => (
                    <section
                        key={section.id}
                        id={section.id}
                        ref={(el) => (sectionRefs.current[index] = el)}
                        className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 z-20 py-8"
                    >
                        {/* Sección inicio */}
                        {section.id === "inicio" && <Hero />}

                        {/* Sección servicios */}
                        {section.id === "servicios" && <Services />}

                        {/* Sección portafolio */}
                        {section.id === "portafolio" && <Portfolio />}

                        {/* Sección portafolio */}
                        {section.id === "equipo" && <AboutUs />}

                        {/* Sección testimonios */}
                        {section.id === "testimonios" && <Testimonials />}

                        {/* Sección contacto */}
                        {section.id === "contacto" && <Contact />}

                        {/* Para el resto de las secciones genéricas (excluimos las personalizadas) */}
                        {!["inicio", "servicios", "portafolio", "contacto"].includes(section.id) && (
                            <div className="max-w-4xl mx-auto w-full">
                                <span className="text-xs font-bold tracking-widest text-[#ccff00] uppercase mb-2 block">
                                    {section.badge}
                                </span>
                                <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
                                    {section.title}
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                                    {section.description}
                                </p>
                            </div>
                        )}
                    </section>
                ))}
            </div>

            <FooterBackgroundGradient />
        </div>
    );
}