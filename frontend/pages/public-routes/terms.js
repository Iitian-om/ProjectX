import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-textSecondary text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Notice */}
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mb-12">
            <p className="text-accent font-semibold mb-2">⚠️ Important Notice</p>
            <p className="text-textSecondary">
              This is a prototype/development version. These terms are for demonstration purposes only. 
              Please review carefully before using our services in production.
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">1. Acceptance of Terms</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  By accessing and using ProjectX ("the Service"), you accept and agree to be bound by these 
                  Terms of Service. If you do not agree to these terms, please do not use the Service.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the Service 
                  constitutes acceptance of modified terms.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">2. Description of Service</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  ProjectX is a SaaS platform that provides time management, task organization, calendar 
                  integration, and productivity automation features.
                </p>
                <p>
                  The Service includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Unified timetable and calendar management</li>
                  <li>Task and reminder systems</li>
                  <li>Third-party calendar integrations (Google Calendar, Outlook, etc.)</li>
                  <li>AI-powered automation via n8n workflows</li>
                  <li>Analytics and reporting features</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">3. User Accounts</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  <strong className="text-textPrimary">Account Creation:</strong> You must create an account 
                  to use certain features. You are responsible for maintaining the confidentiality of your 
                  account credentials.
                </p>
                <p>
                  <strong className="text-textPrimary">Account Security:</strong> You agree to notify us 
                  immediately of any unauthorized use of your account.
                </p>
                <p>
                  <strong className="text-textPrimary">Accuracy:</strong> You agree to provide accurate and 
                  complete information when creating your account.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">4. Acceptable Use</h2>
              <div className="text-textSecondary space-y-4">
                <p>You agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the Service for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Distribute malware or harmful code</li>
                  <li>Abuse, harass, or harm other users</li>
                  <li>Scrape or collect data without permission</li>
                  <li>Reverse engineer or copy the Service</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">5. Data and Privacy</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  Your privacy is important to us. Please review our <Link href="/public-routes/privacy" className="text-accent hover:underline">Privacy Policy</Link> to 
                  understand how we collect, use, and protect your data.
                </p>
                <p>
                  By using ProjectX, you consent to the collection and use of information as described in our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">6. Intellectual Property</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  All content, features, and functionality of ProjectX are owned by us and protected by 
                  international copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You retain ownership of any content you submit to the Service. By submitting content, you 
                  grant us a license to use it for providing the Service.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">7. Limitation of Liability</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  The Service is provided "AS IS" without warranties of any kind. We do not guarantee 
                  uninterrupted or error-free service.
                </p>
                <p>
                  To the maximum extent permitted by law, ProjectX shall not be liable for any indirect, 
                  incidental, special, or consequential damages.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">8. Termination</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  We reserve the right to suspend or terminate your account at any time for violation of 
                  these terms or for any other reason.
                </p>
                <p>
                  You may terminate your account at any time through your account settings or by contacting support.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">9. Contact Information</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  If you have questions about these Terms, please contact us:
                </p>
                <ul className="space-y-2">
                  <li><strong className="text-textPrimary">Email:</strong> legal@projectx.com</li>
                  <li><strong className="text-textPrimary">Support:</strong> support@projectx.com</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-highlight text-center">
            <Link 
              href="/"
              className="inline-block bg-accent hover:bg-[#B89658] text-background font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
