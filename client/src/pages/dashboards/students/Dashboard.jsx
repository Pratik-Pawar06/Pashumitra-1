import { useState } from "react";
import AiSupport from "./AiSupport";
import MySessions from "./MySessions";
import Progress from "./Progress";
import Resources from "./Resources";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("ai support");

  const renderTab = () => {
    switch (activeTab) {
      case "ai support":
        return <AiSupport />;
      case "my sessions":
        return <MySessions />;
      case "progress":
        return <Progress />;
      case "resources":
        return <Resources />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to Your Wellness Dashboard
        </h2>
        <p className="text-gray-500 mb-6">
          Your safe space for mental health support and growth.
        </p>

        {/* Top Tab Navigation */}
        <div className="flex justify-between bg-gray-100 rounded-lg p-1 w-full max-w-2xl mb-6">
          {["AI Support", "My Sessions", "Progress", "Resources"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`flex-1 py-2 rounded-md transition ${
                activeTab === tab.toLowerCase()
                  ? "bg-white text-blue-600 font-semibold shadow"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Layout with left + right */}
        <div className="flex gap-6">
          {/* Left Block: Active Tab */}
          <div className="flex-1">{renderTab()}</div>

          {/* Right Block: Quick Actions */}
          <div className="w-80 bg-white rounded-xl shadow p-5 sticky top-6 self-start">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-col space-y-3">
              <button
                className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => setActiveTab("ai support")}
              >
                📋 Mental Health Assessment
              </button>
              <button
                className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => setActiveTab("my sessions")}
              >
                📅 Schedule Mentor Session
              </button>
              <button
                className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => setActiveTab("resources")}
              >
                💙 Browse Wellness Resources
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
