const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(request, response) {
  try {
    const { name, email, password, profile_pic } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Fill name, email, password fields",
        error: true,
      });
    }

    const checkEmail = await UserModel.findOne({ email }); //{ name,email}  // null

    if (checkEmail) {
      return response.status(400).json({
        message: "User already exits, please Login",
        error: true,
      });
    }

    //password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);

    return response.status(201).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;
