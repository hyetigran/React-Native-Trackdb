require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const app = express();

app.get("/", requireAuth, (req, res) => {
  res.send(`your email: ${req.user.email}`);
});
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
const mongoUri =
  "mongodb+srv://tigran:k4At9xXGllDIzpXX@cluster0-6fkmx.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("connected to mongo instance", err);
});
app.listen(5000, () => {
  console.log("listening to 5000");
});
