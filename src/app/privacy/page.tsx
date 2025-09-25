import Head from "next/head";

interface Section {
  title: string;
  content: React.ReactElement;
}

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | YourShopName</title>
        <meta
          name="description"
          content="Privacy Policy for YourShopName – Learn how we collect and use your data when you shop with us."
        />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          Last updated: August 26, 2025
        </p>

        {/* Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-blue-50">
              <tr>
                <th className="p-4 text-left text-blue-600 font-semibold border-r border-gray-200 w-1/3">
                  Section
                </th>
                <th className="p-4 text-left text-blue-600 font-semibold">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition border-t border-gray-200"
                >
                  <td className="p-4 font-medium text-gray-700 border-r border-gray-200">
                    {section.title}
                  </td>
                  <td className="p-4 text-gray-600">{section.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

const sections: Section[] = [
  {
    title: "1. Introduction",
    content: (
      <p>
        At <strong>MyShop</strong>, your privacy is very important to us. This
        Privacy Policy explains how we collect, use, and protect your personal
        information when you visit or make a purchase from our website.
      </p>
    ),
  },
  {
    title: "2. What Information We Collect",
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>Personal details (name, email, phone number, address)</li>
        <li>Payment details (securely processed via third-party providers)</li>
        <li>Order history and preferences</li>
        <li>Technical data (IP address, browser type, device info)</li>
        <li>Cookies and usage data for analytics</li>
      </ul>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <ul className="list-disc pl-6 space-y-1">
        <li>To process and deliver your orders</li>
        <li>To communicate updates, offers, and customer support</li>
        <li>To personalize your shopping experience</li>
        <li>To improve our website and services</li>
        <li>To comply with legal obligations</li>
      </ul>
    ),
  },
  {
    title: "4. Payment Processing",
    content: (
      <p>
        We do not store your card details. All payments are processed securely
        via trusted payment gateways like Razorpay, Stripe, or PayPal.
      </p>
    ),
  },
  {
    title: "5. Sharing Your Information",
    content: (
      <>
        <p>
          We only share your data with trusted third parties necessary to
          complete your order, such as:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Delivery partners (e.g., Shiprocket, Delhivery)</li>
          <li>Payment gateways</li>
          <li>Email marketing tools (optional)</li>
        </ul>
        <p className="mt-2 font-medium text-red-500">
          We never sell your personal data.
        </p>
      </>
    ),
  },
  {
    title: "6. Cookies and Tracking",
    content: (
      <p>
        We use cookies and analytics tools (like Google Analytics) to improve
        user experience and understand customer behavior. You can manage cookies
        through your browser settings.
      </p>
    ),
  },
  {
    title: "7. Data Retention",
    content: (
      <p>
        We retain your information only as long as necessary to provide our
        services and fulfill legal requirements. You may request deletion at any
        time.
      </p>
    ),
  },
  {
    title: "8. Your Rights",
    content: (
      <p>
        You have the right to access, correct, or delete your personal data. You
        may also opt-out of marketing communications at any time.
      </p>
    ),
  },
  {
    title: "9. Security",
    content: (
      <p>
        We implement industry-standard security measures to protect your data.
        However, no method of transmission over the Internet is 100% secure.
      </p>
    ),
  },
  {
    title: "10. Children’s Privacy",
    content: (
      <p>
        Our services are not directed to children under 13. We do not knowingly
        collect personal information from minors.
      </p>
    ),
  },
  {
    title: "11. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. All changes will be
        posted on this page with the updated date.
      </p>
    ),
  },
  {
    title: "12. Contact Us",
    content: (
      <p>
        If you have any questions about this policy, you can reach us at: <br />
        📧 <span className="text-blue-600">suppor@mystore.com</span>
        <br />
        📞 <span className="text-blue-600">+91-98615-0009 0</span>
      </p>
    ),
  },
];
