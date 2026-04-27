import { useEffect, useState } from "react";

function AnimalsTable() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // Replace with your backend API
    fetch("http://localhost:5000/animals")
      .then((res) => res.json())
      .then((data) => setAnimals(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Animals</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-2 border">Animal ID</th>
            <th className="p-2 border">Farmer ID</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Breed</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Gender</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr
              key={animal.AnimalID}
              className="text-center border hover:bg-gray-100"
            >
              <td className="p-2 border">{animal.AnimalID}</td>
              <td className="p-2 border">{animal.FarmerID}</td>
              <td className="p-2 border">{animal.AnimalType}</td>
              <td className="p-2 border">{animal.Breed}</td>
              <td className="p-2 border">{animal.Age}</td>
              <td className="p-2 border">{animal.Gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnimalsTable;
