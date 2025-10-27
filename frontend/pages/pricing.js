import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      period: 'forever',
      description: 'Perfect for students getting started',
      features: [
        '✅ Up to 100 events per month',
        '✅ Basic timetable management',
        '✅ 1 calendar integration',
        '✅ Task management',
        '✅ Email reminders',
        '✅ Mobile app access',
        '❌ AI-powered automation',
        '❌ Analytics dashboard',
        '❌ Priority support',
      ],
      cta: 'Get Started Free',
      ctaLink: '/signup',
      popular: false,
    },
    {
      name: 'Pro',
      price: '9',
      period: 'month',
      description: 'For professionals who need more power',
      features: [
        '✅ Unlimited events',
        '✅ Advanced timetable features',
        '✅ Unlimited calendar integrations',
        '✅ AI-powered smart scheduling',
        '✅ Advanced reminders & notifications',
        '✅ Analytics & insights',
        '✅ n8n workflow automation',
        '✅ Priority email support',
        '✅ Export & backup data',
      ],
      cta: 'Start Pro Trial',
      ctaLink: '/signup?plan=pro',
      popular: true,
    },
    {
      name: 'Team',
      price: '29',
      period: 'month',
      description: 'For teams and organizations',
      features: [
        '✅ Everything in Pro',
        '✅ Up to 10 team members',
        '✅ Shared calendars & events',
        '✅ Team collaboration tools',
        '✅ Admin dashboard',
        '✅ Custom integrations',
        '✅ Advanced security',
        '✅ Dedicated support',
        '✅ SLA guarantee',
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the difference.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for Team plans.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Pro and Team plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time from your account settings. No questions asked.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students get 50% off Pro plans with a valid .edu email address. Contact support to claim your discount.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your data is kept for 30 days after cancellation. You can export it anytime or reactivate your account to restore access.'
    },
  ];

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Hero */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-textSecondary mb-8">
            Choose the plan that's right for you. No hidden fees. Cancel anytime.
          </p>
          <div className="inline-flex items-center gap-2 bg-success/10 border border-success/30 px-4 py-2 rounded-full">
            <span className="text-success">🎉</span>
            <span className="text-success font-semibold">7-day free trial on all paid plans</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative bg-surface rounded-xl border-2 p-8 ${
                  plan.popular 
                    ? 'border-accent shadow-xl shadow-accent/20 scale-105' 
                    : 'border-highlight'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-background px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-textPrimary">{plan.name}</h3>
                  <p className="text-textSecondary text-sm mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-accent">${plan.price}</span>
                    <span className="text-textSecondary">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`text-sm ${
                      feature.startsWith('❌') ? 'text-textSecondary' : 'text-textPrimary'
                    }`}>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={plan.ctaLink}
                  className={`block text-center font-semibold px-6 py-3 rounded-xl transition-all ${
                    plan.popular
                      ? 'bg-accent hover:bg-[#B89658] text-background shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'border-2 border-highlight hover:border-accent text-textPrimary hover:text-accent hover:bg-surface'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Compare Plans</h2>
          <div className="bg-surface rounded-xl border border-highlight overflow-hidden">
            <table className="w-full">
              <thead className="bg-highlight/30 border-b border-highlight">
                <tr>
                  <th className="text-left p-4 text-textPrimary font-semibold">Feature</th>
                  <th className="text-center p-4 text-textPrimary font-semibold">Free</th>
                  <th className="text-center p-4 text-accent font-semibold">Pro</th>
                  <th className="text-center p-4 text-textPrimary font-semibold">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-highlight">
                <tr>
                  <td className="p-4 text-textSecondary">Events per month</td>
                  <td className="text-center p-4 text-textPrimary">100</td>
                  <td className="text-center p-4 text-accent font-semibold">Unlimited</td>
                  <td className="text-center p-4 text-textPrimary">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 text-textSecondary">Calendar integrations</td>
                  <td className="text-center p-4 text-textPrimary">1</td>
                  <td className="text-center p-4 text-accent font-semibold">Unlimited</td>
                  <td className="text-center p-4 text-textPrimary">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 text-textSecondary">AI automation</td>
                  <td className="text-center p-4 text-textSecondary">—</td>
                  <td className="text-center p-4 text-accent">✓</td>
                  <td className="text-center p-4 text-success">✓</td>
                </tr>
                <tr>
                  <td className="p-4 text-textSecondary">Analytics dashboard</td>
                  <td className="text-center p-4 text-textSecondary">—</td>
                  <td className="text-center p-4 text-accent">✓</td>
                  <td className="text-center p-4 text-success">✓</td>
                </tr>
                <tr>
                  <td className="p-4 text-textSecondary">Team collaboration</td>
                  <td className="text-center p-4 text-textSecondary">—</td>
                  <td className="text-center p-4 text-textSecondary">—</td>
                  <td className="text-center p-4 text-success">✓</td>
                </tr>
                <tr>
                  <td className="p-4 text-textSecondary">Support</td>
                  <td className="text-center p-4 text-textPrimary">Email</td>
                  <td className="text-center p-4 text-accent font-semibold">Priority</td>
                  <td className="text-center p-4 text-textPrimary">Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-surface p-6 rounded-xl border border-highlight">
                <h3 className="text-lg font-bold mb-2 text-textPrimary">{faq.question}</h3>
                <p className="text-textSecondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need an Enterprise Solution?</h2>
            <p className="text-textSecondary mb-6">
              Large organization? Custom requirements? Let's talk about a plan tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Contact Sales
              </Link>
              <Link 
                href="/about"
                className="border-2 border-highlight hover:border-accent text-textPrimary hover:text-accent px-8 py-4 rounded-xl transition-all font-semibold hover:bg-surface"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
