import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Pricing() {
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

  const comparisonFeatures = [
    { name: 'Monthly Generations', atelier: '5', studio: '100', maison: 'Unlimited' },
    { name: 'Active Tools', atelier: '1', studio: 'All', maison: 'All' },
    { name: 'Watermark', atelier: true, studio: false, maison: false },
    { name: 'HD Export', atelier: false, studio: true, maison: true },
    { name: 'API Access', atelier: false, studio: false, maison: true },
    { name: 'Team Seats', atelier: '1', studio: '1', maison: '3' },
    { name: 'White-label Links', atelier: false, studio: false, maison: true },
    { name: 'Support', atelier: 'Community', studio: 'Email', maison: 'Priority' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-6xl mb-4">Choose Your Plan</h1>
            <p className="text-muted text-xl">Scale your creative workflow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
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

          <div className="bg-white border border-border rounded-lg overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-serif">Feature Comparison</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Atelier</th>
                    <th className="text-center p-4 font-semibold bg-gold/10">Studio</th>
                    <th className="text-center p-4 font-semibold">Maison</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="p-4 text-sm">{feature.name}</td>
                      <td className="p-4 text-center text-sm">
                        {typeof feature.atelier === 'boolean' ? (
                          feature.atelier ? (
                            <Check size={20} className="inline text-gold" />
                          ) : (
                            <X size={20} className="inline text-muted" />
                          )
                        ) : (
                          feature.atelier
                        )}
                      </td>
                      <td className="p-4 text-center text-sm bg-gold/5">
                        {typeof feature.studio === 'boolean' ? (
                          feature.studio ? (
                            <Check size={20} className="inline text-gold" />
                          ) : (
                            <X size={20} className="inline text-muted" />
                          )
                        ) : (
                          feature.studio
                        )}
                      </td>
                      <td className="p-4 text-center text-sm">
                        {typeof feature.maison === 'boolean' ? (
                          feature.maison ? (
                            <Check size={20} className="inline text-gold" />
                          ) : (
                            <X size={20} className="inline text-muted" />
                          )
                        ) : (
                          feature.maison
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
