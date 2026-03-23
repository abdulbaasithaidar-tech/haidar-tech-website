import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Lock, Award, Users, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  headline: string;
  body: string;
  cta: string;
  image: string;
  imagePosition: 'left' | 'right';
  index: number;
  badge?: string;
  roadmapItems?: string[];
}

export default function FeatureSection({
  id,
  headline,
  body,
  cta,
  image,
  imagePosition,
  index,
  badge,
  roadmapItems,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const isImageLeft = imagePosition === 'left';
      const imageEnterX = isImageLeft ? '-55vw' : '55vw';
      const textEnterX = isImageLeft ? '18vw' : '-18vw';
      const imageExitX = isImageLeft ? '-10vw' : '10vw';
      const textExitX = isImageLeft ? '18vw' : '-18vw';

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        imageRef.current,
        { x: imageEnterX, opacity: 0.2 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        textRef.current,
        { x: textEnterX, opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Headline lines stagger
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.line');
        scrollTl.fromTo(
          lines,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.08
        );
      }

      // CTA button
      scrollTl.fromTo(
        ctaRef.current,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.18
      );

      // Extras (badge, roadmap items, etc.)
      if (extrasRef.current) {
        const items = extrasRef.current.children;
        scrollTl.fromTo(
          items,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.15
        );
      }

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: textExitX, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: imageExitX, opacity: 0.35, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, [imagePosition]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isImageLeft = imagePosition === 'left';

  // Icon based on section id
  const getIcon = () => {
    switch (id) {
      case 'security':
        return <Lock size={18} className="text-primary" />;
      case 'certification':
        return <Award size={18} className="text-primary" />;
      case 'community':
        return <Users size={18} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned"
      style={{ zIndex: index }}
    >
      {/* Image Tile */}
      <div
        ref={imageRef}
        className={`absolute top-0 h-full w-full lg:w-1/2 ${
          isImageLeft ? 'left-0' : 'right-0 lg:left-1/2'
        }`}
      >
        <div className="relative w-full h-full">
          <img
            src={image}
            alt={headline}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 ${
              isImageLeft
                ? 'bg-gradient-to-l from-background via-background/60 to-transparent lg:from-background lg:via-transparent'
                : 'bg-gradient-to-r from-background via-background/60 to-transparent lg:from-background lg:via-transparent'
            }`}
          />
        </div>
      </div>

      {/* Text Tile */}
      <div
        ref={textRef}
        className={`absolute top-0 h-full w-full lg:w-1/2 flex items-center ${
          isImageLeft ? 'right-0 lg:left-1/2' : 'left-0'
        }`}
      >
        <div
          className={`px-6 lg:px-[4vw] py-20 lg:py-0 ${
            isImageLeft ? 'lg:pl-12' : 'lg:pr-12'
          }`}
        >
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight mb-6"
          >
            {headline.split(' ').map((word, i) => (
              <span key={i} className="line inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h2>

          {/* Body */}
          <p className="text-base lg:text-lg text-white/70 max-w-md leading-relaxed mb-8">
            {body}
          </p>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="btn-secondary flex items-center gap-2 group"
          >
            {getIcon()}
            {cta}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Extras */}
          <div ref={extrasRef} className="mt-8">
            {/* Badge */}
            {badge && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                  {badge}
                </span>
              </div>
            )}

            {/* Roadmap items */}
            {roadmapItems && (
              <div className="space-y-3">
                {roadmapItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
