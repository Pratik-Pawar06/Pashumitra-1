import express from "express";
import db from "../db.js";

const router = express.Router();

// Add vaccination record
router.post("/add", (req, res) => {
  const { AnimalID, VaccineName, VaccinationDate, NextDueDate } = req.body;

  if (!AnimalID || !VaccineName || !VaccinationDate || !NextDueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO Vaccinations 
    (AnimalID, VaccineName, VaccinationDate, NextDueDate) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [AnimalID, VaccineName, VaccinationDate, NextDueDate],
    (err, result) => {
      if (err) {
        console.error("SQL Error:", err);
        return res.status(500).json({ message: "Database error", error: err });
      }

      res.status(201).json({
        message: "Vaccination added successfully",
        VaccinationID: result.insertId,
      });
    }
  );
});

// Get all vaccinations
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      v.VaccinationID,
      v.AnimalID,
      v.VaccineName,
      v.VaccinationDate,
      v.NextDueDate,
      a.AnimalType,
      a.Breed
    FROM Vaccinations v
    LEFT JOIN Animals a ON v.AnimalID = a.AnimalID
    ORDER BY v.VaccinationID DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.json(results);
  });
});

export default router;