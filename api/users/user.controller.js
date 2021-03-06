const {
  create,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail
} = require("./user.service");

const { genSaltSync, hashSync,compareSync } = require("bcrypt");
//const bcrypt=require("bcrypt");
const {sign}=require("jsonwebtoken");


const pool = require("../../config/database");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection server",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      results.password=undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to update users",
        });
      }
      return res.json({
        success: 1,
        message: "updated Successfully",
      });
    });
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id=?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results[0]);
      }
    );  
  },
  login: (req, res) => {
    const body = req.body;
    console.log("bodyEMail",body);
    getUserByUserEmail(body.emailId, (err, results) => {
      console.log("bodyEMail",body.emailId);
      if (err) {
        console.log(err);
      }
      console.log("results",results);
      if (!results) {       
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      console.log("resultPassword",results.password,body.password);
      const result = compareSync(body.password, results.password);
       console.log("results",result);
      if (!result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
};

