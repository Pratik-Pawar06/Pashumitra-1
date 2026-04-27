import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Toggle Login/Register
  const [role, setRole] = useState("farmer"); // farmer or officer
  const [form, setForm] = useState({
    name: "",
    contactNo: "",
    village: "",
    district: "",
    state: "",
  });
  const navigate = useNavigate();
  const { setRole: setGlobalRole, setUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";
      let bodyData = {};

      if (isLogin) {
        // Temporary login by name & contactNo
        if (role === "farmer") {
          url = "http://localhost:5000/api/farmers/login";
          bodyData = { FarmerName: form.name, ContactNo: form.contactNo };
        } else {
          url = "http://localhost:5000/api/officers/login";
          bodyData = { OfficerName: form.name, ContactNo: form.contactNo };
        }
      } else {
        // Registration API
        if (role === "farmer") {
          url = "http://localhost:5000/api/farmers/register";
          bodyData = {
            FarmerName: form.name,
            ContactNo: form.contactNo,
            Village: form.village,
            District: form.district,
            State: form.state,
          };
        } else {
          url = "http://localhost:5000/api/officers/register";
          bodyData = {
            OfficerName: form.name,
            ContactNo: form.contactNo,
            AssignedDistrict: form.district,
          };
        }
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      alert(data.message);

      if (!isLogin && role === "farmer") {
        // After registration, auto-login farmer
        setGlobalRole("farmer");
        setUser({ FarmerName: form.name, FarmerID: data.FarmerID });
        navigate("/my-animals");
      } else if (!isLogin && role === "officer") {
        setGlobalRole("officer");
        setUser({ OfficerName: form.name, OfficerID: data.OfficerID });
        navigate("/farmers");
      } else if (isLogin) {
        // Login success
        if (role === "farmer") {
          setGlobalRole("farmer");
          setUser({ FarmerName: form.name, FarmerID: data.FarmerID });
          navigate("/my-animals");
        } else {
          setGlobalRole("officer");
          setUser({
            OfficerName: form.name,
            OfficerID: data.OfficerID,
            district: form.district,
          });
          navigate("/farmers");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"} as{" "}
          {role === "farmer" ? "Farmer" : "Officer"}
        </h2>

        {/* Toggle Role */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${
              role === "farmer" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("farmer")}
          >
            Farmer
          </button>
          <button
            className={`px-4 py-2 rounded ${
              role === "officer" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setRole("officer")}
          >
            Veterinary Officer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Farmer Registration Fields */}
          {!isLogin && role === "farmer" && (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="contactNo"
                value={form.contactNo}
                onChange={handleChange}
                placeholder="Contact No (optional)"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="village"
                value={form.village}
                onChange={handleChange}
                placeholder="Village"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="District"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border p-2 rounded"
                required
              />
            </>
          )}

          {/* Officer Registration Fields */}
          {!isLogin && role === "officer" && (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="contactNo"
                value={form.contactNo}
                onChange={handleChange}
                placeholder="Contact No (optional)"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="Assigned District"
                className="w-full border p-2 rounded"
                required
              />
            </>
          )}

          {/* Login Fields (for both roles) */}
          {isLogin && (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="contactNo"
                value={form.contactNo}
                onChange={handleChange}
                placeholder="Contact No (optional)"
                className="w-full border p-2 rounded"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
