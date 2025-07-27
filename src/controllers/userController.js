const User = require("../models/User");
const bcrypt = require("bcrypt");

const showRegisterForm = (req, res) => {
  const message = null;
  res.render("register", { message }); // Renders views/register.ejs
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      const message = {
        info: "User already exists",
        class: "danger",
      };
      res.render("register", { message }); // Render with message
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
    const user = new User({ name, email, password: hashedPassword }); // Create new user instance

    await user.save(); // Save user to database
    const message = {
      info: "User registered successfully",
      class: "success",
    };
    res.render("register", { message });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const showLoginForm = (req, res) => {
  const message = null;
  res.render("login", { message }); // Renders views/login.ejs
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const message = {
        info: "User not found",
        class: "danger",
      };
      res.render("login", { message });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const message = {
        info: "Invalid credentials",
        class: "danger",
      };
      res.render("login", { message });
      return;
    }
    req.session.user = user;
    res.redirect("/api/users/dashboard");
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.redirect("/api/users/login");
  });
};


module.exports = {
  register,
  showRegisterForm,
  login,
  showLoginForm,
  logOut,
};
