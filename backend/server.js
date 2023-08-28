const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");

const indexRouter = require("./routes/index");
const saveDraft = require("./routes/save-draft");
const publish = require("./routes/publish");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/", indexRouter);
app.use(express.json());
app.use("/save-draft", saveDraft);
app.use("/publish/", publish);

const PORT = 3001;

const mongoURL = "mongodb://localhost:27017/webBuilder";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((error) => {
    console.error("Error connecting to Mongoose:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
