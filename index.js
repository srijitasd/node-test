const express = require("express");
const { connect } = require("./app/db/mongoose");

const multer = require("multer");

connect();

const App = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "app/upload");
  },
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype);
    file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      cb("Please upload excel file", false);

    cb(null, true);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

App.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.json({ message: "file uploaded successfully", status: 1 });
  } catch (error) {
    res.status(400).json({
      message: "error while uploading file",
      status: 0,
    });
  }
});

App.listen(3000, () => {
  console.log("app running on port 3000");
});
