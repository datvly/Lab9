const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// GET all puppies
app.get('/api/puppies', async (req, res) => {
  try {
    const puppies = await prisma.puppy.findMany();
    res.json(puppies);
  } catch (error) {
    console.error('Error fetching puppies:', error);
    res.status(500).json({ error: 'Failed to fetch puppies' });
  }
});

// GET puppy by ID
app.get('/api/puppies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const puppy = await prisma.puppy.findUnique({
      where: { pet_id: parseInt(id) }
    });
    
    if (!puppy) {
      return res.status(404).json({ error: 'Puppy not found' });
    }
    
    res.json(puppy);
  } catch (error) {
    console.error('Error fetching puppy:', error);
    res.status(500).json({ error: 'Failed to fetch puppy' });
  }
});

// POST new puppy
app.post('/api/puppies', async (req, res) => {
  try {
    const { name, breed, age_est, current_kennel_number } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const newPuppy = await prisma.puppy.create({
      data: {
        name,
        breed,
        age_est,
        current_kennel_number
      }
    });
    
    res.status(201).json(newPuppy);
  } catch (error) {
    console.error('Error creating puppy:', error);
    res.status(500).json({ error: 'Failed to create puppy' });
  }
});

// PUT update puppy
app.put('/api/puppies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, breed, age_est, current_kennel_number } = req.body;
    
    const updatedPuppy = await prisma.puppy.update({
      where: { pet_id: parseInt(id) },
      data: {
        name,
        breed,
        age_est,
        current_kennel_number
      }
    });
    
    res.json(updatedPuppy);
  } catch (error) {
    console.error('Error updating puppy:', error);
    res.status(500).json({ error: 'Failed to update puppy' });
  }
});

// DELETE puppy
app.delete('/api/puppies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.puppy.delete({
      where: { pet_id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting puppy:', error);
    res.status(500).json({ error: 'Failed to delete puppy' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('beforeExit', async () => {
  await prisma.$disconnect();
}); 