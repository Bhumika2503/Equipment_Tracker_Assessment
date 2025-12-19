import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const API = "http://localhost:5000/api/equipment";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "Machine",
    status: "Active",
    lastCleaned: ""
  });
  const [editId, setEditId] = useState(null);

  // Load data
  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    const res = await axios.get(API);
    setEquipment(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.lastCleaned) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ name: "", type: "Machine", status: "Active", lastCleaned: "" });
    fetchEquipment();
  };

  const editItem = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const deleteItem = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchEquipment();
  };

  return (
    <div className="container">
      <h2>Equipment Tracker</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Equipment Name"
          value={form.name}
          onChange={handleChange}
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option>Machine</option>
          <option>Vessel</option>
          <option>Tank</option>
          <option>Mixer</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
          <option>Under Maintenance</option>
        </select>

        <input
          type="date"
          name="lastCleaned"
          value={form.lastCleaned}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Update Equipment" : "Add Equipment"}
        </button>
      </form>

      {/* TABLE */}
      <table border="1" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{item.lastCleaned}</td>
              <td>
                <button onClick={() => editItem(item)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
