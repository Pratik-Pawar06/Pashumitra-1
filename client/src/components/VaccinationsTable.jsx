import React, { useState, useEffect } from "react";

function VaccinationComponent() {
  const [activeTab, setActiveTab] = useState("view");
  const [vaccinations, setVaccinations] = useState([]);

  const [form, setForm] = useState({
    AnimalID: "",
    VaccineName: "",
    VaccinationDate: "",
    NextDueDate: "",
  });

  const fetchVaccinations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/vaccinations");
      const data = await res.json();
      setVaccinations(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch vaccinations");
    }
  };

  useEffect(() => {
    fetchVaccinations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddVaccination = async (e) => {
    e.preventDefault();

    if (
      !form.AnimalID ||
      !form.VaccineName ||
      !form.VaccinationDate ||
      !form.NextDueDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/vaccinations/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Vaccination added successfully!");

        setForm({
          AnimalID: "",
          VaccineName: "",
          VaccinationDate: "",
          NextDueDate: "",
        });

        fetchVaccinations();
        setActiveTab("view");
      } else {
        alert(data.message || "Failed to add vaccination");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding vaccination");
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "Not updated";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vaccination Records</h2>

      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "view" ? "border-b-2 border-yellow-500" : ""
          }`}
          onClick={() => setActiveTab("view")}
        >
          View Vaccinations
        </button>

        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "add" ? "border-b-2 border-yellow-500" : ""
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Vaccination
        </button>
      </div>

      {activeTab === "view" && (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 border">Animal ID</th>
              <th className="p-2 border">Animal Type</th>
              <th className="p-2 border">Breed</th>
              <th className="p-2 border">Vaccine Name</th>
              <th className="p-2 border">Vaccination Date</th>
              <th className="p-2 border">Next Due Date</th>
            </tr>
          </thead>

          <tbody>
            {vaccinations.map((v) => (
              <tr key={v.VaccinationID} className="text-center">
                <td className="p-2 border">{v.AnimalID}</td>
                <td className="p-2 border">{v.AnimalType || "-"}</td>
                <td className="p-2 border">{v.Breed || "-"}</td>
                <td className="p-2 border">{v.VaccineName}</td>
                <td className="p-2 border">
                  {formatDate(v.VaccinationDate)}
                </td>
                <td className="p-2 border">{formatDate(v.NextDueDate)}</td>
              </tr>
            ))}

            {vaccinations.length === 0 && (
              <tr>
                <td colSpan="6" className="p-2 border text-center">
                  No vaccination records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {activeTab === "add" && (
        <form onSubmit={handleAddVaccination} className="space-y-4 max-w-md">
          <input
            type="number"
            name="AnimalID"
            value={form.AnimalID}
            onChange={handleChange}
            placeholder="Animal ID"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="VaccineName"
            value={form.VaccineName}
            onChange={handleChange}
            placeholder="Vaccine Name"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="date"
            name="VaccinationDate"
            value={form.VaccinationDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="date"
            name="NextDueDate"
            value={form.NextDueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Add Vaccination
          </button>
        </form>
      )}
    </div>
  );
}

export default VaccinationComponent;