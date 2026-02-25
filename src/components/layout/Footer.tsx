import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
            <Logo />
          </div>

          <div className="flex justify-center gap-6">
            <Link to="/" className="text-sm text-muted hover:text-gold transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="text-sm text-muted hover:text-gold transition-colors">
              Pricing
            </Link>
            <Link to="/studio" className="text-sm text-muted hover:text-gold transition-colors">
              Studio
            </Link>
          </div>

          <div className="flex justify-end gap-4">
            <a href="#" className="text-muted hover:text-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-muted hover:text-gold transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-muted hover:text-gold transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted">
          © 2024 DRAPE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
