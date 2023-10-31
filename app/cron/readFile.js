const fs = require("fs");
const path = require("path");

const filPath = path.join(__dirname, "../upload/Node Task.xlsx");

const xlsx = require("xlsx");
const userModel = require("../models/user.model");

const workbook = xlsx.readFile(filPath);
let workbook_sheet = workbook.SheetNames;
let workbook_response = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]]);

const saveUser = async () => {
  try {
    //* if the excel data is clean and the key name matches with the model key name
    const users = await userModel.insertMany(workbook_response);

    //* if the excel data is not clean and the key names ar enot well structured in the excel
    for (let i = 0; i < workbook_response.length; i++) {
      var user = new userModel({
        name: workbook_response[0].Name,
        email: workbook_response[0]["Email ID"],
        contact_no: workbook_response[0].Mobile,
        address: workbook_response[0].Address,
      });

      await user.save();
    }

    console.log("data inserted successfully");
  } catch (error) {
    console.log(error);
  }
};

saveUser();
