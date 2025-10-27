import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Integrations() {
  const integrations = [
    {
      name: 'Google Calendar',
      icon: '📅',
      description: 'Seamlessly sync your Google Calendar events with ProjectX.',
      status: 'Available',
      color: 'success',
      features: ['Two-way sync', 'Real-time updates', 'Multiple calendars']
    },
    {
      name: 'Microsoft Outlook',
      icon: '📧',
      description: 'Connect your Outlook calendar and emails for unified management.',
      status: 'Available',
      color: 'accent',
      features: ['Calendar sync', 'Email integration', 'Teams meetings']
    },
    {
      name: 'Microsoft Teams',
      icon: '👥',
      description: 'Automatically track your Teams meetings and calls.',
      status: 'Available',
      color: 'accent',
      features: ['Meeting detection', 'Auto-scheduling', 'Notifications']
    },
    {
      name: 'Zoom',
      icon: '🎥',
      description: 'Sync Zoom meetings directly into your timetable.',
      status: 'Coming Soon',
      color: 'textSecondary',
      features: ['Meeting sync', 'Recording links', 'Join reminders']
    },
    {
      name: 'Slack',
      icon: '💬',
      description: 'Get notifications and updates directly in Slack.',
      status: 'Coming Soon',
      color: 'textSecondary',
      features: ['Reminders', 'Task notifications', 'Status updates']
    },
    {
      name: 'Notion',
      icon: '📝',
      description: 'Sync tasks and databases between Notion and ProjectX.',
      status: 'Planned',
      color: 'textSecondary',
      features: ['Database sync', 'Task import', 'Two-way updates']
    },
    {
      name: 'Todoist',
      icon: '✅',
      description: 'Import your Todoist tasks and keep them in sync.',
      status: 'Planned',
      color: 'textSecondary',
      features: ['Task sync', 'Project import', 'Priority mapping']
    },
    {
      name: 'Trello',
      icon: '📊',
      description: 'Convert Trello cards into tasks and events.',
      status: 'Planned',
      color: 'textSecondary',
      features: ['Board sync', 'Card conversion', 'Due date mapping']
    },
    {
      name: 'GitHub',
      icon: '💻',
      description: 'Track issues, pull requests, and project deadlines.',
      status: 'Planned',
      color: 'textSecondary',
      features: ['Issue tracking', 'PR notifications', 'Milestone sync']
    },
  ];

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Hero */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Integrations</h1>
          <p className="text-xl text-textSecondary">
            Connect ProjectX with your favorite tools and services. Sync data seamlessly across platforms.
          </p>
        </div>

        {/* Stats */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-surface p-6 rounded-xl border border-highlight text-center">
              <div className="text-3xl font-bold text-success mb-2">3</div>
              <div className="text-textSecondary text-sm">Available Now</div>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-highlight text-center">
              <div className="text-3xl font-bold text-accent mb-2">2</div>
              <div className="text-textSecondary text-sm">Coming Soon</div>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-highlight text-center">
              <div className="text-3xl font-bold text-textSecondary mb-2">50+</div>
              <div className="text-textSecondary text-sm">Planned</div>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <div 
                key={integration.name}
                className="bg-surface p-6 rounded-xl border border-highlight hover:border-accent transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{integration.icon}</div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    integration.status === 'Available' 
                      ? 'bg-success/20 text-success' 
                      : integration.status === 'Coming Soon'
                      ? 'bg-accent/20 text-accent'
                      : 'bg-highlight/50 text-textSecondary'
                  }`}>
                    {integration.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-textPrimary">{integration.name}</h3>
                <p className="text-textSecondary text-sm mb-4">{integration.description}</p>
                <ul className="space-y-2">
                  {integration.features.map((feature, idx) => (
                    <li key={idx} className="text-textSecondary text-xs flex items-center">
                      <span className="text-accent mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How Integrations Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent/10 border border-accent/30 rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">
                1️⃣
              </div>
              <h3 className="text-lg font-bold mb-2 text-textPrimary">Connect</h3>
              <p className="text-textSecondary text-sm">
                Authorize ProjectX to access your external accounts securely via OAuth 2.0
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 border border-accent/30 rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">
                2️⃣
              </div>
              <h3 className="text-lg font-bold mb-2 text-textPrimary">Sync</h3>
              <p className="text-textSecondary text-sm">
                Data syncs automatically in real-time using n8n workflows
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 border border-accent/30 rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4">
                3️⃣
              </div>
              <h3 className="text-lg font-bold mb-2 text-textPrimary">Manage</h3>
              <p className="text-textSecondary text-sm">
                All your events, tasks, and reminders in one unified dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Request Integration */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface p-8 rounded-xl border border-highlight text-center">
            <h2 className="text-2xl font-bold mb-4">Need a Specific Integration?</h2>
            <p className="text-textSecondary mb-6">
              We're always adding new integrations. Let us know what you'd like to see next!
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Request an Integration
            </Link>
          </div>
        </div>

        {/* API Access */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-highlight/30 border border-highlight p-8 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-textPrimary">Build Your Own Integration</h3>
                <p className="text-textSecondary mb-4">
                  Developers can use our REST API to build custom integrations and automate workflows.
                </p>
                <Link 
                  href="/api"
                  className="text-accent hover:underline font-semibold"
                >
                  View API Documentation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
