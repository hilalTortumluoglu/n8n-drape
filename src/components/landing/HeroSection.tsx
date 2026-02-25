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

          <div className="relative group">
            <div className="bg-white border border-border rounded-lg p-3 shadow-2xl relative overflow-hidden">
              <div className="aspect-[3/4] relative rounded overflow-hidden">
                <img
                  src="https://i.hizliresim.com/m7cob8m.png"
                  alt="Showcase background"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl border border-gold/20 transform group-hover:scale-110 transition-transform duration-500">
                      <span className="text-4xl text-charcoal">✦</span>
                    </div>
                    <p className="text-white font-serif italic text-xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                      Showcase Preview
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-gold/20 rounded-lg blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
