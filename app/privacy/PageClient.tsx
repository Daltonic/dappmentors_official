// app/privacy/page.tsx
"use client";

import MarketingLayout from "@/components/layouts/MarketingLayout";
import CTASection from "@/components/shared/CTASection";
import HeroSection from "@/components/shared/HeroSection";
import React from "react";
import { useRouter } from "next/navigation";

interface PrivacySectionProps {
  title: string;
  content: string;
  icon: string;
}

const PrivacySection: React.FC<PrivacySectionProps> = ({
  title,
  content,
  icon,
}) => {
  return (
    <div className="group mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg space-y-4">
        {content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

const PrivacyContent = () => {
  const lastUpdated = "January 15, 2025";

  const privacySections = [
    {
      title: "Information We Collect",
      icon: "📊",
      content: `We collect information you provide directly to us, such as when you create an account, enroll in courses, purchase products, or contact us for support.

Personal Information: Name, email address, payment information, and educational preferences.

Usage Data: Information about how you use our platform, including course progress, time spent on lessons, and interaction patterns.

Technical Data: IP address, browser type, device information, and cookies to improve your experience and platform security.`,
    },
    {
      title: "How We Use Your Information",
      icon: "🔧",
      content: `We use your information to provide, maintain, and improve our educational services and platform functionality.

Service Delivery: Process payments, deliver course content, track progress, and provide customer support.

Communication: Send course updates, important announcements, and respond to your inquiries.

Improvement: Analyze usage patterns to enhance our platform, develop new features, and create better educational content.

Legal Compliance: Meet legal obligations, prevent fraud, and ensure platform security.`,
    },
    {
      title: "Information Sharing",
      icon: "🤝",
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in specific circumstances.

Service Providers: Trusted third-party services that help us operate our platform, process payments, and deliver content.

Legal Requirements: When required by law, legal process, or to protect our rights and the safety of our users.

Business Transfers: In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the business.

With Consent: Any other sharing will only occur with your explicit consent.`,
    },
    {
      title: "Data Security",
      icon: "🔒",
      content: `We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.

Encryption: All sensitive data is encrypted both in transit and at rest using advanced encryption protocols.

Access Controls: Strict access controls ensure only authorized personnel can access your information on a need-to-know basis.

Regular Audits: We conduct regular security audits and updates to maintain the highest level of protection.

Incident Response: We have procedures in place to respond quickly to any potential security incidents.`,
    },
    {
      title: "Your Rights and Choices",
      icon: "⚖️",
      content: `Xperia: You have several rights regarding your personal information and how we use it.

Access and Correction: You can request access to your personal information and ask us to correct any inaccuracies.

Data Portability: You can request a copy of your data in a structured, machine-readable format.

Deletion: You can request deletion of your personal information, subject to certain legal and operational requirements.

Opt-Out: You can opt out of marketing communications at any time using the unsubscribe link in our emails.

Account Control: You can update your account settings and privacy preferences through your user dashboard.`,
    },
    {
      title: "Cookies and Tracking",
      icon: "🍪",
      content: `We use cookies and similar technologies to enhance your experience and analyze platform usage.

Essential Cookies: Required for basic platform functionality, security, and user authentication.

Analytics Cookies: Help us understand how users interact with our platform to improve the user experience.

Preference Cookies: Remember your settings and preferences for a personalized experience.

Cookie Control: You can manage cookie preferences through your browser settings, though disabling certain cookies may affect platform functionality.`,
    },
    {
      title: "Third-Party Services",
      icon: "🔗",
      content: `Our platform integrates with trusted third-party services to provide comprehensive functionality.

Payment Processors: Secure payment processing through established financial service providers.

Analytics Services: Usage analytics to help us improve our platform and educational content.

Communication Tools: Email and messaging services for course delivery and customer support.

Educational Partners: Blockchain networks and development tools that enhance our educational offerings.

Each third-party service has its own privacy policy, and we encourage you to review their practices.`,
    },
    {
      title: "Data Retention",
      icon: "📅",
      content: `We retain your information only as long as necessary to provide our services and comply with legal obligations.

Account Data: Maintained while your account is active and for a reasonable period after account closure.

Course Progress: Educational data is retained to support your ongoing learning and certification needs.

Legal Requirements: Some data may be retained longer to comply with legal, tax, or regulatory obligations.

Deletion Requests: We will delete your data upon request, except where retention is required by law or legitimate business interests.`,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Last Updated */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 backdrop-blur-sm rounded-full px-6 py-2">
            <span className="text-[#D2145A] font-medium text-sm">
              Last Updated: {lastUpdated}
            </span>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-16">
          {privacySections.map((section, index) => (
            <PrivacySection
              key={index}
              title={section.title}
              content={section.content}
              icon={section.icon}
            />
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 p-8 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 rounded-3xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-xl">
              📋
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Important Notes
            </h2>
          </div>
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg space-y-4">
            <p>
              <strong>Children&apos;s Privacy:</strong> Our services are not
              intended for children under 13 years of age. We do not knowingly
              collect personal information from children under 13.
            </p>
            <p>
              <strong>International Users:</strong> Your information may be
              transferred to and processed in countries other than your own. We
              ensure appropriate safeguards are in place for such transfers.
            </p>
            <p>
              <strong>Policy Updates:</strong> We may update this Privacy Policy
              from time to time. We will notify you of any material changes via
              email or through our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Client Component for Privacy Page
const PageClient = () => {
  const router = useRouter();

  // CTA Actions
  const handlePrimaryCTA = () => {
    router.push("/contact");
  };

  return (
    <MarketingLayout>
      <HeroSection
        tagText="Legal Information"
        title="Privacy Policy"
        highlightText="Privacy"
        subtitle="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use Dapp Mentors."
      />

      <PrivacyContent />

      <CTASection
        title="Questions About Your Privacy?"
        highlightText="Your Privacy"
        subtitle="If you have any questions about this Privacy Policy or our data practices, we're here to help clarify anything you need."
        primaryButtonText="Contact Us"
        primaryOnClick={handlePrimaryCTA}
      />
    </MarketingLayout>
  );
};

export default PageClient;
