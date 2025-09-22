const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashedPassword });
};
