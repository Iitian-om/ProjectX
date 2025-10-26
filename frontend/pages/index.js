import Link from 'next/link';

export default function Home() {
  return (

    // Full-page container with charcoal-steel background
    <div className="min-h-screen bg-background text-textPrimary">
      
      {/* Navigation */}
      <nav className="container mx-auto py-10 flex justify-between items-center">
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
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-accent">ProjectX</span> 🚀
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-textPrimary mb-4">
          Managing Time Like a Pro
        </p>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-textPrimary mb-4">
          kāla vidhye kārye śadhay
          A person who understands time in relation to finance, work, and marriage succeeds in accomplishing their tasks.
        </p>

        <p className="text-lg max-w-2xl mx-auto text-textSecondary mb-12">
          Your personal Productivity assistant Powered by AI Automation for managing meetings, work, timetables, tasks, reminders, and calendar integrations.
          Focus on what truly matters while we handle the rest.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link href="/signup" className="bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto">
            Sign Up
          </Link>
          <Link href="/login" className="border-2 border-highlight hover:border-accent text-textPrimary hover:text-accent px-8 py-4 rounded-xl transition-all w-full sm:w-auto">
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
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
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-textPrimary">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-textSecondary mb-8 max-w-2xl mx-auto">
          Join thousands of students and professionals who are managing their time like pros.
        </p>
        <Link 
          href="/timetable" 
          className="inline-block bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View Your Timetable
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-sm text-textSecondary border-t border-highlight">
        <p>© {new Date().getFullYear()} ProjectX Corporation Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
} 