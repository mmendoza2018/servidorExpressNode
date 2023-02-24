const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  const payLoad = {
    uid,
  };

return new Promise( ( resolve, reject ) => {
  jwt.sign(
      payLoad,
      process.env.JWT_PASSWORD,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log('err', err)
        } else {
          resolve(token)
        }
      }
    );
})  
};

module.exports = { generarJWT };
