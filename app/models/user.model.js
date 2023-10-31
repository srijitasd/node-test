const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    contact_no: { type: String },
    address: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  if (this.name !== "" && this.Mobile !== "" && this.address !== "") {
    this.status = "Active";
  } else {
    this.status = "Inactive";
  }

  let errorFileds = [];
  let errorMsg = "";
  const mandatoryFields = ["name", "contact_no", "email", "address"];

  mandatoryFields.forEach((key) => {
    this[key] == "" && errorFileds.push(key);
  });

  errorMsg = errorFileds.length > 0 ? `${errorFileds.toString} fields are missing` : "";
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
