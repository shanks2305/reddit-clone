require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.error("ERROR WHILE CONNECTING TO DB");
  });

//middle wares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("APPLICATION STARTED");
});
