import express from "express";
import db from "../db.js";

const router = express.Router();

// Register officer
router.post("/register", (req, res) => {
  const { OfficerName, ContactNo, AssignedDistrict } = req.body;

  if (!OfficerName || !AssignedDistrict) {
    return res.status(400).json({ message: "Fill all required fields" });
  }

  const sql =
    "INSERT INTO VeterinaryOfficers (OfficerName, ContactNo, AssignedDistrict) VALUES (?, ?, ?)";
  const values = [OfficerName, ContactNo, AssignedDistrict];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(201).json({
      message: "Officer registered successfully",
      OfficerID: result.insertId,
    });
  });
});

router.post("/login", (req, res) => {
  const { OfficerName, ContactNo } = req.body;

  if (!OfficerName) {
    return res.status(400).json({ message: "Enter your name" });
  }

  let sql = "SELECT * FROM VeterinaryOfficers WHERE OfficerName = ?";
  const values = [OfficerName];

  // Optional: use ContactNo as temporary password
  if (ContactNo) {
    sql += " AND ContactNo = ?";
    values.push(ContactNo);
  }

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const officer = results[0];
    res.json({
      message: "Login successful",
      OfficerID: officer.OfficerID,
      OfficerName: officer.OfficerName,
      AssignedDistrict: officer.AssignedDistrict,
    });
  });
});

// Get all officers
router.get("/", (req, res) => {
  db.query("SELECT * FROM VeterinaryOfficers", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

export default router;
