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
    status: { type: String },
    errorMsg: { type: String, default: "" },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  const mandatoryFields = ["name", "contact_no", "email", "address"];
  let errorFields = [];

  mandatoryFields.forEach((key) => {
    this[key] == "" && errorFields.push(key);
  });

  this.status = errorFields.length === 0 ? "Inactive" : "Active";
  this.errorMsg = errorFields.length > 0 && `${errorFields.toString} fields are missing`;
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
