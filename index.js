const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/usersRouter");
const app = express();
require("dotenv").config();
app.use(express.json());
//connecting with mongodb database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });
app.use("/api/user", usersRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`server is listening on ${process.env.PORT}`)
);
