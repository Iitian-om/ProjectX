import Link from 'next/link';

export default function Home() {
  return (

    // Full-page container with charcoal-steel background
    <div className="min-h-screen bg-background border-4  border-textSecondary text-textPrimary">

      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-accent">ProjectX</span>
        </div>
        {/* User Navigation */}
        <div className="space-x-4">
          <Link href="/timetable" className="text-textPrimary hover:text-accent transition-colors">
            Timetable
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-8 border-t md:py-12 relative">

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
              href="/signup"
              className="group relative bg-accent hover:bg-[#B89658] text-background font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-2xl hover:shadow-accent/20 transform hover:scale-105 w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#B89658] to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              href="/login"
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
      <footer className="bg-surface border-t border-highlight">
        <div className="container mx-auto px-6 py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Info */}
            <div>
              <h3 className="text-xl font-bold text-accent mb-4">ProjectX</h3>
              <p className="text-textSecondary text-sm mb-4">
                AI-powered SaaS platform helping students and professionals master time management and boost productivity.
              </p>
              <div className="flex gap-4">
                <a href="https://twitter.com/projectx" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-accent transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="https://github.com/projectx" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-accent transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com/company/projectx" target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-accent transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-lg font-semibold text-textPrimary mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="text-textSecondary hover:text-accent transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-textSecondary hover:text-accent transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="text-textSecondary hover:text-accent transition-colors">Integrations</Link></li>
                <li><Link href="/changelog" className="text-textSecondary hover:text-accent transition-colors">Changelog</Link></li>
                <li><Link href="/roadmap" className="text-textSecondary hover:text-accent transition-colors">Roadmap</Link></li>
                <li><Link href="/api" className="text-textSecondary hover:text-accent transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-textPrimary mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/docs" className="text-textSecondary hover:text-accent transition-colors">Documentation</Link></li>
                <li><Link href="/blog" className="text-textSecondary hover:text-accent transition-colors">Blog</Link></li>
                <li><Link href="/help" className="text-textSecondary hover:text-accent transition-colors">Help Center</Link></li>
                <li><Link href="/community" className="text-textSecondary hover:text-accent transition-colors">Community</Link></li>
                <li><Link href="/tutorials" className="text-textSecondary hover:text-accent transition-colors">Tutorials</Link></li>
                <li><Link href="/contact" className="text-textSecondary hover:text-accent transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold text-textPrimary mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-textSecondary hover:text-accent transition-colors">About</Link></li>
                <li><Link href="/careers" className="text-textSecondary hover:text-accent transition-colors">Careers</Link></li>
                <li><Link href="/partners" className="text-textSecondary hover:text-accent transition-colors">Partners</Link></li>
                <li><Link href="/terms" className="text-textSecondary hover:text-accent transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="text-textSecondary hover:text-accent transition-colors">Privacy</Link></li>
                <li><Link href="/security" className="text-textSecondary hover:text-accent transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          {/* Important Dates */}
          <div className="border-t border-highlight pt-6 mb-6">
            <h4 className="text-sm font-semibold text-textPrimary mb-3 flex items-center gap-2">
              <span>📅</span> Product Timeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-background/50 p-3 rounded-lg border border-highlight/30">
                <div className="text-accent font-semibold mb-1">🚀 Founded/Started</div>
                <div className="text-textSecondary">October 2025</div>
              </div>
              <div className="bg-background/50 p-3 rounded-lg border border-highlight/30">
                <div className="text-accent font-semibold mb-1">🧪 Beta Release</div>
                <div className="text-textSecondary">Coming Q4 2025</div>
              </div>
              <div className="bg-background/50 p-3 rounded-lg border border-highlight/30">
                <div className="text-accent font-semibold mb-1">✨ v1.0 Stable</div>
                <div className="text-textSecondary">Planned Q1 2026</div>
              </div>
              <div className="bg-background/50 p-3 rounded-lg border border-highlight/30">
                <div className="text-accent font-semibold mb-1">📊 Last Updated</div>
                <div className="text-textSecondary">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-highlight pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-textSecondary">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>© {new Date().getFullYear()} ProjectX. All rights reserved.</p>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-2 bg-accent/10 border border-accent/30 px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-accent font-semibold">Under Active Development</span>
              </div>
            </div>
            <div className="flex gap-6">
              <Link href="/status" className="hover:text-accent transition-colors">Status</Link>
              <Link href="/sitemap" className="hover:text-accent transition-colors">Sitemap</Link>
              <a href="#" className="hover:text-accent transition-colors">🌟 Star on GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 
