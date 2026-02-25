export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload & Select',
      description: 'Upload your sketch and select fabric type',
    },
    {
      number: '02',
      title: 'Choose Model',
      description: 'Choose or upload a model',
    },
    {
      number: '03',
      title: 'Generate',
      description: 'See your design come alive',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl mb-4">How It Works</h2>
          <p className="text-muted text-lg">Three simple steps to bring your vision to life</p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gold hidden md:block"></div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gold rounded-full flex items-center justify-center text-charcoal font-serif text-2xl font-bold relative z-10">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
