import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata = {
  title: "Privacy Policy | Enlite Helicopters",
  description: "Learn how Enlite Helicopters handles your data and ensures your privacy in accordance with international aviation and data protection standards.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-4xl lg:text-5xl font-bold mb-12 tracking-tight">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Enlite Helicopters Private Limited ("we," "our," or "Enlite") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and interact with our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p>
                We may collect personal information such as your name, email address, phone number, and professional affiliation when you fill out contact forms, investor enquiry forms, or career applications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p>
                The information we collect is used to respond to your enquiries, process applications, provide project updates to investors, and improve our website experience. We do not sell or rent your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data. However, as an aerospace and defense-focused company, we maintain enhanced protocols for sensitive communications related to tactical and strategic logistics.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@enlitehelicopters.com" className="text-brand-red">info@enlitehelicopters.com</a>.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
