import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const trustedBy = [
  'Startups',
  'Enterprises',
  'Finance',
  'Education',
  'Food Industry',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2
      );

      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.4
      );

      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        0.5
      );

      tl.fromTo(
        trustedRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-primary font-medium">
              Software Development & Training Academy
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] tracking-tight mb-6"
          >
            Build. Train. Scale.{' '}
            <span className="gradient-text">Software that delivers results.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed mb-8"
          >
            We build websites, apps, and enterprise software that solves real problems. 
            Every line of code tied to measurable outcomes for your revenue, efficiency, or growth.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary flex items-center gap-2 group"
            >
              Start a Project
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollToSection('#training')}
              className="btn-secondary"
            >
              Explore Courses
            </button>
          </div>

          {/* Trusted By */}
          <div ref={trustedRef}>
            <p className="text-sm text-white/50 mb-4">Trusted by teams across:</p>
            <div className="flex flex-wrap items-center gap-3">
              {trustedBy.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg"
                >
                  <CheckCircle2 size={16} className="text-primary" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
