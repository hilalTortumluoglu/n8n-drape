import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function PricingSection() {
  const plans = [
    {
      name: 'Atelier',
      price: 'Free',
      features: [
        '5 generations per month',
        '1 active tool',
        'Watermarked exports',
        'Community support',
      ],
    },
    {
      name: 'Studio',
      price: '$29',
      period: '/month',
      popular: true,
      features: [
        '100 generations per month',
        'All tools (when released)',
        'No watermark',
        'HD export quality',
        'Email support',
      ],
    },
    {
      name: 'Maison',
      price: '$99',
      period: '/month',
      features: [
        'Unlimited generations',
        'API access',
        '3 team seats',
        'White-label client links',
        'Priority support',
        'Custom model training',
      ],
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl mb-4">Choose Your Plan</h2>
          <p className="text-muted text-lg">Scale your creative workflow</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              hover
              className={plan.popular ? 'border-2 border-gold relative' : ''}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="gold">Most Popular</Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-serif">{plan.price}</span>
                  {plan.period && <span className="text-muted">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={20} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup" className="block">
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  Get Started
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
