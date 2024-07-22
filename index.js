
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({
    path: path.join(__dirname, '.env')
});

const cors = require("cors");
const express = require('express');
const dbConnection = require("./config/db");
const router = require('./routes/apiroutes');
const app = express();
const corsOptions = {
    origin: "*", // Replace with the actual origin you want to allow
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // HTTP methods to allow
    credentials: true, // Enable credentials (e.g., cookies, authorization headers)
};

app.use(cors(corsOptions));

const PORT = 8080;
app.set("port", PORT)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

/////////////////image///////////////////

// Define the directory where your static files are located
const staticFilesDirectory = path.join(__dirname, 'Files');

// Serve static files from the specified directory
app.use('/Files', express.static(staticFilesDirectory));




dbConnection.sync().then(() => {
    console.log("Connected to db");
    // Execute code when Sequelize connects and tables are created
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);

        app.get('/', (req, res) => {
            res.send('Server is up and running!');
        });
    });
});