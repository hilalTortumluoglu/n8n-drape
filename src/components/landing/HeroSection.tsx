import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="font-serif text-7xl leading-tight">
              From Sketch to Runway, Instantly.
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Turn your fashion sketches into photorealistic model shots — before a single stitch is made.
            </p>
            <div className="flex gap-4">
              <Link to="/studio">
                <Button variant="primary">Start Creating</Button>
              </Link>
              <Button variant="ghost">
                <Play size={16} className="mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white border border-border rounded-lg p-8 shadow-2xl">
              <div className="aspect-[3/4] bg-gradient-to-br from-ivory to-border rounded flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center border border-border">
                    <span className="text-4xl">✦</span>
                  </div>
                  <p className="text-muted">Your design preview</p>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gold/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
