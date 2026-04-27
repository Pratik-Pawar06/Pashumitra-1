import { useState, useEffect } from "react";
import { useAuth } from "../../../context/Auth";

export default function MySessions() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Fetch counselors + sessions
  useEffect(() => {
    // 🔹 Fetch counselors
    fetch("http://localhost:5000/api/counselors")
      .then((res) => res.json())
      .then((data) => setCounselors(data.counsellor || [])) // backend sends { counsellor: [...] }
      .catch((err) => console.error("Error fetching counselors:", err));

    // 🔹 Fetch user sessions
    fetch(`http://localhost:5000/api/sessions/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => setSessions(data.sessions || []))
      .catch((err) => console.error("Error fetching sessions:", err));
  }, [user.id]);

  // Book a new session (status = pending)
  const handleBookSession = async () => {
    const payload = {
      userId: user.id,
      counselorId: selectedCounselor,
      slot: selectedSlot,
      status: "pending",
    };
    console.log("payload", payload);
    const res = await fetch("http://localhost:5000/api/sessions/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("data", data);
      setSessions([...sessions, data]);
      setSelectedCounselor("");
      setSelectedSlot("");
    } else {
      alert("Failed to request session.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold mb-4">My Sessions</h3>

      {/* Upcoming + Pending Sessions */}
      <div className="mb-6">
        {sessions.length === 0 ? (
          <p>No sessions yet</p>
        ) : (
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Counselor</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="text-center">
                  <td className="p-2 border">
                    {session.counselorName || "Unknown"}
                  </td>
                  <td className="p-2 border">
                    {new Date(session.slot).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(session.slot).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    className={`p-2 border font-semibold ${
                      session.status === "pending"
                        ? "text-yellow-500"
                        : session.status === "booked"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {session.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Booking Section */}
      <div>
        <h4 className="font-semibold mb-2">Book a Session</h4>

        {/* Select Counselor */}
        <select
          value={selectedCounselor}
          onChange={(e) => setSelectedCounselor(e.target.value)}
          className="p-2 border rounded w-full mb-3"
        >
          <option value="">Select Counselor</option>
          {counselors.map((c) => (
            <option key={c._id} value={c._id}>
              {c.username} {/* ✅ fix: show username */}
            </option>
          ))}
        </select>

        {/* Pick Date & Time */}
        <input
          type="datetime-local"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          className="p-2 border rounded w-full mb-3"
        />

        <button
          onClick={handleBookSession}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!selectedCounselor || !selectedSlot}
        >
          Request Session
        </button>
      </div>
    </div>
  );
}
