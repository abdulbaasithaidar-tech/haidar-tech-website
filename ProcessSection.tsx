import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Lightbulb, Code, GraduationCap, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery',
    description: 'We start by understanding your business goals, challenges, and requirements through detailed consultation.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy & Design',
    description: 'We create a tailored solution blueprint with wireframes, prototypes, and technical architecture.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Our team builds your solution using modern technologies, with regular updates and demos.',
  },
  {
    number: '04',
    icon: GraduationCap,
    title: 'Training',
    description: 'We train your team on usage, management, and basic troubleshooting for smooth operation.',
  },
  {
    number: '05',
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'Continuous monitoring, updates, and support to ensure your system performs at its best.',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      const stepElements = stepsRef.current?.children;
      if (stepElements) {
        gsap.fromTo(
          stepElements,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            scrollTrigger: {
              trigger: stepsRef.current,
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
      id="process"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-card/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
            Our Process
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            How We Work
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A structured approach that ensures your project is delivered on time, on budget, and exceeds expectations.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-14 w-px h-[calc(100%-3.5rem)] bg-white/10" />
                )}

                {/* Icon/Number */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Icon size={20} className="text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-primary/60">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
