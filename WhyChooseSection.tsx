import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Target, Shield, Zap, Users, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: Target,
    title: 'Outcome-Focused',
    description: 'Every line of code is tied to measurable results for your revenue, efficiency, or growth.',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built-in security from day one. Auth, encryption, and audit-friendly practices.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Rapid prototyping and agile development. From sketch to live in days, not months.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced developers and designers who have shipped products for diverse industries.',
  },
  {
    icon: MessageCircle,
    title: 'Clear Communication',
    description: 'No technical jargon. Weekly demos, async updates, and decisions you can track.',
  },
  {
    icon: CheckCircle2,
    title: 'Ongoing Support',
    description: 'We don\'t disappear after launch. Monitoring, updates, and continuous improvement.',
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.section-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Built for Reliability
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            We focus on systems that work consistently — not trends or tools for appearance.
          </p>
        </div>

        {/* Reasons Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="p-6 bg-card/50 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
