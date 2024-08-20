const {User} = require("../models");
const {comparePassword} = require("../helpers/bcrypt");
const {sign} = require("../helpers/jwt");

const signIn = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) throw {name: "Bad Request Sign In"};
    const user = await User.findOne({where: {email}});
    if (!user) throw {name: "Invalid Email"};
    if (!comparePassword(password, user.password))
      throw {name: "Invalid Password"};
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = sign(payload);
    res.status(200).json({
      access_token: token,
      role: user.role,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {signIn};
