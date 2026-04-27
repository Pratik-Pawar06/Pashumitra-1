import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import farmersRouter from "./routes/farmers.js";
import animalsRouter from "./routes/animals.js";
import officersRouter from "./routes/officers.js";
import vaccinationsRouter from "./routes/vaccinations.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/farmers", farmersRouter); // For farmer registration & fetching farmers
app.use("/api/animals", animalsRouter); // For adding & viewing animals
app.use("/api/officers", officersRouter); // For officer registration & fetching officers
app.use("/api/vaccinations", vaccinationsRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Dairy Department API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
