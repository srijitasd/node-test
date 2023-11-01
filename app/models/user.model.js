const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      validate: function (value) {
        value !== "" ? validator.isEmail("foo@bar.com") : true;
      },
    },
    contact_no: { type: String },
    address: { type: String },
    country: { type: String },
    status: { type: String },
    errorMsg: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre("insertMany", function (next, docs) {
  const mandatoryFields = ["name", "contact_no", "email", "address"];

  docs.forEach((doc) => {
    let errorFields = [];

    mandatoryFields.forEach((key) => {
      doc[key] == "" && errorFields.push(key);
    });

    doc.status = errorFields.length === 0 ? "Inactive" : "Active";
    doc.errorMsg = errorFields.length > 0 ? `${errorFields.toString()} fields are missing` : "";

    console.log(doc);
  });

  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
