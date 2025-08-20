const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;
const backendUrl = process.env.BACKEND_URL;
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());

app.use('/api/v1', taskRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Task API');
});

const connectDB = (url) => {
    return mongoose
        .connect(url)
        .then((conn) => {
            console.log(`db connected: ${conn.connection.host}`);
        })
        .catch((err) => {
            console.log(`error in connected db: ${err}`);
        });
};

// Start server
const start = async () => {
    try {
        await connectDB(mongoUrl);        
        app.listen(PORT, () => {
        console.log(`Main Database API is running at ${backendUrl}${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();