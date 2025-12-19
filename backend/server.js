const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";

const readData = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

app.get("/api/equipment", (req, res) => {
  res.json(readData());
});

app.post("/api/equipment", (req, res) => {
  const equipment = readData();
  const newItem = { id: uuidv4(), ...req.body };
  equipment.push(newItem);
  fs.writeFileSync(DATA_FILE, JSON.stringify(equipment, null, 2));
  res.json(newItem);
});

app.put("/api/equipment/:id", (req, res) => {
  let equipment = readData();
  equipment = equipment.map(item =>
    item.id === req.params.id ? { ...item, ...req.body } : item
  );
  fs.writeFileSync(DATA_FILE, JSON.stringify(equipment, null, 2));
  res.json({ message: "Updated" });
});

app.delete("/api/equipment/:id", (req, res) => {
  const equipment = readData().filter(item => item.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(equipment, null, 2));
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});
