import { Pencil, User, Film, Camera, BookOpen, Share2 } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function FeaturesSection() {
  const features = [
    {
      icon: Pencil,
      title: 'Sketch to Model',
      description: 'Upload clothing sketch, select fabric type, choose model, and generate photorealistic results.',
      active: true,
    },
    {
      icon: User,
      title: 'Virtual Try-On',
      description: 'Upload a photo of yourself and see the design on your own body.',
      comingSoon: true,
    },
    {
      icon: Film,
      title: 'Runway Animation',
      description: 'Animate your model walking the runway or posing in a studio scene.',
      comingSoon: true,
    },
    {
      icon: Camera,
      title: 'Scene Generator',
      description: 'Place your model in a fashion editorial scene: city, studio, or nature.',
      comingSoon: true,
    },
    {
      icon: BookOpen,
      title: 'Lookbook Export',
      description: 'Export a full lookbook PDF with your generated images.',
      comingSoon: true,
    },
    {
      icon: Share2,
      title: 'Client Presentation Mode',
      description: 'Share a private link with clients to browse your collection.',
      comingSoon: true,
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl mb-4">Complete Fashion AI Suite</h2>
          <p className="text-muted text-lg">Professional tools for the modern fashion designer</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover={!feature.comingSoon} className="relative">
              {feature.comingSoon && (
                <div className="absolute top-4 right-4">
                  <Badge variant="muted">Coming Soon</Badge>
                </div>
              )}
              {feature.active && (
                <div className="absolute top-4 right-4">
                  <Badge variant="gold">Active</Badge>
                </div>
              )}
              <feature.icon className="w-12 h-12 mb-4 text-gold" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
