const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const route = require("./routes/routes.js");
const cookiesParser = require("cookie-parser");
const { app, server } = require("./socket/index");

// const app = express();

app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: "https://social-chat-app-001.netlify.app/",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server running at " + PORT,
  });
});

// Routes
app.use("/api", route);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});
