const xlsx = require("xlsx");
const path = require("path");
const { connect } = require("../db/mongoose");
const userModel = require("../models/user.model");

const filPath = path.join(__dirname, "../upload/Node Task.xlsx");
connect();

const saveUser = async () => {
  try {
    const workbook = xlsx.readFile(filPath);
    const workbook_sheet = workbook.SheetNames;
    const workbook_response = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]], {
      header: ["name", "email", "contact_no", "address", "country"],
    });

    const users = await userModel.insertMany(workbook_response);

    console.log("data inserted successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userCron: saveUser,
};
