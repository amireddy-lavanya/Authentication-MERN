const userModel=require("./Models/usermodels")
const bcrypt=require("bcrypt")

const existUser = async (username) => {
    const user = await userModel.findOne({ username: username });
    return user !== null;
  };

const genPassHash = (password) => {
  const saltRounds = 10;

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
};

module.exports={existUser, genPassHash}