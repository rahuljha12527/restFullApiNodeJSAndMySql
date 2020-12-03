const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(emailId,password,firstName,lastName,StoryName)
                  values(?,?,?,?,?)`,

      [
        data.emailId,
        data.password,
        data.firstName,
        data.lastName,
        data.StoryName,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      }
    );
  },
  getUsers:callBack=>{
    pool.query(
      `select password,id,firstName,lastName,emailId,StoryName from registration`,
      [],
      (error,results,fields)=>{
        if(error){
          return callBack(error);
        }

        return callBack(null,results);
      }
    );
  },
  getUserByUserId:(id,callBack)=>{
    pool.query(
      `select id,firstName,lastName,emailId,StoryName from registration where id=?`,
      [id],
      (error,results,fields)=>{
        if(error){
         return  callBack(error);
        }
        return callBack(null,results[0]);
      }
    )    
  },
  updateUser:(data,callback)=>{
    pool.query(
      `update registration set firstName=? ,lastName=?,emailId=?,password=?,StoryName=? where id=?`,
      [
        data.emailId,
        data.password,
        data.firstName,
        data.lastName,
        data.StoryName,
        data.id
      ],
      (error,results,fields)=>{
        if(error){
          callback(error);
        }

        return callback(null,results[0  ]);
      }
    )
  },
   deleteUser:(data,callBack)=>{
     pool.query(
       `delete from registration where id=?`,
       [data.id],
       (error,results,fields)=>{
         if(error){
            return  callBack(error);
         }

         return callBack(null,results[0]);
       }
     )
   } ,

   getUserByUserEmail: (email, callBack) => {
    console.log("email",email);
    pool.query(
      `select * from registration where emailId = ?`,
      [email],
    
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
