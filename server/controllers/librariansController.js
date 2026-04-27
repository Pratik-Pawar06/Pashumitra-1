const { poolPromise, sql } = require("../db/db");

const loginLibrarian = async (req, res) => {
  const { email, password } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .query(
        "SELECT * FROM Librarians WHERE email = @email AND password = @password"
      );

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", librarian: result.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginLibrarian };
