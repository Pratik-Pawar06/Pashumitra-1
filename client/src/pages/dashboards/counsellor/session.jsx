import { useState, useEffect } from "react";
import { useAuth } from "../../../context/Auth";

export default function Sessions() {
  const { user } = useAuth();
  console.log("use2", user);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/sessions/user/${user.id}`
        );
        const data = await res.json();
        console.log("res", data.sessions);
        setSessions(data.sessions);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleBook = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/sessions/${id}/book`, {
        method: "PUT",
      });

      setSessions((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "booked" } : s))
      );
    } catch (err) {
      console.error("Failed to book:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/sessions/${id}/reject`, {
        method: "PUT",
      });

      setSessions((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "rejected" } : s))
      );
    } catch (err) {
      console.error("Failed to reject:", err);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading sessions...</p>;
  }

  return (
    <div className="w-full mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        Upcoming Sessions
      </h3>

      {sessions.length === 0 ? (
        <p className="text-gray-500">No upcoming sessions scheduled.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Student
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Time
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6">
                    {session.userId?.name || "Unknown"}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(session.slot).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(session.slot).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-6">
                    <span
                      className={`font-semibold ${
                        session.status === "pending"
                          ? "text-yellow-500"
                          : session.status === "booked"
                          ? "text-blue-600"
                          : session.status === "completed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 space-x-2">
                    {session.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleBook(session._id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Book
                        </button>
                        <button
                          onClick={() => handleReject(session._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
