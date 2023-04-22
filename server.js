const express = require('express');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({path: './config/config.env'});

const app = express();
const PORT = process.env.PORT || 5000;
// Body parser
app.use(express.json());


app.listen()
