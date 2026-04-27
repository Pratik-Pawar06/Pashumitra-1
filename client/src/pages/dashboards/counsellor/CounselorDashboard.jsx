import { useState } from "react";
import Session from "./Session";
export default function CounselorDashboard() {
  const [activeTab, setActiveTab] = useState("messages");
  const [sessions, setSessions] = useState([]);

  return (
    <div className="p-6">
      {/* Top Stats */}
      <h2 className="text-2xl font-bold mb-6">Welcome, Counselor</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-gray-500">Today's Sessions</p>
          <p className="text-xl font-bold">2</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-gray-500">This Week</p>
          <p className="text-xl font-bold">12</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-gray-500">Active Clients</p>
          <p className="text-xl font-bold">18</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-gray-500">Rating</p>
          <p className="text-xl font-bold text-green-600">4.9</p>
        </div>
      </div>

      {/* Tabs */}

      <div className="flex justify-between bg-gray-100 rounded-lg p-1 w-full max-w-2xl mb-6">
        {["sessions", "messages", "notes", "resources"].map((tab) => (
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

      {/* Tab Content */}
      <div className="bg-white shadow rounded-xl p-6">
        {activeTab === "sessions" && <Session />}
        {activeTab === "messages" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Client Messages</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">Sarah J.</p>
                <p className="text-gray-600 text-sm">
                  "I've been practicing the breathing exercises you taught me.
                  They're helping with my anxiety."
                </p>
                <button className="mt-2 text-blue-600 text-sm">💬 Reply</button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold">Michael C.</p>
                <p className="text-gray-600 text-sm">
                  "Thank you for the resources. The journal prompts are very
                  helpful."
                </p>
                <button className="mt-2 text-blue-600 text-sm">💬 Reply</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Session Notes</h3>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="4"
              placeholder="Write notes about your sessions..."
            />
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Notes
            </button>
          </div>
        )}

        {activeTab === "resources" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Shared Resources</h3>
            <ul className="list-disc ml-5 text-gray-600">
              <li>Guided Breathing Video</li>
              <li>Mindfulness Audio</li>
              <li>Stress Management PDF</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
