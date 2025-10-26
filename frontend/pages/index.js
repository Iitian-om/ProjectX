import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-blue-400">ProjectX</span>
        </div>
        <div className="space-x-4">
          <Link href="/timetable" className="text-gray-300 hover:text-blue-400 transition-colors">
            Timetable
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Welcome to <span className="text-blue-400">ProjectX</span> 🚀
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-4">
          Managing Time Like a Pro
        </p>
        <p className="text-lg max-w-2xl mx-auto text-gray-400 mb-12">
          Your personal executive assistant for managing timetables, tasks, reminders, and calendar integrations. 
          Focus on what truly matters while we handle the rest.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto">
            Sign Up
          </button>
          <button className="border-2 border-gray-400 hover:border-blue-500 text-gray-200 hover:text-blue-400 px-8 py-4 rounded-xl transition-all w-full sm:w-auto">
            Login
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-3">Unified Timetable</h3>
            <p className="text-gray-400">
              Combine college schedules, courses, and personal events in one comprehensive view.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-xl font-bold mb-3">Smart Reminders</h3>
            <p className="text-gray-400">
              Never miss a deadline with intelligent notifications and automated reminders.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-3">Calendar Integration</h3>
            <p className="text-gray-400">
              Sync with Google Calendar, Outlook, and Microsoft Teams seamlessly.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold mb-3">Task Management</h3>
            <p className="text-gray-400">
              Organize and prioritize tasks efficiently with our intuitive to-do panel.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-3">Cross-Device Sync</h3>
            <p className="text-gray-400">
              Access your schedule from any device with our responsive PWA design.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Smart Automation</h3>
            <p className="text-gray-400">
              Powered by n8n workflows for intelligent event handling and notifications.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of students and professionals who are managing their time like pros.
        </p>
        <Link 
          href="/timetable" 
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View Your Timetable
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-sm text-gray-500 border-t border-gray-800">
        <p>© {new Date().getFullYear()} ProjectX Corporation Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
} 