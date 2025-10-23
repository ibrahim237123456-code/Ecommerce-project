const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const JWT_SECRET='Gqptfkenm4MhEoG7hzZEDSvkrt643543xWcQ2mbR4532534gbcbcgbcgbU34635ggbgffg463456QeTh';
const register = async (userData) => {
  try {
    const { username, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        statusCode: 400,
        data: { message: "User already exists" },
      };
    }
  
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    const token = jwt.sign(
  { id: newUser._id, email: newUser.email, role: newUser.role },
  JWT_SECRET,
  { expiresIn: "7365d" }   
);

    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

      return {
      statusCode: 201,
      data: {
        message: "User registered successfully",
        token,
      },};
  
  
  
  } catch (error) {
    console.error("Error in register:", error);
    return {
      statusCode: 500,
      data: { message: "Internal Server Error" },
    };
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        statusCode: 400,
        data: { message: "Incorrect email or password" },
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        statusCode: 400,
        data: { message: "Incorrect email or password" },
      };
    }
        const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7365d" }
    );


    const userObject = user.toObject();
    delete userObject.password;

    return {
      statusCode: 200,
      data:{userObject,token,message:'Login successful'} 
   
    };
  } catch (error) {
    console.error("Error in login:", error);
    return {
      statusCode: 500,
      data: { message: "Internal Server Error" },
   
    };
  }
};
const generateJwt=(data)=>{
  return jwt.sign(data,'Gqptfkenm4MhEoG7hzZEDSvkrt643543xWcQ2mbR4532534gbcbcgbcgbU34635ggbgffg463456QeTh')

}
module.exports = { register, login };
