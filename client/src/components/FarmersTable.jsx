import { useState, useEffect } from "react";

function FarmerTable({ user }) {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [animalFilter, setAnimalFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/farmers")
      .then((res) => res.json())
      .then((data) => setFarmers(data))
      .catch((err) => console.error(err));
  }, [user]);

  const fetchAnimals = (farmerId) => {
    fetch(`http://localhost:5000/api/animals/farmer/${farmerId}`)
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .catch((err) => console.error(err));
  };

  const handleSelectFarmer = (farmer) => {
    setSelectedFarmer(farmer);
    fetchAnimals(farmer.FarmerID);
  };

  const filteredFarmers = farmers.filter(
    (f) =>
      f.FarmerName?.toLowerCase().includes(search.toLowerCase()) ||
      f.Village?.toLowerCase().includes(search.toLowerCase()) ||
      f.ContactNo?.includes(search)
  );

  const filteredAnimals = animals.filter((a) =>
    animalFilter ? a.AnimalType === animalFilter : true
  );

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "Not updated";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Farmers</h2>

        <input
          type="text"
          placeholder="Search farmers..."
          className="w-full p-2 mb-4 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul>
          {filteredFarmers.map((farmer) => (
            <li
              key={farmer.FarmerID}
              className={`p-2 mb-2 cursor-pointer rounded ${
                selectedFarmer?.FarmerID === farmer.FarmerID
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelectFarmer(farmer)}
            >
              {farmer.FarmerName} - {farmer.Village}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {selectedFarmer ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Animals of {selectedFarmer.FarmerName}
            </h2>

            <div className="mb-4 flex gap-4">
              <select
                value={animalFilter}
                onChange={(e) => setAnimalFilter(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">All Types</option>
                <option value="Cow">Cow</option>
                <option value="Buffalo">Buffalo</option>
                <option value="Goat">Goat</option>
              </select>
            </div>

            <table className="w-full border rounded">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Animal ID</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Breed</th>
                  <th className="p-2 border">Age</th>
                  <th className="p-2 border">Gender</th>
                  <th className="p-2 border">Milk Yield/Day</th>
                  <th className="p-2 border">Vaccine Name</th>
                  <th className="p-2 border">Vaccination Date</th>
                  <th className="p-2 border">Next Due Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredAnimals.map((a, index) => (
                  <tr key={`${a.AnimalID}-${index}`} className="text-center">
                    <td className="p-2 border">{a.AnimalID}</td>
                    <td className="p-2 border">{a.AnimalType}</td>
                    <td className="p-2 border">{a.Breed}</td>
                    <td className="p-2 border">{a.Age}</td>
                    <td className="p-2 border">{a.Gender}</td>
                    <td className="p-2 border">{a.MilkYieldPerDay}</td>
                    <td className="p-2 border">
                      {a.VaccineName || "Not updated"}
                    </td>
                    <td className="p-2 border">
                      {formatDate(a.VaccinationDate)}
                    </td>
                    <td className="p-2 border">{formatDate(a.NextDueDate)}</td>
                  </tr>
                ))}

                {filteredAnimals.length === 0 && (
                  <tr>
                    <td colSpan="9" className="p-2 border text-center">
                      No animals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <p>Select a farmer to view their animals.</p>
        )}
      </div>
    </div>
  );
}

export default FarmerTable;