import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (

    // Full-page container with charcoal-steel background
    <div className="min-h-screen bg-background text-textPrimary">

      {/* Navigation */}
      <Navbar showHome={false} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-8 md:py-12 relative">

        {/* Background Accent */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="text-center">

          { /* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-16 lg:mb-20 tracking-tight leading-tight text-center">
            Welcome to {' '}
            <span className="bg-gradient-to-r from-accent via-[#D4B87A] to-accent bg-clip-text text-transparent animate-gradient">
              ProjectX
            </span>
          </h1>

          {/* Layout: Tagline + Sanskrit (left) and Description (right) */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 max-w-5xl mx-auto mb-16">

            {/* Left column: Tagline (upper) and Sanskrit motto (lower) */}
            <div className="flex flex-col items-start space-y-3 md:w-1/2">
              {/* Sanskrit Motto */}
              <p className="md:text-3xl text-accent/80 italic tracking-wider">
                kāla vidhye kārye śadhay!
              </p>
              {/* Tagline */}
              <p className="font-light text-textPrimary tracking-wide">
                Manage your Time Like a Pro.
              </p>
            </div>

            {/* Right column: Description */}
            <div className="md:w-1/2">
              <p className="text-base md:text-lg text-textSecondary leading-relaxed italic">
                Your personal productivity assistant powered by AI automation for managing meetings, work, timetables, tasks, reminders, and calendar integrations. Focus on what truly matters while we handle the rest.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-80 justify-center items-center mb-24">
            <Link
              href="/sign-up"
              className="group relative bg-accent hover:bg-[#B89658] text-background font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-2xl hover:shadow-accent/20 transform hover:scale-105 w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#B89658] to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              href="/sign-in"
              className="group border-2 border-highlight hover:border-accent text-textPrimary hover:text-accent px-10 py-4 rounded-xl transition-all w-full sm:w-auto font-semibold hover:bg-surface"
            >
              <span className="flex items-center justify-center gap-2">
                Sign In
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>

          {/* Stats/Social Proof */}

        </div>
      </section>

      <section className="container mx-auto px-6 py-8 md:py-12 relative border-t border-highlight/50">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Trusted by Thousands
        </h1>
        <p className="text-textSecondary text-center mb-6 max-w-2xl mx-auto">
          Join a thriving community of students and professionals who rely on ProjectX to streamline their schedules and boost productivity.
          (Sample numbers only for prototype & Design)
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-highlight/50">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">1K+</div>
            <div className="text-sm text-textSecondary">Active Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">99.9%</div>
            <div className="text-sm text-textSecondary">Uptime</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">24/7</div>
            <div className="text-sm text-textSecondary">Support</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">50K+</div>
            <div className="text-sm text-textSecondary">Events Managed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">50+</div>
            <div className="text-sm text-textSecondary">Integrations</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-accent mb-1">91%</div>
            <div className="text-sm text-textSecondary">Customer Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 border-t border-highlight/50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">

          {/* Feature 1 */}
          <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-3 text-textPrimary">Unified Timetable</h3>
            <p className="text-textSecondary">
              Combine college schedules, courses, and personal events in one comprehensive view.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-xl font-bold mb-3 text-textPrimary">Smart Reminders</h3>
            <p className="text-textSecondary">
              Never miss a deadline with intelligent notifications and automated reminders.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-3 text-textPrimary">Calendar Integration</h3>
            <p className="text-textSecondary">
              Sync with Google Calendar, Outlook, and Microsoft Teams seamlessly.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-3 text-textPrimary">Task Management</h3>
            <p className="text-textSecondary">
              Organize and prioritize tasks efficiently with our intuitive to-do panel.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-3 text-textPrimary">Cross-Device Sync</h3>
            <p className="text-textSecondary">
              Access your schedule from any device with our responsive PWA design.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-surface p-8 rounded-xl border border-highlight hover:border-accent hover:bg-highlight transition-all">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-textPrimary">Smart Automation</h3>
            <p className="text-textSecondary">
              Powered by n8n workflows for intelligent event handling and notifications.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-8 text-center border-t border-highlight/50">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-textPrimary">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-textSecondary mb-8 max-w-2xl mx-auto">
          Join thousands of students and professionals who are managing their time like pros.
        </p>
        <div className="flex gap-8 justify-center items-center">
        <Link
          href="/timetable"
          className="inline-block bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View Your Timetable
        </Link>
        <Link
          href="/dashboard"
          className="inline-block bg-background hover:bg-[#B89658] text-primary border border-primary font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View Your Dashboard
        </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 
