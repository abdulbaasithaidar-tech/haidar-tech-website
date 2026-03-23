import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'Web Application',
  'Mobile App',
  'Enterprise Software',
  'E-commerce Platform',
  'UI/UX Design',
  'Training Program',
];

const budgetRanges = [
  'Below ₦500,000',
  '₦500,000 - ₦1,000,000',
  '₦1,000,000 - ₦5,000,000',
  '₦5,000,000+',
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent! We\'ll get back to you within 2 business days.');
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      budget: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-card/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-header text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Let's Build Something Useful
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tell us what you're building. We'll reply within 2 business days.
          </p>
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-card rounded-2xl border border-white/5 p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm text-white/70 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm text-white/70 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors"
                placeholder="Your company"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-background">
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service} value={service} className="bg-background">
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-white/70 mb-2">Budget Range</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="bg-background">
                Select budget range
              </option>
              {budgetRanges.map((range) => (
                <option key={range} value={range} className="bg-background">
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-white/70 mb-2">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
