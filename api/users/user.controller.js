const {
  create,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
} = require("./user.service");

const { genSaltSync, hashSync } = require("bcrypt");
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
  getUserByUserId:(req,res)=>{
      const id=req.params.id;
      getUserByUserId(id ,(err,results)=>{
          if(err){
              console.log(err);
              return;
          }

          if(!results){
              return res.json({
                  success:0,
                  message:"Record not found"
              });

          }
          return res.json({
              success:1,
              data:results
          });

      });
  },
  getUsers:(req,res)=>{
      getUsers((err,results)=>{
          if(err){
              console.log(err);
              return;
          }

          return res.json({
              success:1,
              data:results
          });
      })
  },

  updateUser:(req,res)=>{
      const body=req.body;
      const salt=genSaltSync(10);
      body.password=hashSync(body.password,salt);
      updateUser(body,(err,results)=>{
          if(err){
              console.log(err);
              return;
          }

          return res.json({
              success:1,
              message:"updated Successfully"
          });
      })
  },

  deleteUser:(data,callBack)=>{
    pool.query(
        `delete from registration where id=?`,
        [data.id],
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }

            return callBack(null,results[0]);
        }
    )
  }
  


};

// Go with this link.

//http://www.expertphp.in/article/user-login-and-registration-using-nodejs-and-mysql-with-example
