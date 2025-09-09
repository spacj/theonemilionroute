// pages/terms-and-conditions.js (for Pages Router)
// or app/terms-and-conditions/page.js (for App Router)

import Head from 'next/head';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - OneMilionRoute.com</title>
        <meta name="description" content="Terms and Conditions for OneMilionRoute.com - Legal terms governing the use of our services." />
        <meta name="robots" content="index, follow" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8 sm:px-10 sm:py-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-sm text-gray-500 mb-8">
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction and Acceptance</h2>
                  <p className="mb-4">
                    Welcome to OneMilionRoute.com! These Terms and Conditions 
                    ("Terms," "Agreement") govern your use of our website located at [Your Website URL] and our 
                    services (collectively, the "Service").
                  </p>
                  <p className="mb-4">
                    By accessing or using our Service, you agree to be bound by these Terms. If you disagree with 
                    any part of these terms, then you may not access the Service.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                    <p className="text-yellow-800">
                      <strong>Important:</strong> These Terms constitute a legally binding agreement between you and 
                      OneMilionRoute.com. Please read them carefully.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definitions</h2>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>"Service"</strong> refers to the website, application, and all related services provided by [Your App Name]</li>
                    <li><strong>"User," "you," or "your"</strong> refers to the individual accessing or using the Service</li>
                    <li><strong>"Content"</strong> refers to all text, graphics, images, music, software, audio, video, information, or other materials</li>
                    <li><strong>"Account"</strong> refers to the unique account created for you to access our Service</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Eligibility and Account Registration</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Age Requirements</h3>
                  <p className="mb-4">
                    You must be at least 18 years old to use this Service. If you are between 13 and 18 years old, 
                    you may only use the Service under the supervision of a parent or legal guardian who agrees to 
                    be bound by these Terms.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Account Information</h3>
                  <p className="mb-4">When creating an account, you must provide accurate and complete information. You are responsible for:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Maintaining the confidentiality of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                    <li>Keeping your account information current and accurate</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Permitted Uses</h3>
                  <p className="mb-4">You may use our Service for lawful purposes in accordance with these Terms.</p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Prohibited Activities</h3>
                  <p className="mb-4">You agree NOT to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Use the Service for any unlawful purpose or to solicit unlawful acts</li>
                    <li>Violate any international, federal, provincial, or state regulations or laws</li>
                    <li>Infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>Submit false or misleading information</li>
                    <li>Upload viruses or any other type of malicious code</li>
                    <li>Collect or track personal information of other users</li>
                    <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    <li>Use the Service for obscene or immoral purposes</li>
                    <li>Interfere with or circumvent security features of the Service</li>
                    <li>Reverse engineer, decompile, or disassemble any aspect of the Service</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Our Intellectual Property</h3>
                  <p className="mb-4">
                    The Service and its original content, features, and functionality are and will remain the exclusive 
                    property of OneMilionRoute.com and its licensors. The Service is protected by copyright, trademark, 
                    and other laws.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Your Content</h3>
                  <p className="mb-4">
                    You retain rights to any content you submit, post, or display on or through the Service ("Your Content"). 
                    By posting Your Content, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                    copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Copyright Infringement</h3>
                  <p className="mb-4">
                    We respect intellectual property rights. If you believe your work has been copied in a way that 
                    constitutes copyright infringement, please contact us with the following information:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Identification of the copyrighted work claimed to have been infringed</li>
                    <li>Identification of the material claimed to be infringing</li>
                    <li>Your contact information</li>
                    <li>A statement of good faith belief that use is not authorized</li>
                    <li>A statement of accuracy and authority to act on behalf of the copyright owner</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
                  <p className="mb-4">
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                    your information when you use our Service. By using our Service, you agree to the collection 
                    and use of information in accordance with our Privacy Policy.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">GDPR Compliance (EU Users)</h3>
                  <p className="mb-4">If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Right to access your personal data</li>
                    <li>Right to rectification of inaccurate data</li>
                    <li>Right to erasure ("right to be forgotten")</li>
                    <li>Right to restrict processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Payment Terms and Billing</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Pricing</h3>
                  <p className="mb-4">
                    Current pricing for our services is available on our website. We reserve the right to modify 
                    pricing with 30 days' notice to existing users.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Payment Processing</h3>
                  <p className="mb-4">All payments are processed securely through third-party payment processors. You agree to provide current, complete, and accurate purchase information.</p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Refunds and Cancellations</h3>
                  <p className="mb-4">
                    Refund and cancellation policies are subject to the specific terms of your subscription or purchase. 
                    Generally, you may cancel at any time, but refunds are provided at our discretion and in accordance 
                    with applicable consumer protection laws.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Consumer Rights</h3>
                  <p className="mb-4">
                    Nothing in these Terms affects your statutory rights as a consumer. In some jurisdictions, you 
                    may have the right to cancel purchases within a certain period (e.g., 14 days in the EU).
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers and Limitation of Liability</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Service Availability</h3>
                  <p className="mb-4">
                    We strive to maintain the Service but cannot guarantee uninterrupted access. The Service is 
                    provided "as is" and "as available" without warranties of any kind.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Disclaimer of Warranties</h3>
                  <p className="mb-4">
                    To the fullest extent permitted by applicable law, we disclaim all warranties, express or implied, 
                    including but not limited to implied warranties of merchantability, fitness for a particular purpose, 
                    and non-infringement.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Limitation of Liability</h3>
                  <p className="mb-4">
                    In no event shall [Your Company Name] be liable for any indirect, incidental, special, consequential, 
                    or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
                    intangible losses, resulting from your use of the Service.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                    <p className="text-blue-800">
                      <strong>Note:</strong> Some jurisdictions do not allow the exclusion of certain warranties or 
                      the limitation of liability for consequential or incidental damages. In such jurisdictions, 
                      our liability will be limited to the maximum extent permitted by law.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
                  <p className="mb-4">
                    You agree to defend, indemnify, and hold harmless [Your Company Name] and its licensee and licensors, 
                    and their employees, contractors, agents, officers and directors, from and against any and all claims, 
                    damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Termination by You</h3>
                  <p className="mb-4">You may terminate your account at any time by contacting us or using account settings.</p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Termination by Us</h3>
                  <p className="mb-4">We may terminate or suspend your account immediately if you:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Breach any provision of these Terms</li>
                    <li>Engage in unlawful or harmful conduct</li>
                    <li>Fail to pay any fees when due</li>
                    <li>Create security risks for the Service or other users</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Effect of Termination</h3>
                  <p className="mb-4">
                    Upon termination, your right to use the Service will cease immediately. Data associated with your 
                    account may be deleted in accordance with our data retention policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Dispute Resolution</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Governing Law</h3>
                  <p className="mb-4">
                    These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard 
                    to its conflict of law provisions.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Arbitration (Where Applicable)</h3>
                  <p className="mb-4">
                    Any dispute arising from these Terms or the Service will be resolved through binding arbitration, 
                    except where prohibited by law or where you have the right to take claims to small claims court.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">EU Users - Alternative Dispute Resolution</h3>
                  <p className="mb-4">
                    If you are a consumer located in the European Union, you may use the European Commission's 
                    Online Dispute Resolution (ODR) platform at: https://ec.europa.eu/consumers/odr/
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. International Considerations</h2>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Global Access</h3>
                  <p className="mb-4">
                    The Service is controlled and operated from [Your Country]. We make no representations that 
                    the Service is appropriate or available for use in other locations.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Export Controls</h3>
                  <p className="mb-4">
                    The Service may be subject to export controls. You agree to comply with all applicable export 
                    and re-export control laws and regulations.
                  </p>
                  
                  <h3 className="text-xl font-medium text-gray-800 mb-3">Local Laws</h3>
                  <p className="mb-4">
                    If you access the Service from outside [Your Country], you are responsible for compliance 
                    with local laws.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Force Majeure</h2>
                  <p>
                    We will not be liable for any failure or delay in performing our obligations under these Terms 
                    due to causes beyond our reasonable control, including but not limited to acts of God, natural disasters, 
                    war, terrorism, strikes, or government actions.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability</h2>
                  <p>
                    If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions 
                    will remain in full force and effect, and the invalid provision will be replaced with a valid 
                    provision that best reflects the original intent.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Changes to Terms</h2>
                  <p className="mb-4">
                    We reserve the right to modify these Terms at any time. We will notify users of material changes 
                    by email or through the Service at least 30 days before the changes take effect.
                  </p>
                  <p className="mb-4">
                    Your continued use of the Service after changes take effect constitutes acceptance of the new Terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Entire Agreement</h2>
                  <p>
                    These Terms, together with our Privacy Policy and any additional terms applicable to specific 
                    features of the Service, constitute the complete and exclusive agreement between you and 
                    OneMilionRoute.com.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Contact Information</h2>
                  <p className="mb-4">If you have any questions about these Terms, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Company:</strong> OneMilionRoute.com</p>
                    <p><strong>Email:</strong> greenwue@proton.me</p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">For EU Users:</h4>
                    <p className="text-green-700">
                      Data Protection Officer: dpo@yourapp.com<br />
                      EU Representative: [EU Representative Details if applicable]
                    </p>
                  </div>
                </section>

                <div className="border-t pt-6 mt-8">
                  <p className="text-sm text-gray-500">
                    By using our Service, you acknowledge that you have read and understood these Terms and agree to be bound by them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}