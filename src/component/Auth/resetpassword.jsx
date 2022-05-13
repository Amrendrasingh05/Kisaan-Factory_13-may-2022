import React, { useState } from "react";
import { useHistory } from "react-router";
import constant from "../../constant";
import axios from "axios";
import { Link } from "react-router-dom";

import LoginImage from "../../images/Logo-01.png";
import BgImage from "../../images/right-bg.png";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import MainLayout from "../layouts/main-layout";
const Login = () => {
  const history = useHistory();
  const [Password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");

  const [otp, setOtp] = useState("");
  const [Rphone, setRphone] = useState("");

  const RequestOtp = (event) => {
    event.preventDefault();
    if (Rphone.length != 10) {
      toast.error("Enter Mobile Number", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let Payload = {
      mobile: Rphone,
      countryCode: 91,
    };
    axios
      .post(
        constant.BaseUrl +
          "api/v1/userapp/auth/login/forget-password/request-otp",
        Payload
      )
      .then((response) => {
        let data = response.data;

        if (data != null) {
          toast.success(data.msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          myRegister();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const ResendOtp = () => {
    if (Rphone.length != 10) {
      toast.error("Enter Mobile Number", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let Payload = {
      mobile: Rphone,
      countryCode: 91,
    };
    axios
      .post(
        constant.BaseUrl +
          "api/v1/userapp/auth/login/forget-password/resend-otp",
        Payload
      )
      .then((response) => {
        let data = response.data;

        if (data != null) {
          toast.success(data.msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          myRegister();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const ChangePassword = (event) => {
    event.preventDefault();

    if (Password == "" || cPassword == "") {
      toast.error("password can't be blank", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (Password != cPassword) {
      toast.error("both password not same", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let Payload = {
      password1: Password,
      password2: cPassword,
      mobile: Rphone,
      countryCode: "91",
      otp: otp,
    };
    axios
      .put(
        constant.BaseUrl +
          "api/v1/userapp/auth/forgot-password/change/password-data",
        Payload
      )
      .then((response) => {
        let data = response.data;

        if (data != null) {
          toast.success(data.msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => history.push("/login"), 3000);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  function myRegister() {
    let leftOne = $("#one");
    let leftTwo = $("#two");
    let rightThree = $("#three");
    let rightFour = $("#four");
    leftOne.css("transform", "translateY(-100%)");
    leftTwo.css("transform", "translateY(0%)");
    rightThree.css("transform", "translateY(100%)");
    rightFour.css("transform", "translateY(0%)");
  }
  function myLogin() {
    let leftOne = $("#one");
    let leftTwo = $("#two");
    let rightThree = $("#three");
    let rightFour = $("#four");
    leftOne.css("transform", "translateY(0%)");
    leftTwo.css("transform", "translateY(100%)");
    rightThree.css("transform", "translateY(0%)");
    rightFour.css("transform", "translateY(-100%)");
  }
  function myRegistermob() {
    let reverse = $("#reverse");

    reverse.css("flexDirection", "column");
  }
  function myLoginmob() {
    let reverse = $("#reverse");

    reverse.css("flexDirection", "column-reverse");
  }

  return (
    <MainLayout>
      <ToastContainer />
      <div className="mylogin">
        <div className="main-cont main-cont2 uk-padding-remove">
          <div
            className="uk-child-width-1-2@m uk-child-width-1-1 uk-grid-collapse uk-text-center uk-flex"
            id="reverse"
            data-uk-grid>
            <div className="left uk-flex uk-flex-middle uk-flex-center uk-flex-column">
              <div id="one">
                <h2>Login</h2>
                <Link to="/" className="back">
                  <span className="" data-uk-icon="icon:arrow-left"></span> BACK
                  TO HOME
                </Link>
              </div>
              <div id="two">
                <img src={LoginImage} className="logo" alt="" />
                <form
                  action=""
                  className="myform uk-margin-top"
                  autoComplete="off">
                  <div className="uk-margin uk-width-1-1">
                    <input
                      className="uk-input"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <div className="uk-margin uk-width-1-1">
                    <input
                      className="uk-input"
                      type="password"
                      onChange={(e) => setCpassword(e.target.value)}
                      placeholder="Confirm Password"
                      autoComplete="off"
                    />
                  </div>
                  <div className="uk-margin uk-width-1-1">
                    <input
                      className="uk-input"
                      type="text"
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="otp"
                      autoComplete="off"
                    />
                  </div>

                  <div className="uk-margin uk-width-1-1">
                    <button
                      className="uk-button uk-button-primary"
                      onClick={ChangePassword}>
                      Change Password
                    </button>
                  </div>
                  <div className="uk-width-1-1 uk-flex uk-flex-between uk-visible@m">
                    <p className="uk-margin-remove uk-text-muted uk-text-small">
                      <a href={null} onClick={ResendOtp}>
                        Resend otp
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="right uk-flex uk-flex-middle uk-flex-center uk-flex-column">
              <div id="three">
                <img src={LoginImage} className="logo" alt="" />
                <form
                  action=""
                  className="myform uk-margin-top"
                  autoComplete="off">
                  <div className="uk-margin uk-width-1-1">
                    <input
                      className="uk-input"
                      type="text"
                      autoComplete="off"
                      onChange={(e) => setRphone(e.target.value)}
                      placeholder="Mobile Number"
                    />
                  </div>

                  <div className="uk-margin uk-width-1-1">
                    <button
                      className="uk-button uk-button-primary"
                      onClick={RequestOtp}>
                      Request Otp
                    </button>
                  </div>
                </form>
              </div>
              <div id="four">
                <h2>Register</h2>
                <Link to="/" className="back">
                  <span className="" data-uk-icon="icon:arrow-left"></span> BACK
                  TO HOME
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
