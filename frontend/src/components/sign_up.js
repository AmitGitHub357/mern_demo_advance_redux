import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Sign_Up = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
  });
  console.log(data);

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/user/signUp", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Existing user") {
          alert("Existing User ");
        } else if (res.data.status === 200) {
          alert(
            "User Registered Successfully we are redirecting to login page"
          );
          navigate('/login')
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      <div className="container mt-5">
        {/* <!-- <div id="header"></div> --> */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-6">
            <h3 className="text-center">Sign-Up</h3>

            <div className="form-group">
              <label>Name</label>
              <input
                onChange={(e) => setData({ name: e.target.value })}
                required
                type="text"
                className="form-control mt-3"
                id="signUpName"
                placeholder="Enter Name..."
              />
            </div>
            <div className="form-group mt-3">
              <label>Date Of Birth</label>
              <input
                onChange={(e) => setData({ dob: e.target.value })}
                required
                type="date"
                className="form-control mt-3"
                id="signUpDob"
                placeholder="Enter Date of Birth"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                onChange={(e) => setData({ email: e.target.value })}
                required
                type="email"
                className="form-control mt-3"
                id="signUpEmail"
                placeholder="Enter Email...."
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                onChange={(e) => setData({ password: e.target.value })}
                required
                type="text"
                className="form-control mt-3"
                id="signUpPassword"
                placeholder="Enter Password...."
              />
            </div>
            <div className="form-group mt-3">
              <label>Retype-Password</label>
              <input
                required
                type="password"
                className="form-control mt-3"
                id="signUpReTypePassword"
                placeholder="Enter Password...."
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mr-3 mt-3"
              onClick={(e) => submitHandler(e)}
            >
              Submit
            </button>
          </div>
          <div className="col-md-6 col-sm-6 mt-5">
            <img src="https://www.acv.app/static/media/RemoteTeamAnimate.9bc87be4.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_Up;
