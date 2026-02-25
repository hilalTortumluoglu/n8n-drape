import { Link } from 'react-router-dom';
import Logo from './Logo';
import Button from '../ui/Button';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm hover:text-gold transition-colors relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/pricing" className="text-sm hover:text-gold transition-colors relative group">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/studio" className="text-sm hover:text-gold transition-colors relative group">
            Studio
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="hidden md:block">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
