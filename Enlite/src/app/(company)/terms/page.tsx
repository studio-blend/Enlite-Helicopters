import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata = {
  title: "Terms of Service | Enlite Helicopters",
  description: "The official terms and conditions for using the Enlite Helicopters website and interacting with our autonomous aerial logistics platforms.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="text-4xl lg:text-5xl font-bold mb-12 tracking-tight">Terms of Service</h1>
          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Enlite Helicopters' website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">3. Disclaimer</h2>
              <p>
                The materials on Enlite Helicopters' website are provided on an 'as is' basis. Enlite Helicopters makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">4. Limitations</h2>
              <p>
                In no event shall Enlite Helicopters or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Enlite Helicopters' website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Tamil Nadu.
              </p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
