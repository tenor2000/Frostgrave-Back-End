const cors = require("cors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");

const {
  combineReferenceData,
} = require("./helperFunctions/combineReferenceData");
const getObjectById = require("./helperFunctions/getObjectById");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/refData.json", async (req, res) => {
  console.log(`Fetching reference data`);
  try {
    console.log(`Combining reference data for Frostgrave`);
    const combinedData = await combineReferenceData();
    res.json(combinedData);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/getRandomId/:type", async (req, res) => {
  const { listName } = req.query;
  const randomId = Math.floor(Math.random() * listName.length) + 1;
  const obj = getObjectById(listName, randomId);
  res.json(obj);
});

// 404 fallback
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
