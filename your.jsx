// ... (other imports)

import axios from "axios";
import { useState } from "react";

const YourComponent = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the onAddExpense function passed from App.jsx
    onAddExpense(formData);
    try {
     await axios.post('/api/addexpense',formData );
     window.location.reload()
    } catch (e) {
      console.error(e);
    }

    // Clear the form after submitting
    setFormData({
      name: '',
      age: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>
          Item-name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Amount spent:
          <input type="text" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <button type="submit">Add to Table</button>
      </form>
    </div>
  );
};

export default YourComponent;