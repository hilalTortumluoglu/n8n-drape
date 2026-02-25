import Card from '../ui/Card';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'DRAPE has transformed how I present concepts to clients. I can show them exactly what I envision before spending a penny on production.',
      author: 'Isabella Chen',
      title: 'Creative Director, Atelier Chen',
    },
    {
      quote: 'The speed is incredible. What used to take weeks of sampling now takes minutes. This is the future of fashion design.',
      author: 'Marcus Williams',
      title: 'Independent Designer',
    },
    {
      quote: 'As a design student, DRAPE lets me experiment freely without the cost barrier. It\'s democratizing fashion.',
      author: 'Sofia Rodriguez',
      title: 'Fashion Design Student, Parsons',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl mb-4">Loved by Designers</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} hover>
              <p className="font-serif text-lg italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted">{testimonial.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
