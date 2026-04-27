import express from "express";
import db from "../db.js";

const router = express.Router();

// Register Farmer
router.post("/register", (req, res) => {
  const { FarmerName, ContactNo, Village, District, State } = req.body;

  if (!FarmerName || !Village || !District || !State) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const sql =
    "INSERT INTO Farmers (FarmerName, ContactNo, Village, District, State) VALUES (?, ?, ?, ?, ?)";
  const values = [FarmerName, ContactNo, Village, District, State];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({
      message: "Farmer registered successfully",
      FarmerID: result.insertId,
    });
  });
});

// Get all farmers (for officer dashboard)
router.get("/", (req, res) => {
  db.query("SELECT * FROM Farmers", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// Login Farmer
router.post("/login", (req, res) => {
  const { FarmerName, ContactNo } = req.body; // Using name & contact for login

  if (!FarmerName) {
    return res.status(400).json({ message: "Enter your name" });
  }

  let sql = "SELECT * FROM Farmers WHERE FarmerName = ?";
  let values = [FarmerName];

  // If ContactNo is also used as temporary password
  if (ContactNo) {
    sql += " AND ContactNo = ?";
    values.push(ContactNo);
  }

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const farmer = results[0];
    res.json({
      message: "Login successful",
      FarmerID: farmer.FarmerID,
      FarmerName: farmer.FarmerName,
    });
  });
});

export default router;
