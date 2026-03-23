import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Clock, Users, Award, MonitorPlay } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trainingPrograms = [
  {
    id: 1,
    title: 'UI/UX Design',
    description: 'Master user interface and experience design. Learn Figma, design systems, prototyping, and user research.',
    image: '/uiux-design.jpg',
    duration: '8 Weeks',
    mode: 'Virtual & Hybrid',
    level: 'Beginner Friendly',
    certification: 'Yes',
    icon: MonitorPlay,
  },
  {
    id: 2,
    title: 'Coding & Development',
    description: 'Learn full-stack development with modern technologies. HTML, CSS, JavaScript, React, and backend fundamentals.',
    image: '/coding.jpg',
    duration: '12 Weeks',
    mode: 'Virtual & Hybrid',
    level: 'Beginner Friendly',
    certification: 'Yes',
    icon: Users,
  },
  {
    id: 3,
    title: 'Data Analytics',
    description: 'Transform data into insights. Learn Excel, SQL, Python, data visualization, and business intelligence tools.',
    image: '/data-analytics.jpg',
    duration: '10 Weeks',
    mode: 'Virtual & Hybrid',
    level: 'Beginner Friendly',
    certification: 'Yes',
    icon: Award,
  },
  {
    id: 4,
    title: 'Graphic Design',
    description: 'Create stunning visuals with industry-standard tools. Photoshop, Illustrator, branding, and digital design.',
    image: '/graphic-design.jpg',
    duration: '8 Weeks',
    mode: 'Virtual & Hybrid',
    level: 'Beginner Friendly',
    certification: 'Yes',
    icon: MonitorPlay,
  },
];

export default function TrainingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trainingPrograms.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trainingPrograms.length) % trainingPrograms.length);
  };

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

      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProgram = trainingPrograms[currentIndex];
  const Icon = currentProgram.icon;

  return (
    <section
      id="training"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
            Training Academy
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Learn by Building
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Practical, hands-on courses taught by industry professionals. 
            Virtual and hybrid learning for beginners.
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image Side */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-card">
              {trainingPrograms.map((program, index) => (
                <div
                  key={program.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
              ))}

              {/* Navigation Arrows */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {trainingPrograms.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-primary'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:pl-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon size={24} className="text-primary" />
                </div>
                <span className="text-sm text-white/50 font-mono uppercase tracking-wider">
                  Course {currentIndex + 1} of {trainingPrograms.length}
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4 transition-all duration-300">
                {currentProgram.title}
              </h3>

              <p className="text-white/60 text-lg mb-8 leading-relaxed transition-all duration-300">
                {currentProgram.description}
              </p>

              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-white/5">
                  <Clock size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-white/50">Duration</p>
                    <p className="text-sm text-white font-medium">{currentProgram.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-white/5">
                  <Users size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-white/50">Mode</p>
                    <p className="text-sm text-white font-medium">{currentProgram.mode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-white/5">
                  <Award size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-white/50">Certification</p>
                    <p className="text-sm text-white font-medium">{currentProgram.certification}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-white/5">
                  <MonitorPlay size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-white/50">Level</p>
                    <p className="text-sm text-white font-medium">{currentProgram.level}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary w-full sm:w-auto"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
