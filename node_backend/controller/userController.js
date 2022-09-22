const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const asyncHandler = require("express-async-handler");
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amit.metromindz@gmail.com',
    pass: 'dnlxitkfrsceofri'
  }
});
const getUserById = asyncHandler(async (req, resp) => {
  try {
    const id = req.params.id;
    const userList = await User.findById(id);
    if (userList) {
      resp.send({
        status: 200,
        success: "true",
        list: userList,
      });
    }
  } catch (err) {
    resp.send({
      error: err.message,
    });
  }
});

const getUser = asyncHandler(async (req, resp) => {
  // console.log("GetUser")
  // res.send({
  //     mess : "Users"
  // })

  try {
    const userList = await User.find({ isAdmin: false }).sort("-_id");
    resp.send({
      userList,
      success: "true",
      status: 200,
    });
  } catch (err) {
    res.send({
      error: error.message,
      status: 400,
      success: "false",
    });
  }
});

const signUpUser = asyncHandler(async (req, resp) => {
  try {
    const body = req.body;
    const isExistingUser = await User.findOne({ email: body.email });

    if (isExistingUser) {
      console.log("exisitng user", isExistingUser);
      resp.send({
        message: "Existing user",
        status: 400,
        success: false,
      });
    } else {
      console.log("else condition");
      const newUser = new User(body);
      console.log("new user", newUser);
      const saveNewUser = await newUser.save();
      console.log("user save", saveNewUser);
      let token = jwt.sign({ payload: saveNewUser._id }, "superKey", {
        expiresIn: "1h",
      });
      let tokenUpdateForUser = await User.findByIdAndUpdate(
        { _id: saveNewUser._id },
        { $set: { emailVerificationToken: { token } } }
      );

      resp.send({
        userInfo: saveNewUser,
        status: 201,
        success: true,
      });
    }
  } catch (error) {
    resp.send({
      message: "Something went wrong,please try again",
      error: error.message,
      success: false,
      status: 400,
    });
  }
});

const deleteUser = asyncHandler(async (req, resp) => {
  try {
    const id = req.params.id;
    const userDeleted = await User.findByIdAndDelete(id);

    if (userDeleted) {
      resp.send({
        status: 200,
        message: "User Deleted Successfully",
        success: true,
      });
    } else {
      resp.send({
        status: 400,
        message: "User Not Found",
        success: "false",
      });
    }
  } catch (err) {
    resp.send({
      error: err.message,
    });
  }
});

const signInUser = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;
    let currentUser = await User.findByCredentials(email, password);
    let {
      name,
      userEmail,
      phoneNumber,
      role,
      isAdmin,
      isActive,
      emailVerificationToken,
      isEmailVerified,
      address,
    } = currentUser;
    let userInfo = {
      name,
      email: userEmail,
      phoneNumber,
      role,
      isActive,
      isAdmin,
      emailVerificationToken,
      isEmailVerified,
      address,
    };
    if (currentUser.isEmailVerified) {
      let token = await currentUser.generateToken();
      res.send({
        message: "You have successfully logged in",
        success: true,
        userInfo,
        status: 200,
        token: token,
      });
    } else {
      res.send({
        message: "Email Verification is pending",
        success: false,
        status: 404,
      });
    }
  } catch (error) {
    res.send({
      error: error.message,
      success: false,
      status: 401,
    });
  }
});

const updateUser = asyncHandler(async (req, resp) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const updateUserData = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (updateUserData) {
      resp.send({
        updateUserData,
        status: 200,
        success: "true",
        message: "User Data Updated SuccessFully",
      });
    }
  } catch (err) {
    resp.send({
      success: "false",
      error: err.message,
      status: 400,
    });
  }
});

// const verifyUserEmail = asyncHandler(async (req, resp) => {
//   resp.send({
//     status: req.params,
//   });
// });

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    let { email } = req.body;
    let currentUser = await User.findOne({ email });
    // res.send({
    //   currentUser
    // })
    if (!currentUser) {
      res.send({
        notice:
          "Sorry You are not in our database. Please contact Administrator.",
        success: false,
        status: 404,
      });
    } else {
      let token = jwt.sign({ payload: currentUser._id }, "superKey", {
        expiresIn: "1h",
      });
      let user = await User.findByIdAndUpdate(
        { _id: currentUser._id },
        { $set: { resetPasswordToken: { token } } }
      );
      
      let tokenUpdateForUser = await User.findByIdAndUpdate(
        { _id: currentUser._id },
        { $set: { emailVerificationToken: { token } } }
      );
      // MAIL CODE
      // let sendLink = {
      //   from: "",
      //   to: ``,
      //   subject: "",
      //   html: ``,
      // };
      var mailOptions = {
        from: 'amit.metromindz@gmail.com',
        to: currentUser.email,
        subject: 'reset password',
        html: `http://localhost:5000/user/resetPassword/`,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 

      //     let email = await transporter.sendMail(sendLink);
          res.json({
            message: `A mail has been sent to ${currentUser.email}. Please follow the instructions.`,
            success: true,
            status: 200,
          });
    }
  } catch (error) {
    res.send({
      error: error.message,
      status: 400,
      success: false,
    });
  }
});

module.exports = {
  getUser,
  signUpUser,
  signInUser,
  getUserById,
  deleteUser,
  updateUser,
  forgotPassword,
  // verifyUserEmail,
  // forgotPassword
};
