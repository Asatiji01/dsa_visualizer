const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const sortsRouter = require('./routes/sorts');
const theoryRouter = require('./routes/theory');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ==================== ROUTES =====================

// AUTH
app.use('/api/auth', authRouter);

// SORTING ROUTES
app.use('/api/sorts', sortsRouter);

// THEORY ROUTE (FIXED PATH)
app.use('/api/sorts/theory', theoryRouter);

// ROOT TEST
app.get('/', (req, res) => {
  res.send('API Running...');
});

// ==================== SERVER =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
