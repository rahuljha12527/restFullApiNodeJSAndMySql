const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(emailId,password,firstName,lastName,StoryName)
                  values()`,

      [
        data.first_name,
        data.last_name,
        data.emailId,
        data.password,
        data.StoryName,
        data.number,
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


