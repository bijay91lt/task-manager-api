const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const atuhRoutes = require('./routes/auth');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', atuhRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})