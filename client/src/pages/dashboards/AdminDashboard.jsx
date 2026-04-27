import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mentors = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Anxiety & Stress",
    rating: "4.9",
    status: "Available",
  },
  {
    name: "Dr. Michael Torres",
    specialty: "Depression",
    rating: "4.8",
    status: "Busy",
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "General Mental Health",
    rating: "4.9",
    status: "Available",
  },
];

const volunteers = [
  {
    name: "Alex Thompson",
    role: "Support Volunteer",
    duration: "6 months",
    status: "Active",
  },
  {
    name: "Maria Lopez",
    role: "Peer Support",
    duration: "1 year",
    status: "Active",
  },
  {
    name: "David Kim",
    role: "Community Support",
    duration: "8 months",
    status: "Active",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Users", value: 1200, change: "+5%" },
    { label: "New Signups", value: 80, change: "+10%" },
    { label: "Active Sessions", value: 45, change: "-2%" },
    { label: "Completed Sessions", value: 300, change: "+8%" },
  ];

  const userGrowthData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Users",
        data: [50, 75, 150, 100, 200, 180, 220],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const weeklySessionsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sessions",
        data: [5, 8, 6, 10, 7, 12, 9],
        backgroundColor: "rgb(16, 185, 129)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">MindWell Admin Dashboard</h1>
      </header>

      {/* Tab Navigation */}
      <div className="flex justify-between bg-gray-100 rounded-lg p-1 w-full max-w-2xl mb-6">
        {[
          "overview",
          "user-management",
          "mentors-volunteers",
          "reports-analytics",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-md transition ${
              activeTab === tab
                ? "bg-white text-blue-600 font-semibold shadow"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded shadow p-4">
                <h2 className="font-bold text-lg">{stat.label}</h2>
                <p className="text-2xl">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded shadow p-4">
              <h2 className="font-semibold mb-4">User Growth</h2>
              <Line data={userGrowthData} options={chartOptions} />
            </div>

            <div className="bg-white rounded shadow p-4">
              <h2 className="font-semibold mb-4">Weekly Sessions</h2>
              <Bar data={weeklySessionsData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "user-management" && (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p className="text-gray-600">
            Here you can manage users, activate/deactivate accounts, and edit
            roles.
          </p>
        </div>
      )}

      {activeTab === "mentors-volunteers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-4">Active Mentors</h2>
            {mentors.map((mentor, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3 p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-semibold">{mentor.name}</p>
                  <p className="text-sm text-gray-600">
                    {mentor.specialty} • ⭐ {mentor.rating}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    mentor.status === "Available"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {mentor.status}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-4">Active Volunteers</h2>
            {volunteers.map((volunteer, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3 p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-semibold">{volunteer.name}</p>
                  <p className="text-sm text-gray-600">
                    {volunteer.role} • {volunteer.duration}
                  </p>
                </div>
                <span className="px-2 py-1 rounded text-sm bg-green-200 text-green-800">
                  {volunteer.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "reports-analytics" && (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Reports & Analytics</h2>
          <p className="text-gray-600">
            Visualize reports and export data here.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
