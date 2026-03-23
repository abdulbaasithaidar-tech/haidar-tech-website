import { Phone, Mail } from 'lucide-react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5">
          {/* Contact Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+2348028132939"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 hover:text-white transition-colors"
            >
              <Phone size={14} className="text-primary" />
              <span className="hidden sm:inline">+234 802 8132 939</span>
            </a>
            <a
              href="mailto:haidartechhub@gmail.com"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 hover:text-white transition-colors"
            >
              <Mail size={14} className="text-primary" />
              <span className="hidden sm:inline">haidartechhub@gmail.com</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/haidartech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://twitter.com/haidartech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://linkedin.com/company/haidartech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com/haidartech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
