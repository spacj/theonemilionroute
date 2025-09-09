// pages/privacy-policy.js (for Pages Router)
// or app/privacy-policy/page.js (for App Router)

import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - OneMilioRoute.com</title>
        <meta name="description" content="Privacy Policy for OneMilioRoute.com - Learn how we collect, use, and protect your personal information." />
        <meta name="robots" content="index, follow" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-sm text-gray-500 mb-8">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="mb-4">
                    Welcome to OneMilioRoute.com! We are committed to protecting your privacy 
                    and ensuring you have a positive experience on our website and in using our products and services.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                    you visit our website OneMilioRoute.com and use our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
                  <p className="mb-4">We may collect personal information that you voluntarily provide, including:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Name and contact information (email address, phone number)</li>
                    <li>Account credentials (username, password)</li>
                    <li>Profile information and preferences</li>
                    <li>Payment and billing information</li>
                    <li>Communication history with our support team</li>
                  </ul>

                  <h3 className="text-xl font-medium text-gray-800 mb-3">Automatically Collected Information</h3>
                  <p className="mb-4">We automatically collect certain information when you use our services:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent, click patterns)</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Location information (with your consent)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                  <p className="mb-4">We use the collected information for various purposes, including:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Providing, operating, and maintaining our services</li>
                    <li>Improving and personalizing your experience</li>
                    <li>Processing transactions and managing your account</li>
                    <li>Sending administrative and promotional communications</li>
                    <li>Responding to your inquiries and providing customer support</li>
                    <li>Detecting, preventing, and addressing technical issues and security threats</li>
                    <li>Complying with legal obligations and enforcing our terms</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                  <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Service Providers</h3>
                  <p className="mb-4">We may share information with trusted third-party service providers who assist us in operating our website, conducting business, or serving our users.</p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Legal Requirements</h3>
                  <p className="mb-4">We may disclose your information if required by law or in response to valid requests by public authorities.</p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Business Transfers</h3>
                  <p className="mb-4">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                  <p className="mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Privacy Rights</h2>
                  <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Access:</strong> Request copies of your personal information</li>
                    <li><strong>Rectification:</strong> Request correction of inaccurate information</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                    <li><strong>Objection:</strong> Object to certain processing of your information</li>
                    <li><strong>Restriction:</strong> Request limitation of processing in certain circumstances</li>
                  </ul>
                  <p>To exercise these rights, please contact us using the information provided below.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
                  <p className="mb-4">
                    We use cookies and similar tracking technologies to enhance your experience on our website. 
                    Cookies are small data files stored on your device that help us remember your preferences and improve our services.
                  </p>
                  <p className="mb-4">You can control cookie settings through your browser preferences. However, disabling cookies may limit some functionality of our website.</p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy 
                    practices or content of these external sites. We encourage you to review the privacy policies 
                    of any third-party sites you visit.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
                  <p>
                    Our services are not intended for children under the age of 13. We do not knowingly collect 
                    personal information from children under 13. If we become aware that we have collected personal 
                    information from a child under 13, we will take steps to delete such information promptly.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
                  <p>
                    Your information may be transferred to and processed in countries other than your own. 
                    We ensure appropriate safeguards are in place to protect your personal information in accordance 
                    with applicable data protection laws.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Updates to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or 
                    applicable laws. We will notify you of any material changes by posting the updated policy on 
                    our website and updating the "Last Updated" date above.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
                  <p className="mb-4">If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Email:</strong> greenwue@proton.me</p>
                    <p><strong>Address:</strong> OneMilioRoute.com</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}