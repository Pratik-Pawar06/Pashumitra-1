import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function MyAnimals() {
  const { user } = useAuth(); // user should have FarmerID
  const [activeTab, setActiveTab] = useState("view"); // 'view' or 'add'
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState({
    AnimalType: "",
    Breed: "",
    Age: "",
    Gender: "",
    MilkYieldPerDay: "",
  });

  const fetchAnimals = () => {
    fetch(`http://localhost:5000/api/animals/farmer/${user.FarmerID}`)
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAnimal = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/animals/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, FarmerID: user.FarmerID }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Animal added successfully!");
        setForm({
          AnimalType: "",
          Breed: "",
          Age: "",
          Gender: "",
          MilkYieldPerDay: "",
        });
        fetchAnimals();
        setActiveTab("view"); // Switch to view tab
      } else {
        alert(data.message || "Failed to add animal");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding animal");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome {user.FarmerName}</h2>

      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "view" ? "border-b-2 border-yellow-500" : ""
          }`}
          onClick={() => setActiveTab("view")}
        >
          View Animals
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "add" ? "border-b-2 border-yellow-500" : ""
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Animal
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "view" && (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Breed</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Milk (L/day)</th>
              <th className="p-2 border">Next Vaccination</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((a) => (
              <tr key={a.AnimalID} className="text-center">
                <td className="p-2 border">{a.AnimalID}</td>
                <td className="p-2 border">{a.AnimalType}</td>
                <td className="p-2 border">{a.Breed}</td>
                <td className="p-2 border">{a.Age}</td>
                <td className="p-2 border">{a.Gender}</td>
                <td className="p-2 border">{a.MilkYieldPerDay}</td>
                <td className="p-2 border">{a.NextDueDate || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "add" && (
        <form onSubmit={handleAddAnimal} className="space-y-4 max-w-md">
          <input
            type="text"
            name="AnimalType"
            value={form.AnimalType}
            onChange={handleChange}
            placeholder="Animal Type"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="Breed"
            value={form.Breed}
            onChange={handleChange}
            placeholder="Breed"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="Age"
            value={form.Age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full border p-2 rounded"
            required
          />
          <select
            name="Gender"
            value={form.Gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <input
            type="number"
            step="0.01"
            name="MilkYieldPerDay"
            value={form.MilkYieldPerDay}
            onChange={handleChange}
            placeholder="Milk Yield (Liters/Day)"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Add Animal
          </button>
        </form>
      )}
    </div>
  );
}

export default MyAnimals;
