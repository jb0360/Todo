const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const PORT = 8080;
const MONGO_URL = 'mongodb+srv://todolist:54321@todolist.onskx2a.mongodb.net/';
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
        await connectDB(MONGO_URL);        
        app.listen(PORT, () => {
        console.log(`Main Database API is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();