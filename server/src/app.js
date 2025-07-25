const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const foodRouter = require("./routes/food");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", foodRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.error("Error connecting to the database: ", err));
