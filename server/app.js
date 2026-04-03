import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import { dbConnect } from "./config/db.js";
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from "socket.io";
import http from "http";


dotenv.config();

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})


const PORT = process.env.PORT || 3000;
 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet())
app.use(morgan('dev'));

// dbConnect();



app.use("/api/auth", authRoute);


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server Running...!!!"
    })
})



io.on("connection", (socket) => {
    console.log("a user connected" + socket.id);

})    












server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})
