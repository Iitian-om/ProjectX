import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About ProjectX</h1>
          <p className="text-xl text-textSecondary">
            Empowering students and professionals to master time management through AI-powered automation
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-surface p-8 md:p-12 rounded-xl border border-highlight">
            <h2 className="text-3xl font-bold mb-6 text-accent">Our Mission</h2>
            <p className="text-lg text-textSecondary leading-relaxed mb-4">
              At ProjectX, we believe that time is the most valuable resource. Our mission is to help individuals 
              take control of their schedules, reduce stress, and focus on what truly matters.
            </p>
            <p className="text-lg text-textSecondary leading-relaxed">
              By combining intelligent automation with intuitive design, we're building a productivity platform 
              that adapts to your workflow, not the other way around.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent transition-all">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 text-textPrimary">Simplicity First</h3>
              <p className="text-textSecondary">
                We design with clarity in mind. Complex features, simple interface.
              </p>
            </div>
            <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent transition-all">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3 text-textPrimary">Innovation</h3>
              <p className="text-textSecondary">
                Leveraging AI and automation to solve real productivity challenges.
              </p>
            </div>
            <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent transition-all">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-textPrimary">User-Centric</h3>
              <p className="text-textSecondary">
                Your feedback shapes our roadmap. We build for you, with you.
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-textSecondary leading-relaxed">
            <p>
              ProjectX was born in October 2025 from a simple observation: students and professionals 
              were juggling multiple calendars, task lists, and reminder systems, yet still missing 
              deadlines and feeling overwhelmed.
            </p>
            <p>
              We asked ourselves: what if all your schedules, tasks, and events could live in one 
              intelligent system that actually understands your priorities?
            </p>
            <p>
              Today, ProjectX integrates with Google Calendar, Outlook, Microsoft Teams, and more, 
              powered by n8n workflows that automate the tedious parts of time management. Our goal 
              is simple: give you back control of your time.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-surface p-8 rounded-xl border border-highlight">
            <h2 className="text-3xl font-bold mb-8 text-center">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">1K+</div>
                <div className="text-textSecondary">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">50K+</div>
                <div className="text-textSecondary">Events Managed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
                <div className="text-textSecondary">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">50+</div>
                <div className="text-textSecondary">Integrations</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us on This Journey</h2>
          <p className="text-lg text-textSecondary mb-8">
            We're just getting started. Help us build the future of productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sign-up"
              className="bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link 
              href="/careers"
              className="border-2 border-highlight hover:border-accent text-textPrimary hover:text-accent px-8 py-4 rounded-xl transition-all font-semibold hover:bg-surface"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
