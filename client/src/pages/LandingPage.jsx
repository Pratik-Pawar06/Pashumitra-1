import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaUserMd,
  FaUsers,
  FaPhoneAlt,
  FaGlobe,
  FaSms,
  FaExternalLinkAlt,
  FaHeadphones,
  FaVideo,
  FaFilePdf,
} from "react-icons/fa";

export default function LandingPage() {
  const helplines = [
    {
      name: "Vandrevala Foundation Helpline",
      desc: "24/7 free mental health support across India.",
      phone: "1860 266 2345",
      link: "tel:18602662345",
      type: "India",
    },
    {
      name: "AASRA",
      desc: "Suicide prevention & crisis support in India.",
      phone: "+91-9820466726",
      link: "tel:+919820466726",
      type: "India",
    },
    {
      name: "Snehi Helpline",
      desc: "Confidential emotional support for distress.",
      phone: "+91-9582208181",
      link: "tel:+919582208181",
      type: "India",
    },
    {
      name: "National Suicide Prevention Lifeline (US)",
      desc: "24/7 confidential support in the USA.",
      phone: "988",
      link: "tel:988",
      type: "International",
    },
    {
      name: "Samaritans (UK)",
      desc: "Free 24/7 support for anyone in emotional distress.",
      phone: "116 123",
      link: "tel:116123",
      type: "International",
    },
    {
      name: "iCall (TISS Mumbai)",
      desc: "Professional counseling via phone & email.",
      phone: "+91-9152987821",
      link: "tel:+919152987821",
      type: "India",
    },
    {
      name: "7 Cups Online Chat",
      desc: "Free online emotional support & chat.",
      phone: null,
      link: "https://www.7cups.com",
      type: "Online",
    },
  ];

  const categories = [
    { key: "audio", label: "Audio", icon: <FaHeadphones /> },
    { key: "video", label: "Video", icon: <FaVideo /> },
    { key: "pdf", label: "PDF", icon: <FaFilePdf /> },
  ];

  const resources = {
    audio: [
      {
        title: "Relaxing Meditation Music",
        desc: "Soothing background audio for meditation and stress relief.",
        link: "https://www.youtube.com/watch?v=2OEL4P1Rz04",
      },
      {
        title: "Mindfulness Guided Session",
        desc: "Guided audio for mindfulness practice.",
        link: "https://www.youtube.com/watch?v=inpok4MKVLM",
      },
    ],
    video: [
      {
        title: "Stress Management Tips",
        desc: "Video explaining effective stress management techniques.",
        link: "https://www.youtube.com/watch?v=hnpQrMqDoqE",
      },
      {
        title: "Deep Breathing Exercise",
        desc: "Step-by-step deep breathing routine.",
        link: "https://www.youtube.com/watch?v=nmFUDkj1Aq0",
      },
    ],
    pdf: [
      {
        title: "Guide to Mental Wellness",
        desc: "Comprehensive PDF guide on maintaining mental well-being.",
        link: "https://www.who.int/mental_health/evidence/en/promoting_mhh.pdf",
      },
      {
        title: "Stress Relief Exercises",
        desc: "PDF with quick daily exercises to reduce stress.",
        link: "https://www.apa.org/topics/stress/stress-relief.pdf",
      },
    ],
  };

  const [activeTab, setActiveTab] = useState("audio");

  const roles = [
    {
      title: "I need support",
      desc: "Access mental health resources, chat with AI, and connect with counsellor",
      btn: "Login as student",
      color: "bg-blue-500 hover:bg-blue-600",
      link: "/login/student",
      icon: "💙",
    },
    {
      title: "I'm a counsellor",
      desc: "Provide professional guidance and support to those in need",
      btn: "Login as counsellor",
      color: "bg-green-500 hover:bg-green-600",
      link: "/login/counsellor",
      icon: "🧑‍🏫",
    },
    {
      title: "I want to help",
      desc: "Volunteer to support others and assist in counsellor sessions",
      btn: "Login as Volunteer",
      color: "bg-purple-500 hover:bg-purple-600",
      link: "/login/volunteer",
      icon: "🤝",
    },
    {
      title: "Administrator",
      desc: "Manage the platform, users, and monitor system health",
      btn: "Admin Login",
      color: "bg-orange-500 hover:bg-orange-600",
      link: "/login/admin",
      icon: "🛡️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Your safe space for mental wellness
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Connect with professional counsellor, take assessments, and join a
          supportive community dedicated to your mental health journey.
        </p>
      </section>

      {/* Role Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 pb-16">
        {roles.map((role, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between text-center"
          >
            <div>
              <div className="text-4xl mb-4">{role.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {role.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{role.desc}</p>
            </div>
            <Link
              to={role.link}
              className={`${role.color} text-white px-4 py-2 rounded-lg mt-6 block`}
            >
              {role.btn}
            </Link>
          </div>
        ))}
      </section>
      <section
        className="bg-white min-h-screen flex items-center justify-center"
        id="about"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
            How We Support You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* AI-Powered Support */}
            <div className="flex flex-col items-center text-center">
              <div className="text-blue-500 text-5xl mb-4">
                <FaRobot />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Support</h3>
              <p className="text-gray-600">
                Chat with our intelligent assistant for immediate support and
                guidance 24/7.
              </p>
            </div>

            {/* Professional counsellor */}
            <div className="flex flex-col items-center text-center">
              <div className="text-green-500 text-5xl mb-4">
                <FaUserMd />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Professional counsellor
              </h3>
              <p className="text-gray-600">
                Connect with certified mental health professionals for
                personalized sessions.
              </p>
            </div>

            {/* Community Support */}
            <div className="flex flex-col items-center text-center">
              <div className="text-purple-500 text-5xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a caring community of volunteers and peers on similar
                journeys.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="resources" className="py-12 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Resources
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === cat.key
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 shadow hover:bg-blue-100"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resources[activeTab].map((res, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">
                {res.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{res.desc}</p>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Open Resource <FaExternalLinkAlt size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="py-12 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Helpline Support
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          If you or someone you know is struggling, reach out to these trusted
          helplines for immediate support. 💙
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {helplines.map((h, i) => (
            <div
              key={i}
              className="bg-gray-50 border shadow-md rounded-lg p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg text-gray-800">
                  {h.name}
                </h3>
                {h.phone ? (
                  <FaPhoneAlt className="text-blue-500" />
                ) : (
                  <FaGlobe className="text-green-500" />
                )}
              </div>
              <p className="text-gray-600 text-sm mb-3">{h.desc}</p>

              {h.phone && (
                <a
                  href={h.link}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                >
                  Call {h.phone}
                </a>
              )}

              {!h.phone && (
                <a
                  href={h.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                >
                  Visit Website <FaExternalLinkAlt size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
