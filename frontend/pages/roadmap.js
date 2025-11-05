import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Roadmap() {
  const [selectedPhase, setSelectedPhase] = useState('all');

  const phases = [
    {
      id: 'phase0',
      name: 'Phase 0',
      title: 'Foundation & Setup',
      status: 'completed',
      progress: 100,
      quarter: 'Q4 2025',
      description: 'Project initialization, Next.js setup, and basic infrastructure',
      features: [
        { name: 'Next.js 14 project setup', status: 'completed' },
        { name: 'Tailwind CSS configuration', status: 'completed' },
        { name: 'MongoDB Atlas integration', status: 'completed' },
        { name: 'n8n workflow automation setup', status: 'completed' },
        { name: 'Basic landing page', status: 'completed' },
        { name: 'Clerk authentication integration', status: 'completed' },
      ]
    },
    {
      id: 'phase1',
      name: 'Phase 1',
      title: 'Timetable Management',
      status: 'completed',
      progress: 100,
      quarter: 'Q4 2025',
      description: 'Weekly timetable view with event management',
      features: [
        { name: 'Weekly timetable grid view', status: 'completed' },
        { name: 'Event creation and editing', status: 'completed' },
        { name: 'Time slot management', status: 'completed' },
        { name: 'Responsive design', status: 'completed' },
        { name: 'Event color coding', status: 'completed' },
      ]
    },
    {
      id: 'phase2',
      name: 'Phase 2',
      title: 'Task & Event Management',
      status: 'completed',
      progress: 100,
      quarter: 'Q4 2025',
      description: 'Complete CRUD operations for tasks with MongoDB persistence',
      features: [
        { name: 'Task creation with priorities', status: 'completed' },
        { name: 'Task editing and deletion', status: 'completed' },
        { name: 'Status filtering (To Do, In Progress, Completed)', status: 'completed' },
        { name: 'Deadline tracking with warnings', status: 'completed' },
        { name: 'Meeting link integration', status: 'completed' },
        { name: 'n8n webhook integration', status: 'completed' },
      ]
    },
    {
      id: 'phase3',
      name: 'Phase 3',
      title: 'Reminders & Notifications',
      status: 'in-progress',
      progress: 30,
      quarter: 'Q1 2026',
      description: 'Smart reminders with multiple notification channels',
      features: [
        { name: 'Email notifications (SendGrid)', status: 'in-progress' },
        { name: 'SMS notifications (Twilio)', status: 'planned' },
        { name: 'Push notifications (Web Push)', status: 'planned' },
        { name: 'Custom reminder scheduling', status: 'planned' },
        { name: 'Recurring reminders', status: 'planned' },
        { name: 'Notification preferences', status: 'planned' },
      ]
    },
    {
      id: 'phase4',
      name: 'Phase 4',
      title: 'To-Do Panel',
      status: 'planned',
      progress: 0,
      quarter: 'Q1 2026',
      description: 'Advanced task organization with drag-and-drop',
      features: [
        { name: 'Drag-and-drop task reordering', status: 'planned' },
        { name: 'Task categories and tags', status: 'planned' },
        { name: 'Subtask management', status: 'planned' },
        { name: 'Quick add functionality', status: 'planned' },
        { name: 'Bulk actions', status: 'planned' },
        { name: 'Task templates', status: 'planned' },
      ]
    },
    {
      id: 'phase5',
      name: 'Phase 5',
      title: 'Calendar Integration',
      status: 'planned',
      progress: 0,
      quarter: 'Q2 2026',
      description: 'Bi-directional sync with external calendars',
      features: [
        { name: 'Google Calendar sync', status: 'planned' },
        { name: 'Outlook Calendar sync', status: 'planned' },
        { name: 'iCal format support', status: 'planned' },
        { name: 'Two-way synchronization', status: 'planned' },
        { name: 'Calendar view modes', status: 'planned' },
        { name: 'Event conflict detection', status: 'planned' },
      ]
    },
    {
      id: 'phase6',
      name: 'Phase 6',
      title: 'Analytics & PWA',
      status: 'planned',
      progress: 0,
      quarter: 'Q2 2026',
      description: 'Insights dashboard and Progressive Web App features',
      features: [
        { name: 'Time tracking analytics', status: 'planned' },
        { name: 'Productivity metrics', status: 'planned' },
        { name: 'Goal setting and tracking', status: 'planned' },
        { name: 'PWA installation', status: 'planned' },
        { name: 'Offline mode', status: 'planned' },
        { name: 'Export reports (PDF/CSV)', status: 'planned' },
      ]
    },
    {
      id: 'phase7',
      name: 'Phase 7',
      title: 'Testing & Launch',
      status: 'planned',
      progress: 0,
      quarter: 'Q3 2026',
      description: 'Comprehensive testing and production deployment',
      features: [
        { name: 'Unit testing (Jest)', status: 'planned' },
        { name: 'E2E testing (Playwright)', status: 'planned' },
        { name: 'Performance optimization', status: 'planned' },
        { name: 'Security audit', status: 'planned' },
        { name: 'Beta testing program', status: 'planned' },
        { name: 'Production deployment', status: 'planned' },
      ]
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/20 border-green-500/30';
      case 'in-progress':
        return 'text-accent bg-accent/20 border-accent/30';
      case 'planned':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default:
        return 'text-textSecondary bg-surface border-highlight';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🚧';
      case 'planned':
        return '📋';
      default:
        return '⏳';
    }
  };

  const getFeatureIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '⟳';
      case 'planned':
        return '○';
      default:
        return '○';
    }
  };

  const filteredPhases = selectedPhase === 'all' 
    ? phases 
    : phases.filter(phase => phase.status === selectedPhase);

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 border-b border-highlight/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-accent via-[#D4B87A] to-accent bg-clip-text text-transparent">
            Product Roadmap
          </h1>
          <p className="text-xl text-textSecondary mb-8">
            Track our journey from concept to production-ready SaaS platform
          </p>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-500 mb-1">3</div>
              <div className="text-sm text-textSecondary">Completed Phases</div>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-accent mb-1">1</div>
              <div className="text-sm text-textSecondary">In Progress</div>
            </div>
            <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400 mb-1">4</div>
              <div className="text-sm text-textSecondary">Planned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="container mx-auto px-6 py-6 border-b border-highlight/50">
        <div className="flex flex-wrap gap-3 justify-center">
          {['all', 'completed', 'in-progress', 'planned'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedPhase(filter)}
              className={`px-5 py-2 rounded-lg font-medium transition-all capitalize ${
                selectedPhase === filter
                  ? 'bg-accent text-background shadow-lg'
                  : 'bg-surface text-textSecondary hover:bg-highlight hover:text-accent border border-highlight'
              }`}
            >
              {filter === 'all' ? 'All Phases' : filter.replace('-', ' ')}
            </button>
          ))}
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 via-accent to-blue-400"></div>

            {/* Phase Cards */}
            <div className="space-y-12">
              {filteredPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={`relative ${
                    index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 ${
                    index % 2 === 0 ? '-left-3' : 'md:-left-3'
                  } top-8`}>
                    <div className={`w-8 h-8 rounded-full border-4 border-background flex items-center justify-center text-sm ${
                      phase.status === 'completed' ? 'bg-green-500' :
                      phase.status === 'in-progress' ? 'bg-accent' :
                      'bg-blue-400'
                    }`}>
                      {getStatusIcon(phase.status)}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`bg-surface border-2 ${
                    phase.status === 'completed' ? 'border-green-500/30' :
                    phase.status === 'in-progress' ? 'border-accent/30' :
                    'border-blue-400/30'
                  } rounded-2xl p-6 md:p-8 ml-12 md:ml-0 hover:shadow-2xl hover:scale-[1.02] transition-all`}>
                    
                    {/* Header */}
                    <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:justify-end' : ''} items-start md:items-center gap-3 mb-4`}>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(phase.status)}`}>
                          {phase.status.toUpperCase().replace('-', ' ')}
                        </span>
                      </div>
                      <div className={`text-sm text-textSecondary ${index % 2 === 0 ? 'md:mr-auto' : ''}`}>
                        {phase.quarter}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-accent">{phase.name}: {phase.title}</h3>
                    <p className="text-textSecondary mb-4">{phase.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-textSecondary">Progress</span>
                        <span className="font-semibold text-accent">{phase.progress}%</span>
                      </div>
                      <div className="w-full bg-highlight rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            phase.status === 'completed' ? 'bg-green-500' :
                            phase.status === 'in-progress' ? 'bg-accent' :
                            'bg-blue-400'
                          }`}
                          style={{ width: `${phase.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-textPrimary mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {phase.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className={`mt-0.5 ${
                              feature.status === 'completed' ? 'text-green-500' :
                              feature.status === 'in-progress' ? 'text-accent' :
                              'text-textSecondary'
                            }`}>
                              {getFeatureIcon(feature.status)}
                            </span>
                            <span className={feature.status === 'completed' ? 'text-textSecondary line-through' : 'text-textSecondary'}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-12 border-t border-highlight/50">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Want to influence our roadmap?</h2>
          <p className="text-textSecondary mb-6">
            Join our community and share your ideas for future features
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/community"
              className="inline-block bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Join Community
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-surface border-2 border-highlight hover:border-accent text-textPrimary hover:text-accent font-semibold px-8 py-4 rounded-xl transition-all hover:bg-highlight"
            >
              Submit Feedback
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
