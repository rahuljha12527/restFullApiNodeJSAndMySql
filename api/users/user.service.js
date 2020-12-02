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
};
