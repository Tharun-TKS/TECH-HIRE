const bcrypt = require("bcryptjs");
const { User, Seeker, employer } = require("../models");

/////Login END API

const register = async (req, res) => {
  const { email, password, username, role } = req.body;
  try {
    // Check if the user already exists
    const existingUserByEmail = await User.findOne({ where: { email } });
    const existingUserByUsername = await User.findOne({ where: { username } });

    if (existingUserByEmail) {
      return res.status(400).json({
        isError: true,
        message: "User with this email already exists",
        data: null,
      });
    }

    if (existingUserByUsername) {
      return res.status(400).json({
        isError: true,
        message: "User with this username already exists",
        data: null,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with additional fields
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      role,
    });

    // Conditionally store user data in appropriate table based on the role
    if (role === "seeker") {
      await Seeker.create({
        seekerid: newUser.id,
        seekeremail: newUser.email,
        // add any other fields if necessary
      });
    } else if (role === "employer") {
      await employer.create({
        employeid: newUser.id,
        employeremail: newUser.email,
        // add any other fields if necessary
      });
    }

    res.status(201).json({
      isError: false,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ isError: true, message: "Internal server error", data: null });
  }
};
/////////Login API ///////
const login = async (req, res) => {
  const { usernameoremail, password } = req.body;

  try {
    if (!usernameoremail) {
      return res.status(400).send({
        isError: true,
        resCode: "missingUsernameOrEmail",
        message: "Username or email is missing",
      });
    }

    if (!password) {
      return res.status(400).send({
        isError: true,
        resCode: "missingPassword",
        message: "Password is missing",
      });
    }

    let user;
    if (usernameoremail.includes("@")) {
      // If the usernameoremail contains '@', assume it's an email
      user = await User.findOne({ where: { email: usernameoremail } });
    } else {
      user = await User.findOne({ where: { username: usernameoremail } });
    }

    // If user is not found, return error
    if (!user) {
      return res
        .status(404)
        .json({ isError: true, message: "User not found", data: null });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).send({
        isError: true,
        resCode: "incorrectCredentials",
        message: "Incorrect password",
      });
    }

    return res.status(200).send({
      isError: false,
      resCode: "loginSuccess",
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({
      isError: true,
      resCode: "internalServerError",
      message: "Internal server error",
    });
  }
};
// Update password with verification of old password
const resetpassword = async (req, res) => {
  const { usernameoremail, oldpassword, newpassword } = req.body;
  try {
    // Find the user based on username or email
    let user;
    if (usernameoremail.includes("@")) {
      // If the usernameoremail contains '@', assume it's an email
      user = await User.findOne({ where: { email: usernameoremail } });
    } else {
      user = await User.findOne({ where: { username: usernameoremail } });
    }

    // If user is not found, return error
    if (!user) {
      return res
        .status(404)
        .json({ isError: true, message: "User not found", data: null });
    }

    // Check if the old password matches
    const passwordsMatch = await bcrypt.compare(oldpassword, user.password);
    if (!passwordsMatch) {
      return res
        .status(401)
        .json({ isError: true, message: "Incorrect old password", data: null });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newpassword, 10);

    // Update the user's password
    await User.update(
      { password: hashedNewPassword },
      { where: { id: user.id } }
    );

    // Optionally, you can delete the resetpassword entry if it's used for password reset tracking

    res.status(200).json({
      isError: false,
      message: "Password changed successfully",
      data: null,
    });
  } catch (error) {
    console.error("Password change error:", error);
    res
      .status(500)
      .json({ isError: true, message: "Internal server error", data: null });
  }
};

module.exports = {
  register,
  login,
  resetpassword,
};
