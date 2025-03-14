import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [puppies, setPuppies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age_est: '',
    current_kennel_number: ''
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:5001/api/puppies';

  // Fetch all puppies
  const fetchPuppies = async () => {
    try {
      const response = await axios.get(API_URL);
      setPuppies(response.data);
    } catch (error) {
      console.error('Error fetching puppies:', error);
      alert('Failed to fetch puppies');
    }
  };

  // Load puppies on component mount
  useEffect(() => {
    fetchPuppies();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert numeric fields to numbers
    const processedValue = ['age_est', 'current_kennel_number'].includes(name) 
      ? value === '' ? '' : parseInt(value)
      : value;
      
    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  // Handle form submission for creating or updating puppies
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update existing puppy
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert('Puppy updated successfully!');
      } else {
        // Create new puppy
        await axios.post(API_URL, formData);
        alert('Puppy added successfully!');
      }
      
      // Reset form and refresh puppy list
      setFormData({ name: '', breed: '', age_est: '', current_kennel_number: '' });
      setEditingId(null);
      fetchPuppies();
    } catch (error) {
      console.error('Error saving puppy:', error);
      alert('Failed to save puppy');
    }
  };

  // Handle editing a puppy
  const handleEdit = (puppy) => {
    setEditingId(puppy.pet_id);
    setFormData({
      name: puppy.name,
      breed: puppy.breed || '',
      age_est: puppy.age_est || '',
      current_kennel_number: puppy.current_kennel_number || ''
    });
  };

  // Handle deleting a puppy
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this puppy?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('Puppy deleted successfully!');
        fetchPuppies();
      } catch (error) {
        console.error('Error deleting puppy:', error);
        alert('Failed to delete puppy');
      }
    }
  };

  return (
    <div className="App">
      <h1>Puppy Management System</h1>
      
      {/* Puppy Form */}
      <div className="form-container">
        <h2>{editingId ? 'Edit Puppy' : 'Add New Puppy'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Breed:</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Estimated Age:</label>
            <input
              type="number"
              name="age_est"
              value={formData.age_est}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Kennel Number:</label>
            <input
              type="number"
              name="current_kennel_number"
              value={formData.current_kennel_number}
              onChange={handleChange}
            />
          </div>
          
          <div className="button-group">
            <button type="submit">{editingId ? 'Update' : 'Add'} Puppy</button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', breed: '', age_est: '', current_kennel_number: '' });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      
      {/* Puppies Table */}
      <div className="table-container">
        <h2>Puppies List</h2>
        {puppies.length === 0 ? (
          <p>No puppies found. Add some!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Kennel #</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {puppies.map((puppy) => (
                <tr key={puppy.pet_id}>
                  <td>{puppy.pet_id}</td>
                  <td>{puppy.name}</td>
                  <td>{puppy.breed || '-'}</td>
                  <td>{puppy.age_est || '-'}</td>
                  <td>{puppy.current_kennel_number || '-'}</td>
                  <td>
                    <button onClick={() => handleEdit(puppy)}>Edit</button>
                    <button onClick={() => handleDelete(puppy.pet_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
