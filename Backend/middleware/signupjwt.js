const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
var CryptoJS = require("crypto-js");


const verifySignUpToken = (req, res, next) => {
    let token = req.headers["x-access-signuptoken"];
  
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }
  
    const tokenValue = token.split(" ")[1];
    const decryptedToken = CryptoJS.AES.decrypt(tokenValue, config.secret).toString(CryptoJS.enc.Utf8);
    console.log(decryptedToken);
  
    if (decryptedToken !== "signuptoken") {
      return res.status(403).send({
        message: "Invalid token!",
      });
    }
     else{
    next();
    }
  };
  

  
module.exports = verifySignUpToken;