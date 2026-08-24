import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import Hero from "@/components/Hero";
import { FooterBackgroundGradient } from "../Footer";
import Contact from "../Contact";
import Services from "../Services";
import Portfolio from "../Portfolio";
import AboutUs from "../AboutUs";
import TestimonialCard from "../TestimonialCard";

export function ScrollVisualLanding({
    sections,
    visualContent,
    className
}) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [curtainOpen, setCurtainOpen] = useState(false);
    const [showPulseRing, setShowPulseRing] = useState(false);

    const [heroVisualStyles, setHeroVisualStyles] = useState({
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0.35) rotate3d(0.4, 1, 0, 35deg)',
        filter: 'blur(18px)',
    });

    const animationFrameId = useRef();

    // Secuencia de entrada: cortina se abre, luego el visual "aterriza"
    useEffect(() => {
        const curtainTimer = setTimeout(() => setCurtainOpen(true), 80);
        const loadTimer = setTimeout(() => setIsLoaded(true), 420);
        return () => {
            clearTimeout(curtainTimer);
            clearTimeout(loadTimer);
        };
    }, []);

    // El anillo se monta solo mientras dura su animación, después se elimina del DOM
    // por completo — así no puede "reaparecer" con su estado base.
    useEffect(() => {
        if (!isLoaded) return;
        setShowPulseRing(true);
        const ringTimer = setTimeout(() => setShowPulseRing(false), 1000);
        return () => clearTimeout(ringTimer);
    }, [isLoaded]);

    const updateScrollEffects = useCallback(() => {
        if (!isLoaded) return;

        const scrollTop = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - viewportHeight;

        const globalProgress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        setScrollProgress(globalProgress);

        const fadeThreshold = viewportHeight * 0.6;
        const rawRatio = Math.min(Math.max(scrollTop / fadeThreshold, 0), 1);

        // Curva de salida: opacidad cae, sube el blur y agrega una leve rotación
        // para que se sienta como que el elemento se "aleja" en vez de solo desvanecer.
        const opacity = Math.max(1 - Math.pow(rawRatio, 1.5), 0);
        const translateY = -rawRatio * 120;
        const scale = 1 - rawRatio * 0.15;
        const blur = rawRatio * 10; // hasta 10px de blur al desaparecer
        const rotate = rawRatio * 8; // hasta 8 grados de rotación al desaparecer

        setHeroVisualStyles({
            opacity: Number(opacity.toFixed(3)),
            transform: `translate3d(-50%, calc(-50% + ${translateY}px), 0) scale(${scale}) rotate3d(0.3, 1, 0, ${rotate}deg)`,
            filter: `blur(${blur.toFixed(1)}px)`,
            visibility: opacity <= 0 ? 'hidden' : 'visible'
        });
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                animationFrameId.current = requestAnimationFrame(() => {
                    updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        updateScrollEffects();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [updateScrollEffects, isLoaded]);

    return (
        <div className={cn("relative w-full overflow-x-hidden min-h-screen flex flex-col bg-black text-white", className)}>

            {/* Cortina de entrada */}
            <div className="fixed inset-0 z-[60] pointer-events-none flex" aria-hidden="true">
                <div
                    className="h-full w-1/2 bg-black transition-transform duration-[400ms] ease-[cubic-bezier(0.83,0,0.17,1)]"
                    style={{ transform: curtainOpen ? 'translateX(-100%)' : 'translateX(0%)' }}
                />
                <div
                    className="h-full w-1/2 bg-black transition-transform duration-[400ms] ease-[cubic-bezier(0.83,0,0.17,1)]"
                    style={{ transform: curtainOpen ? 'translateX(100%)' : 'translateX(0%)' }}
                />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] bg-[#d4ff00] shadow-[0_0_20px_4px_#d4ff00] transition-opacity duration-300"
                    style={{ opacity: curtainOpen ? 0 : 1, transitionDelay: curtainOpen ? '600ms' : '0ms' }}
                />
            </div>

            {/* Progress Bar Top */}
            <div className="fixed top-0 left-0 w-full h-0.5 bg-white/10 z-50">
                <div
                    className="h-full bg-[#d4ff00] will-change-transform shadow-[0_0_10px_#d4ff00]"
                    style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: 'left center' }}
                />
            </div>

            {/* Floating Visual Element */}
            <div
                className={cn(
                    "fixed top-1/2 left-[72%] max-lg:left-1/2 z-10 pointer-events-none will-change-transform",
                    !isLoaded
                        ? "opacity-0 transition-all duration-[1100ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
                        : "opacity-100 transition-none"
                )}
                style={isLoaded ? heroVisualStyles : undefined}
            >
                <div className="scale-75 sm:scale-90 lg:scale-100 relative group">
                    {/* Anillo de pulso: se monta y desmonta solo, no queda residuo */}
                    {showPulseRing && (
                        <div className="absolute -inset-2 rounded-2xl pointer-events-none border border-[#d4ff00]/50 animate-[pulseRing_1s_ease-out_1]" />
                    )}

                    {/* Glow sutil, ligado a la opacidad de scroll */}
                    <div
                        className="absolute -inset-3 bg-[#d4ff00]/4 rounded-2xl blur-2xl pointer-events-none transition-opacity duration-300 -z-10"
                        style={{ opacity: heroVisualStyles.opacity }}
                    />

                    {visualContent}
                </div>
            </div>

            {/* Wrapper de Secciones */}
            <div className="flex-grow">
                {sections.map((section) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 z-20 py-8"
                    >
                        {section.id === "inicio" && <Hero />}
                        {section.id === "servicios" && <Services />}
                        {section.id === "portafolio" && <Portfolio />}
                        {section.id === "equipo" && <AboutUs />}
                        {section.id === "testimonios" && <TestimonialCard />}
                        {section.id === "contacto" && <Contact />}
                    </section>
                ))}
            </div>

            <FooterBackgroundGradient />

            <style>{`
                @keyframes pulseRing {
                    0% { transform: scale(0.95); opacity: 0.8; }
                    70% { opacity: 0.2; }
                    100% { transform: scale(1.15); opacity: 0; }
                }
            `}</style>
        </div>
    );
}