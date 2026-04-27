import { useState } from "react";

export default function VolunteerDashboard() {
  const [activeTab, setActiveTab] = useState("training");

  const assignments = [
    { title: "Assist in Group Session", due: "Tomorrow", status: "Pending" },
    { title: "Follow-up Calls", due: "In 3 days", status: "Completed" },
  ];

  const modules = [
    { title: "Active Listening Skills", duration: "45 min", completed: true },
    { title: "Crisis Recognition", duration: "60 min", completed: true },
    { title: "Peer Support Techniques", duration: "90 min", completed: false },
  ];

  const communityPosts = [
    {
      author: "Jane D.",
      message:
        "Just finished the Crisis Recognition module 💪 Feeling more confident!",
      time: "2h ago",
    },
    {
      author: "Alex K.",
      message: "Any tips for balancing volunteering with work?",
      time: "5h ago",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        💜 MindWell Volunteer
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-indigo-600">24</p>
          <p className="text-gray-500">Sessions Assisted</p>
          <p className="text-sm text-green-500">+3 this week</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-indigo-600">40%</p>
          <p className="text-gray-500">Training Progress</p>
          <p className="text-sm text-gray-400">2 of 5 modules completed</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p className="text-2xl font-bold text-indigo-600">36</p>
          <p className="text-gray-500">Hours Volunteered</p>
          <p className="text-sm text-gray-400">This month</p>
        </div>
      </div>

      {/* Tabs */}

      <div className="flex justify-between bg-gray-100 rounded-lg p-1 w-full max-w-2xl mb-6">
        {["assignments", "training", "community"].map((tab) => (
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

      {/* Assignments Section */}
      {activeTab === "assignments" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            My Assignments
          </h3>
          <div className="space-y-3">
            {assignments.map((task, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
              >
                <div>
                  <p className="font-medium text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">Due: {task.due}</p>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Training Section */}
      {activeTab === "training" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Training Modules
          </h3>
          <p className="text-gray-500 mb-4">
            Complete training modules to enhance your volunteer skills and earn
            certifications.
          </p>

          <div className="space-y-3">
            {modules.map((module, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div>
                  <p
                    className={`font-medium ${
                      module.completed ? "text-green-600" : "text-gray-700"
                    }`}
                  >
                    {module.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {module.duration}
                  </p>
                </div>
                <span className="text-xl">
                  {module.completed ? "✅" : "⭕"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Section */}
      {activeTab === "community" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Community Posts
          </h3>
          <div className="space-y-4">
            {communityPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500"
              >
                <p className="font-medium text-gray-800">{post.author}</p>
                <p className="text-gray-600">{post.message}</p>
                <p className="text-sm text-gray-400">{post.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
