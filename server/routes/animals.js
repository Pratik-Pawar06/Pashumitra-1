import express from "express";
import db from "../db.js";

const router = express.Router();

// Add animal for a farmer
router.post("/add", (req, res) => {
  const { FarmerID, AnimalType, Breed, Age, Gender, MilkYieldPerDay } = req.body;

  if (!FarmerID || !AnimalType) {
    return res.status(400).json({
      message: "FarmerID and AnimalType are required",
    });
  }

  const sql = `
    INSERT INTO Animals 
    (FarmerID, AnimalType, Breed, Age, Gender, MilkYieldPerDay) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [FarmerID, AnimalType, Breed, Age, Gender, MilkYieldPerDay];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(201).json({
      message: "Animal added successfully",
      AnimalID: result.insertId,
    });
  });
});

// Get all animals for a farmer with vaccination details
router.get("/farmer/:id", (req, res) => {
  const farmerID = req.params.id;

  const sql = `
    SELECT 
      a.AnimalID,
      a.AnimalType,
      a.Breed,
      a.Age,
      a.Gender,
      a.MilkYieldPerDay,
      v.VaccineName,
      v.VaccinationDate,
      v.NextDueDate
    FROM Animals a
    LEFT JOIN Vaccinations v 
      ON a.AnimalID = v.AnimalID
    WHERE a.FarmerID = ?
    ORDER BY a.AnimalID DESC
  `;

  db.query(sql, [farmerID], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.json(results);
  });
});

export default router;