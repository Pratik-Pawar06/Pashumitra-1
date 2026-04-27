const { poolPromise, sql } = require("../db/db");

const getAllBooks = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Books");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addBook = async (req, res) => {
  const { title, author, publisher, category, available_copies } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("title", sql.NVarChar, title)
      .input("author", sql.NVarChar, author)
      .input("publisher", sql.NVarChar, publisher)
      .input("category", sql.NVarChar, category)
      .input("available_copies", sql.Int, available_copies)
      .query(
        "INSERT INTO Books (title, author, publisher, category, available_copies) VALUES (@title, @author, @publisher, @category, @available_copies)"
      );
    res.json({ message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllBooks, addBook };
