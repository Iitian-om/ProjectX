import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function API() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('tasks');
  const [activeTab, setActiveTab] = useState('overview');

  const endpoints = {
    tasks: {
      title: 'Tasks API',
      description: 'Manage tasks with full CRUD operations',
      baseUrl: '/api/tasks',
      methods: [
        {
          method: 'GET',
          endpoint: '/api/tasks',
          description: 'Retrieve all tasks or filter by query parameters',
          auth: 'Required',
          parameters: [
            { name: 'status', type: 'string', required: false, description: 'Filter by status (todo, in-progress, completed)' },
            { name: 'priority', type: 'string', required: false, description: 'Filter by priority (low, normal, high, urgent)' },
          ],
          response: {
            code: 200,
            example: `{
  "tasks": [
    {
      "id": "task-1730635200000",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "priority": "high",
      "status": "in-progress",
      "deadline": "2025-11-10T14:00:00Z",
      "meetingLink": "https://meet.google.com/abc-defg-hij",
      "createdAt": "2025-11-03T10:30:00Z",
      "updatedAt": "2025-11-05T08:15:00Z"
    }
  ]
}`
          }
        },
        {
          method: 'POST',
          endpoint: '/api/tasks',
          description: 'Create a new task',
          auth: 'Required',
          body: {
            title: { type: 'string', required: true, maxLength: 200 },
            description: { type: 'string', required: false, maxLength: 1000 },
            priority: { type: 'string', required: true, enum: ['low', 'normal', 'high', 'urgent'] },
            status: { type: 'string', required: false, enum: ['todo', 'in-progress', 'completed'] },
            deadline: { type: 'string', required: false, format: 'ISO 8601' },
            meetingLink: { type: 'string', required: false, maxLength: 500 },
          },
          response: {
            code: 201,
            example: `{
  "success": true,
  "task": {
    "id": "task-1730635200000",
    "title": "Complete project documentation",
    ...
  }
}`
          }
        },
        {
          method: 'PUT',
          endpoint: '/api/tasks',
          description: 'Update an existing task',
          auth: 'Required',
          body: {
            id: { type: 'string', required: true },
            title: { type: 'string', required: false },
            description: { type: 'string', required: false },
            priority: { type: 'string', required: false },
            status: { type: 'string', required: false },
            deadline: { type: 'string', required: false },
            meetingLink: { type: 'string', required: false },
          },
          response: {
            code: 200,
            example: `{
  "success": true,
  "task": { ... }
}`
          }
        },
        {
          method: 'DELETE',
          endpoint: '/api/tasks?id={taskId}',
          description: 'Delete a task by ID',
          auth: 'Required',
          parameters: [
            { name: 'id', type: 'string', required: true, description: 'Task ID to delete' },
          ],
          response: {
            code: 200,
            example: `{
  "success": true,
  "message": "Task deleted successfully"
}`
          }
        },
      ]
    },
    events: {
      title: 'Events API',
      description: 'Manage calendar events and timetable entries',
      baseUrl: '/api/events',
      methods: [
        {
          method: 'GET',
          endpoint: '/api/events',
          description: 'Retrieve all events from timetable',
          auth: 'Required',
          parameters: [
            { name: 'date', type: 'string', required: false, description: 'Filter by specific date (YYYY-MM-DD)' },
            { name: 'source', type: 'string', required: false, description: 'Filter by source (college, work, personal)' },
          ],
          response: {
            code: 200,
            example: `{
  "events": [
    {
      "id": "event-123",
      "title": "Advanced Algorithms",
      "time": "9:00 AM - 10:30 AM",
      "location": "Room 301",
      "type": "Lecture",
      "source": "college",
      "color": "blue"
    }
  ]
}`
          }
        },
      ]
    },
    auth: {
      title: 'Authentication',
      description: 'User authentication and authorization with Clerk',
      baseUrl: '/api/auth',
      methods: [
        {
          method: 'GET',
          endpoint: '/api/auth/user',
          description: 'Get current authenticated user',
          auth: 'Required',
          response: {
            code: 200,
            example: `{
  "user": {
    "id": "user_abc123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2025-10-15T10:00:00Z"
  }
}`
          }
        },
      ]
    },
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return 'text-green-500 bg-green-500/20 border-green-500/30';
      case 'POST':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'PUT':
        return 'text-accent bg-accent/20 border-accent/30';
      case 'DELETE':
        return 'text-red-400 bg-red-400/20 border-red-400/30';
      default:
        return 'text-textSecondary bg-surface border-highlight';
    }
  };

  const currentEndpoint = endpoints[selectedEndpoint];

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 border-b border-highlight/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-accent via-[#D4B87A] to-accent bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-xl text-textSecondary mb-8">
            Complete reference for ProjectX REST API endpoints
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-surface border border-highlight rounded-xl p-4">
              <div className="text-3xl font-bold text-accent mb-1">v1.0</div>
              <div className="text-sm text-textSecondary">API Version</div>
            </div>
            <div className="bg-surface border border-highlight rounded-xl p-4">
              <div className="text-3xl font-bold text-accent mb-1">REST</div>
              <div className="text-sm text-textSecondary">Architecture</div>
            </div>
            <div className="bg-surface border border-highlight rounded-xl p-4">
              <div className="text-3xl font-bold text-accent mb-1">JSON</div>
              <div className="text-sm text-textSecondary">Response Format</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-highlight rounded-xl p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-accent">Endpoints</h3>
              <nav className="space-y-2">
                {Object.keys(endpoints).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedEndpoint(key)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      selectedEndpoint === key
                        ? 'bg-accent text-background font-semibold'
                        : 'text-textSecondary hover:bg-highlight hover:text-accent'
                    }`}
                  >
                    {endpoints[key].title}
                  </button>
                ))}
              </nav>

              {/* Getting Started */}
              <div className="mt-8 pt-6 border-t border-highlight">
                <h4 className="text-sm font-semibold mb-3 text-textPrimary">Getting Started</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#authentication" className="text-textSecondary hover:text-accent transition-colors">
                      → Authentication
                    </Link>
                  </li>
                  <li>
                    <Link href="#rate-limits" className="text-textSecondary hover:text-accent transition-colors">
                      → Rate Limits
                    </Link>
                  </li>
                  <li>
                    <Link href="#errors" className="text-textSecondary hover:text-accent transition-colors">
                      → Error Codes
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-surface border border-highlight rounded-xl p-8">
              
              {/* Endpoint Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-3 text-accent">{currentEndpoint.title}</h2>
                <p className="text-textSecondary mb-4">{currentEndpoint.description}</p>
                <div className="bg-background border border-highlight rounded-lg p-4 font-mono text-sm">
                  <span className="text-green-500">Base URL:</span>{' '}
                  <span className="text-accent">{currentEndpoint.baseUrl}</span>
                </div>
              </div>

              {/* Methods */}
              <div className="space-y-8">
                {currentEndpoint.methods.map((method, idx) => (
                  <div key={idx} className="border-b border-highlight pb-8 last:border-b-0">
                    
                    {/* Method Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-lg font-bold text-sm border ${getMethodColor(method.method)}`}>
                        {method.method}
                      </span>
                      <code className="text-accent font-mono text-sm">{method.endpoint}</code>
                    </div>

                    <p className="text-textSecondary mb-4">{method.description}</p>

                    {/* Authentication */}
                    <div className="mb-4">
                      <span className="text-sm text-textSecondary">Authentication:</span>{' '}
                      <span className="text-sm font-semibold text-accent">{method.auth}</span>
                    </div>

                    {/* Parameters */}
                    {method.parameters && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-textPrimary">Query Parameters</h4>
                        <div className="bg-background border border-highlight rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-highlight">
                              <tr>
                                <th className="text-left p-3 text-textPrimary">Name</th>
                                <th className="text-left p-3 text-textPrimary">Type</th>
                                <th className="text-left p-3 text-textPrimary">Required</th>
                                <th className="text-left p-3 text-textPrimary">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {method.parameters.map((param, pidx) => (
                                <tr key={pidx} className="border-t border-highlight">
                                  <td className="p-3 font-mono text-accent">{param.name}</td>
                                  <td className="p-3 text-textSecondary">{param.type}</td>
                                  <td className="p-3">
                                    {param.required ? (
                                      <span className="text-red-400 font-semibold">Yes</span>
                                    ) : (
                                      <span className="text-green-500">No</span>
                                    )}
                                  </td>
                                  <td className="p-3 text-textSecondary">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Request Body */}
                    {method.body && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 text-textPrimary">Request Body</h4>
                        <div className="bg-background border border-highlight rounded-lg p-4">
                          <pre className="text-xs text-textSecondary overflow-x-auto">
{JSON.stringify(
  Object.entries(method.body).reduce((acc, [key, value]) => {
    acc[key] = value.type;
    return acc;
  }, {}),
  null,
  2
)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Response */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-textPrimary">
                        Response <span className="text-green-500 ml-2">{method.response.code}</span>
                      </h4>
                      <div className="bg-[#1F2328] border border-highlight rounded-lg p-4">
                        <pre className="text-xs text-green-400 overflow-x-auto">
{method.response.example}
                        </pre>
                      </div>
                    </div>

                    {/* Try It Button */}
                    <div className="mt-6">
                      <button className="px-6 py-2 bg-accent hover:bg-[#B89658] text-background font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl">
                        Try It Out
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-8 space-y-6">
              
              {/* Authentication */}
              <div id="authentication" className="bg-surface border border-highlight rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-accent">🔐 Authentication</h3>
                <p className="text-textSecondary mb-4">
                  ProjectX API uses Clerk for authentication. Include your session token in the Authorization header:
                </p>
                <div className="bg-background border border-highlight rounded-lg p-4 font-mono text-sm">
                  <span className="text-green-500">Authorization:</span>{' '}
                  <span className="text-accent">Bearer YOUR_SESSION_TOKEN</span>
                </div>
              </div>

              {/* Rate Limits */}
              <div id="rate-limits" className="bg-surface border border-highlight rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-accent">⚡ Rate Limits</h3>
                <p className="text-textSecondary mb-4">
                  API requests are limited to prevent abuse:
                </p>
                <ul className="space-y-2 text-textSecondary">
                  <li>• <strong className="text-textPrimary">Free Plan:</strong> 100 requests/hour</li>
                  <li>• <strong className="text-textPrimary">Pro Plan:</strong> 1,000 requests/hour</li>
                  <li>• <strong className="text-textPrimary">Enterprise:</strong> Unlimited</li>
                </ul>
              </div>

              {/* Error Codes */}
              <div id="errors" className="bg-surface border border-highlight rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-accent">❌ Error Codes</h3>
                <div className="space-y-3">
                  <div className="bg-background border border-highlight rounded-lg p-4">
                    <code className="text-red-400 font-bold">400</code>
                    <span className="text-textSecondary ml-4">Bad Request - Invalid parameters</span>
                  </div>
                  <div className="bg-background border border-highlight rounded-lg p-4">
                    <code className="text-red-400 font-bold">401</code>
                    <span className="text-textSecondary ml-4">Unauthorized - Invalid or missing token</span>
                  </div>
                  <div className="bg-background border border-highlight rounded-lg p-4">
                    <code className="text-red-400 font-bold">404</code>
                    <span className="text-textSecondary ml-4">Not Found - Resource doesn't exist</span>
                  </div>
                  <div className="bg-background border border-highlight rounded-lg p-4">
                    <code className="text-red-400 font-bold">429</code>
                    <span className="text-textSecondary ml-4">Too Many Requests - Rate limit exceeded</span>
                  </div>
                  <div className="bg-background border border-highlight rounded-lg p-4">
                    <code className="text-red-400 font-bold">500</code>
                    <span className="text-textSecondary ml-4">Server Error - Something went wrong</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-12 border-t border-highlight/50">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Need help with integration?</h2>
          <p className="text-textSecondary mb-6">
            Our support team is here to help you get started with the API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contact Support
            </Link>
            <Link
              href="/tutorials"
              className="inline-block bg-surface border-2 border-highlight hover:border-accent text-textPrimary hover:text-accent font-semibold px-8 py-4 rounded-xl transition-all hover:bg-highlight"
            >
              View Tutorials
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
