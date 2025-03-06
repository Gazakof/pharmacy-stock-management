require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

//Midleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//Connexion to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));

//Routes
app.use("/medicines", require("./routes/medicineRoutes"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/protected", require("./routes/protected"));

//Launch the server
app.listen(PORT, () =>
  console.log(`Server launched on http://localhost:${PORT}`)
);
