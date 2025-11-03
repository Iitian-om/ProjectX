import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      {/* Navigation */}
      <Navbar showHome={true} />

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-textSecondary text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Notice */}
          <div className="bg-success/10 border border-success/30 rounded-xl p-6 mb-12">
            <p className="text-success font-semibold mb-2">🔒 Your Privacy Matters</p>
            <p className="text-textSecondary">
              We are committed to protecting your personal information and your right to privacy. This policy 
              explains what data we collect, how we use it, and your rights.
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">1. Information We Collect</h2>
              <div className="text-textSecondary space-y-4">
                <p><strong className="text-textPrimary">Personal Information:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and email address</li>
                  <li>Account credentials</li>
                  <li>Profile information you choose to provide</li>
                </ul>
                <p><strong className="text-textPrimary">Usage Data:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Events, tasks, and reminders you create</li>
                  <li>Calendar data from integrated services</li>
                  <li>Device information and IP address</li>
                  <li>Browser type and operating system</li>
                  <li>Usage patterns and analytics data</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">2. How We Use Your Information</h2>
              <div className="text-textSecondary space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Personalize your experience</li>
                  <li>Send notifications and reminders</li>
                  <li>Sync data across your devices</li>
                  <li>Analyze usage patterns to improve features</li>
                  <li>Communicate with you about updates and promotions</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">3. Third-Party Integrations</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  ProjectX integrates with third-party services like Google Calendar, Outlook, and Microsoft Teams. 
                  When you connect these services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We access only the data necessary to provide our service</li>
                  <li>You can revoke access at any time through your account settings</li>
                  <li>Third-party services are governed by their own privacy policies</li>
                </ul>
                <p>
                  We use industry-standard OAuth 2.0 for secure authentication and never store your third-party passwords.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">4. Data Sharing and Disclosure</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  <strong className="text-textPrimary">We do NOT sell your personal data.</strong>
                </p>
                <p>We may share your information only in these circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-textPrimary">With Your Consent:</strong> When you explicitly authorize sharing</li>
                  <li><strong className="text-textPrimary">Service Providers:</strong> Third parties who help us operate (hosting, analytics)</li>
                  <li><strong className="text-textPrimary">Legal Requirements:</strong> When required by law or to protect rights</li>
                  <li><strong className="text-textPrimary">Business Transfers:</strong> In case of merger or acquisition</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">5. Data Security</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption in transit (HTTPS/TLS)</li>
                  <li>Encryption at rest for sensitive data</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Secure backup procedures</li>
                </ul>
                <p className="italic">
                  However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">6. Your Privacy Rights</h2>
              <div className="text-textSecondary space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-textPrimary">Access:</strong> Request a copy of your personal data</li>
                  <li><strong className="text-textPrimary">Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong className="text-textPrimary">Deletion:</strong> Request deletion of your data</li>
                  <li><strong className="text-textPrimary">Export:</strong> Download your data in a portable format</li>
                  <li><strong className="text-textPrimary">Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
                <p>
                  To exercise these rights, contact us at <span className="text-accent">privacy@projectx.com</span>
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">7. Cookies and Tracking</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Keep you logged in</li>
                  <li>Remember your preferences</li>
                  <li>Analyze site performance</li>
                  <li>Improve user experience</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. Note that disabling cookies may limit functionality.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">8. Data Retention</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  We retain your data for as long as your account is active or as needed to provide services. 
                  After account deletion, we may retain certain data for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Legal compliance</li>
                  <li>Fraud prevention</li>
                  <li>Backup systems (typically 30-90 days)</li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">9. Children's Privacy</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  ProjectX is not intended for users under 13 years of age. We do not knowingly collect 
                  personal information from children. If you believe we have collected data from a child, 
                  please contact us immediately.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">10. International Data Transfers</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  Your data may be processed in countries other than your own. We ensure appropriate safeguards 
                  are in place for international transfers.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">11. Changes to This Policy</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes 
                  via email or through the Service. Continued use after changes constitutes acceptance.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-accent mb-4">12. Contact Us</h2>
              <div className="text-textSecondary space-y-4">
                <p>
                  If you have questions about this Privacy Policy, please contact:
                </p>
                <div className="bg-surface p-6 rounded-xl border border-highlight">
                  <ul className="space-y-2">
                    <li><strong className="text-textPrimary">Email:</strong> privacy@projectx.com</li>
                    <li><strong className="text-textPrimary">Support:</strong> support@projectx.com</li>
                    <li><strong className="text-textPrimary">Data Protection Officer:</strong> dpo@projectx.com</li>
                  </ul>
                </div>
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
