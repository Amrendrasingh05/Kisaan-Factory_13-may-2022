import React, { useState } from "react";
import { useHistory } from "react-router";
import constant from "../../constant";
import axios from "axios";
import { Link } from "react-router-dom";

import LoginImage from "../../images/logo.png";

import BgImage from "../../images/right-bg.png";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import MainLayout from "../layouts/main-layout";
const Login = () => {
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FullName, setFullName] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [IsAcept, setIsAccept] = useState(false);
  const [LMobileNumber, setLMobileNumber] = useState("");
  const [LPassword, setLPassword] = useState("");
  const [Rphone, setRphone] = useState("");
  const handleCategory = () => setIsAccept(!IsAcept);

  const RequestOtp = () => {
    console.log(Rphone);
  };
  const FormRegisterSubmit = (event) => {
    event.preventDefault();
    let Payload = {
      name: FullName,
      mobile: MobileNumber,
      emailID: Email,
      password: Password,
      countryCode: 91,
    };
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!Email || regex.test(Email) === false) {
      toast.error("Please check your email", {
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
    if (!IsAcept) {
      toast.error("please accept term and conditions", {
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
    axios
      .post(constant.BaseUrl + "api/v1/userapp/auth/register", Payload)
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
          setTimeout(() => history.go(0), 3000);
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
  const FormLoginSubmit = (event) => {
    event.preventDefault();
    let Payload = {
      mobile: LMobileNumber,
      password: LPassword,
    };

    axios
      .post(constant.BaseUrl + "api/v1/userapp/auth/login", Payload)
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

          localStorage.setItem("auth-token", data.token);
          setTimeout(() => history.push("/"), 3000);
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
                      type="text"
                      placeholder="Full Name"
                      autoComplete="off"
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="uk-margin uk-width-1-1">
                    <input
                      className="uk-input"
                      type="text"
                      placeholder="Mobile No."
                      autoComplete="off"
                      onChange={(e) => {
                        setMobileNumber(e.target.value);
                      }}
                    />
                  </div>
                  <div className="uk-margin uk-width-1-1">
                    <input
                      className="uk-input"
                      type="text"
                      placeholder="Email ID"
                      autoComplete="off"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="uk-margin uk-width-1-1">
                    <input
                      className="uk-input"
                      type="password"
                      placeholder="Password"
                      autoComplete="off"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <label htmlFor="axe" style={{ fontSize: "12px" }}>
                    <input
                      type="checkbox"
                      name="axe"
                      checked={IsAcept}
                      value="1"
                      onClick={handleCategory}
                      className="uk-margin-small-right"
                      id="axe"
                      autoComplete="off"
                    />
                    I accept Kisaan Factory{" "}
                    <Link to="/terms-privacy">Terms & Privacy Conditions</Link>
                  </label>

                  <div className="uk-margin uk-width-1-1">
                    <button
                      className="uk-button uk-button-primary"
                      onClick={FormRegisterSubmit}>
                      Register
                    </button>
                  </div>
                  <div className="uk-width-1-1 uk-text-right uk-visible@m">
                    <p className="uk-margin-remove uk-text-muted uk-text-small">
                      Already have an account ? <a onClick={myLogin}>Login</a>
                    </p>
                  </div>
                  <div className="uk-width-1-1 uk-text-right uk-hidden@m">
                    <p className="uk-margin-remove uk-text-muted uk-text-small">
                      Already have an account ?{" "}
                      <a onClick={myLoginmob}>Login</a>
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
                      onChange={(e) => setLMobileNumber(e.target.value)}
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div className="uk-margin uk-width-1-1">
                    <input
                      className="uk-input"
                      type="password"
                      autoComplete="off"
                      onChange={(e) => setLPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <div className="uk-margin uk-width-1-1">
                    <button
                      className="uk-button uk-button-primary"
                      onClick={FormLoginSubmit}>
                      Login
                    </button>
                  </div>
                  <div className="uk-width-1-1 uk-flex uk-flex-between uk-visible@m">
                    <p className="uk-margin-remove uk-text-muted uk-text-small">
                      <a href="/reset-password">Reset Password</a>
                    </p>
                    <p className="uk-margin-remove uk-text-muted uk-text-small">
                      Don't have an account ?{" "}
                      <a onClick={myRegister}>Register</a>
                    </p>
                  </div>
                  <div className="uk-width-1-1 uk-text-right uk-hidden@m">
                    <p className="uk-margin-remove uk-text-muted uk-text-small">
                      Forgot Your Password{" "}
                      <a href="/reset-password">Reset Password</a>
                    </p>
                    <p className="uk-margin-remove uk-text-muted uk-text-small">
                      Don't have an account ?{" "}
                      <a onClick={myRegistermob}>Register</a>
                    </p>
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
