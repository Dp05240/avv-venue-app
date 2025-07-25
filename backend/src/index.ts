console.log("Starting server...");
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'AV+V backend is running.' });
});

// Simple hardcoded login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true, role: 'owner', message: 'Logged in as admin' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get all venues
app.get('/venues', async (req, res) => {
  try {
    const venues = await prisma.venue.findMany({ include: { owner: true } });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venues', details: error });
  }
});

// Get a single venue by ID
app.get('/venues/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const venue = await prisma.venue.findUnique({ where: { id }, include: { owner: true } });
    if (venue) {
      res.json(venue);
    } else {
      res.status(404).json({ error: 'Venue not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venue', details: error });
  }
});

// Create a new venue
app.post('/venues', async (req, res) => {
  const { name, address, ownerId } = req.body;
  try {
    const venue = await prisma.venue.create({
      data: { name, address, ownerId: Number(ownerId) }
    });
    res.status(201).json(venue);
  } catch (error) {
    res.status(400).json({ error: 'Could not create venue', details: error });
  }
});

// Update a venue
app.put('/venues/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, address } = req.body;
  try {
    const venue = await prisma.venue.update({
      where: { id },
      data: { name, address }
    });
    res.json(venue);
  } catch (error) {
    res.status(400).json({ error: 'Could not update venue', details: error });
  }
});

// Delete a venue
app.delete('/venues/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.venue.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Could not delete venue', details: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});