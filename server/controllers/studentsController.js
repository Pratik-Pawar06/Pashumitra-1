const { poolPromise, sql } = require("../db/db");

const getAllStudents = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Students");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addStudent = async (req, res) => {
  const { name, email, branch, year } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("branch", sql.NVarChar, branch)
      .input("year", sql.Int, year)
      .query(
        "INSERT INTO Students (name, email, branch, year) VALUES (@name, @email, @branch, @year)"
      );
    res.json({ message: "Student added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllStudents, addStudent };
