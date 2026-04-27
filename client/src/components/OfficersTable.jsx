import { useEffect, useState } from "react";

function OfficersTable() {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    // Replace with your backend API endpoint
    fetch("http://localhost:5000/officers")
      .then((res) => res.json())
      .then((data) => setOfficers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Veterinary Officers List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border">Officer ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Contact No</th>
              <th className="p-2 border">Assigned District</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr
                key={officer.OfficerID}
                className="text-center border hover:bg-gray-200"
              >
                <td className="p-2 border">{officer.OfficerID}</td>
                <td className="p-2 border">{officer.OfficerName}</td>
                <td className="p-2 border">{officer.ContactNo}</td>
                <td className="p-2 border">{officer.AssignedDistrict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OfficersTable;
