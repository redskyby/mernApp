const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const fileupload = require("express-fileupload");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const app = express();
const PORT = config.get("serverPort");
const corsMiddleware = require('./middleware/cors.middleware')
const client = require("./redisClient");



app.use(fileupload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('static'));
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);



const start = async () => {
    try {
        await client.connect();
        await mongoose.connect(config.get('dbUrl'));
        app.listen(PORT, () => {
            console.log('Server started on post ', PORT);
        });
    } catch (e) {
        console.log(e.message);
    }
}


start();

