import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";


const app = express();
dotenv.config();
const port = process.env.PORT || 4000;


app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello World!!!")
})



app.listen(port, () => {
    console.log(`Working at http://localhost:${port}`);
}).on("error", (err) => {
    console.error("❌ Server failed to start:", err);
});
