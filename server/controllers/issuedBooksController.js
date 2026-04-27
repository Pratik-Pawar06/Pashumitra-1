const { poolPromise, sql } = require("../db/db");

const getAllIssued = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
            SELECT i.issue_id, s.name AS student_name, b.title AS book_title, i.issue_date, i.due_date, i.return_date, i.fine_amount
            FROM Issued_Books i
            JOIN Students s ON i.student_id = s.student_id
            JOIN Books b ON i.book_id = b.book_id
        `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const issueBook = async (req, res) => {
  const { student_id, book_id } = req.body;
  try {
    const pool = await poolPromise;
    const available = await pool
      .request()
      .input("book_id", sql.Int, book_id)
      .query("SELECT available_copies FROM Books WHERE book_id = @book_id");

    if (available.recordset[0].available_copies < 1) {
      return res.status(400).json({ message: "No copies available" });
    }

    await pool
      .request()
      .input("student_id", sql.Int, student_id)
      .input("book_id", sql.Int, book_id)
      .query(`INSERT INTO Issued_Books (student_id, book_id, issue_date, due_date)
                    VALUES (@student_id, @book_id, GETDATE(), DATEADD(DAY, 14, GETDATE()))`);

    await pool
      .request()
      .input("book_id", sql.Int, book_id)
      .query(
        "UPDATE Books SET available_copies = available_copies - 1 WHERE book_id = @book_id"
      );

    res.json({ message: "Book issued successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const returnBook = async (req, res) => {
  const { issue_id } = req.body;
  try {
    const pool = await poolPromise;
    const data = await pool
      .request()
      .input("issue_id", sql.Int, issue_id)
      .query(
        "SELECT book_id, due_date FROM Issued_Books WHERE issue_id = @issue_id"
      );

    const book_id = data.recordset[0].book_id;
    const due_date = data.recordset[0].due_date;

    const days_late = Math.max(
      0,
      Math.floor((new Date() - new Date(due_date)) / (1000 * 60 * 60 * 24))
    );
    const fine = days_late * 5; // Rs.5 per day

    await pool
      .request()
      .input("issue_id", sql.Int, issue_id)
      .input("fine", sql.Decimal(10, 2), fine)
      .query(
        "UPDATE Issued_Books SET return_date = GETDATE(), fine_amount = @fine WHERE issue_id = @issue_id"
      );

    await pool
      .request()
      .input("book_id", sql.Int, book_id)
      .query(
        "UPDATE Books SET available_copies = available_copies + 1 WHERE book_id = @book_id"
      );

    res.json({ message: "Book returned successfully", fine });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllIssued, issueBook, returnBook };
