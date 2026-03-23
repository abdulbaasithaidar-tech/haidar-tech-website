import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  Smartphone, 
  Building2, 
  ShoppingCart, 
  Palette, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: 'Web Applications',
    description: 'Custom web apps built with modern frameworks. Scalable, secure, and optimized for performance.',
    features: ['React & Next.js', 'Node.js Backend', 'Cloud Deployment'],
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    features: ['React Native', 'Flutter', 'iOS & Android'],
  },
  {
    icon: Building2,
    title: 'Enterprise Software',
    description: 'Robust solutions for businesses. CRM, ERP, and internal management systems.',
    features: ['Custom ERP', 'CRM Systems', 'Workflow Automation'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Full-featured online stores with payment integration, inventory, and analytics.',
    features: ['Payment Integration', 'Inventory Management', 'Analytics Dashboard'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that converts. Wireframes, prototypes, and design systems.',
    features: ['User Research', 'Prototyping', 'Design Systems'],
  },
  {
    icon: GraduationCap,
    title: 'Training Programs',
    description: 'Hands-on courses in design, coding, analytics, and more. Virtual and hybrid options.',
    features: ['Live Sessions', 'Certification', 'Mentorship'],
  },
];

export default function ServicesSection() {
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
          { opacity: 0, y: 40 },
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

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            What We Build
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            From concept to deployment, we deliver software solutions that drive real business results.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group cursor-pointer"
                onClick={scrollToContact}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </div>

                <h3 className="font-display font-semibold text-xl text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="text-xs px-3 py-1 bg-white/5 rounded-full text-white/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
