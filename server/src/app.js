const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(express.json());
//app.use(cookieParser());
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  console.log("Body content:", req.body);
  next();
});

const authRouter = require("./routes/auth");

app.use("/", authRouter);

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.error("Error connecting to the database: ", err));
