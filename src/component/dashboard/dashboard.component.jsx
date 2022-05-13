import React, { useEffect, useState } from "react";
import User from "../../images/profile.jpg";
import { toast } from "react-toastify";
import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import { useHistory } from "react-router";
import constant from "../../constant";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import tawkTo from "../../utils/tawk";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import MainLayout from "../layouts/main-layout";
const Library = ["places"];
const Dashboard = () => {
  const history = useHistory();
  const [profile, getProfile] = useState([]);
  const [address, getAddress] = useState([]);
  const [AllOrder, setAllOrder] = useState([]);
  const [isLoader, setisLoader] = useState(false);
  const [house, setHouse] = useState("");
  const [Street, setStreet] = useState("");
  const [Locality, setLocality] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Zipcode, setZipcode] = useState("");
  const [Country, setCountry] = useState("");
  const [CurrentDefaultAddress, setCurrentDefaultAddress] = useState("");
  const [location, setLocation] = useState({});
  const [Name, setName] = useState("");
  const [Password1, setPassword1] = useState("");
  const [Password2, setPassword2] = useState("");

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const updateProfile = (e) => {
    let token = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    e.preventDefault();
    let Payload = {
      name: Name,
      password1: Password1,
      password2: Password2,
    };

    axios
      .put(
        constant.BaseUrl + "api/v1/userapp/auth/update-userdetails",
        Payload,
        { headers }
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
          localStorage.removeItem("auth-token");
          history.push("/login");
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
  const inputStyle = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: "absolute",
    top: "10px",
    right: "10px",
  };

  const defaultCenter = {
    lat: location.lat ? location.lat : 0,
    lng: location.lng ? location.lng : 0,
  };
  const PostionData = (position) => {
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log(lat);
    console.log(lng);
    setLocation({
      lat: lat,
      lng: lng,
    });
  };

  const SetDefaultAddress = (AddressId) => {
    let token = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    let Payload = {
      currentAddressId: CurrentDefaultAddress,
      addressId: AddressId,
    };

    axios
      .post(
        constant.BaseUrl + "api/v1/userapp/dashboard/address/makedefault",
        Payload,
        { headers }
      )
      .then((response) => {
        let data = response.data;
        if (data != null) {
          history.go(0);
        }
      })
      .catch((err) => {});
  };
  const SaveAddress = (e) => {
    let token = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    e.preventDefault();
    let Payload = {
      house: house,
      street: Street,
      locality: Locality,
      city: City,
      state: State,
      country: Country,
      zip: parseInt(Zipcode),
      longitude: location.lat,
      latitude: location.lng,
    };

    axios
      .post(
        constant.BaseUrl + "api/v1/userapp/dashboard/address/add",
        Payload,
        { headers }
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
          getDashbardData();
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
  const getDashbardData = async () => {
    let token = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    let Profile = constant.BaseUrl + `api/v1/userapp/dashboard/view/profile`;
    let Address = constant.BaseUrl + `api/v1/userapp/dashboard/address/all`;
    let Order = constant.BaseUrl + `api/v1/userapp/order/all`;

    const Profiledata = axios.get(Profile, { headers });
    const AddressData = axios.get(Address, { headers });
    const OrderData = axios.get(Order, { headers });

    Promise.all([Profiledata, AddressData, OrderData])
      .then(function (values) {
        getProfile(values[0].data.userData ? values[0].data.userData : {});
        setName(values[0].data.userData.name);
        getAddress(values[1].data.address ? values[1].data.address : []);
        setAllOrder(values[2].data.data ? values[2].data.data : []);
        if (values[1].data.address) {
          values[1].data.address.map((e, i) => {
            if (e.default == true) {
              setCurrentDefaultAddress(e._id);
            }
          });
        }
        setisLoader(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [searchBox, setSearchBox] = useState(null);
  const onLoad = (ref) => {
    setSearchBox(ref);
  };
  const onPlacesChanged = async () => {
    let Place = searchBox.getPlaces();

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        Place[0].formatted_address
      }&key=${"AIzaSyAjOrzdzs-dxm48pmGWGshTufkBjj94BZc"}`
    );
    const result = res.data.results[0].geometry.location;
    setLocation(result);
  };

  const ReturnOrder = (OrderId) => {
    let token = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    let Payload = {
      orderId: OrderId,
    };

    axios
      .post(constant.BaseUrl + "api/v1/userapp/order/return", Payload, {
        headers,
      })
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
          getDashbardData();
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

  const CancelOrder = (OrderId) => {
    setisLoader(false);
    let token = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    let Payload = {
      orderId: OrderId,
    };

    axios
      .post(constant.BaseUrl + "api/v1/userapp/order/cancel", Payload, {
        headers,
      })
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
          getDashbardData();
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

  const Already = (Data) => {
    toast.error("Order Already return or cancelled", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  //use effect to fetch gift data
  useEffect(() => {
    tawkTo("61bf055380b2296cfdd2678f", "1fn92pk3n");
    getDashbardData();
    navigator.geolocation.getCurrentPosition(PostionData);
  }, []);
  if (isLoader == false) {
    return (
      <>
        <div id="loading">
          <img id="loading-image" src={Logo} alt="Loading..." />
        </div>
      </>
    );
  } else {
    return (
      <MainLayout>
        <Header />
        <section className="uk-section">
          <div className="uk-container uk-container-expand">
            <div className="uk-grid-small" data-uk-grid>
              <div className="uk-width-1-4@m uk-width-1-1">
                <section className="myCustomCard">
                  <div className="profile">
                    <img src={User} className="proIcon" alt="" />
                    <div>
                      <small>Hello</small>
                      <h4>{profile.name}</h4>
                    </div>
                  </div>
                </section>
                <section className="myCustomCard mt-3">
                  <ul
                    className="uk-tab-right mytab uk-background-default uk-tab "
                    data-uk-tab="connect: #component-tab-left; animation: uk-animation-fade "
                    uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium">
                    <li>
                      <a href={null}>My Profile</a>
                    </li>
                    <li>
                      <a href={null}>My Orders</a>
                    </li>
                    <li>
                      <a href={null}>Notifications</a>
                    </li>
                    <li>
                      <a href={null}>Manage Address</a>
                    </li>
                    <li>
                      <a href={null}>Logout</a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="uk-width-expand@m uk-width-1-1">
                <ul id="component-tab-left" className="uk-switcher uk-margin">
                  <li>
                    <section className="myCustomCard">
                      <h4 className="title mb-4">My Profile</h4>
                      <form action="" autoComplete="off">
                        <div
                          className="uk-child-width-1-2@m uk-child-width-1-1 uk-margin-small uk-grid-small"
                          data-uk-grid>
                          <div className="">
                            <label htmlFor="" className="inputHeading">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="uk-input"
                              placeholder="First Name"
                              defaultValue={profile.name}
                              autoComplete="off"
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </div>
                          <div className="">
                            <label htmlFor="" className="inputHeading">
                              Mobile No.
                            </label>
                            <input
                              type="text"
                              disabled={true}
                              className="uk-input"
                              placeholder="Mobile No."
                              readOnly={true}
                              defaultValue={profile.mobile}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div
                          className="uk-child-width-1-2@m uk-child-width-1-1 uk-margin-small uk-grid-small"
                          data-uk-grid>
                          <div className="">
                            <label htmlFor="" className="inputHeading">
                              Email ID
                            </label>
                            <input
                              type="email"
                              disabled={true}
                              readOnly={true}
                              autoComplete="off"
                              className="uk-input"
                              placeholder="Email ID"
                              defaultValue={profile.emailID}
                            />
                          </div>
                        </div>
                        <div
                          className="uk-child-width-1-2@m uk-child-width-1-1 uk-margin-small uk-grid-small"
                          data-uk-grid>
                          <div className="">
                            <label htmlFor="" className="inputHeading">
                              Password
                            </label>
                            <input
                              autoComplete="off"
                              type="password"
                              className="uk-input"
                              placeholder="password"
                              onChange={(e) => {
                                setPassword1(e.target.value);
                              }}
                            />
                          </div>
                          <div className="">
                            <label htmlFor="" className="inputHeading">
                              Confirm Password
                            </label>
                            <input
                              autoComplete="off"
                              type="password"
                              className="uk-input"
                              placeholder="password"
                              onChange={(e) => {
                                setPassword2(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="uk-flex uk-flex-right">
                          <button
                            type="button"
                            className="uk-button uk-button-danger"
                            onClick={updateProfile}>
                            Update
                          </button>
                        </div>
                      </form>
                    </section>
                  </li>
                  <li>
                    <section className="myCustomCard">
                      <h4 className="title mb-4">My Orders</h4>
                      <div className="uk-overflow-auto">
                        <table className="uk-table uk-table-divider uk-background-default uk-text-left uk-table-small uk-table-middle uk-card-default">
                          <tbody>
                            <tr className="uk-background-muted">
                              <th scope="col">Product Id</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Product Image</th>

                              <th scope="col">Status</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Return</th>
                              <th scope="col">Cancel</th>
                            </tr>
                            {AllOrder.map((e, i) => {
                              return (
                                <tr key={i}>
                                  <td>{e._id}</td>
                                  <td> {e.products[0].product.title} </td>
                                  <td>
                                    <img
                                      src={constant.ServerUrl + e.orderImg}
                                      alt=""
                                      height="35"
                                      width="35"
                                    />
                                    {e.products[0].productName}
                                  </td>
                                  <td>
                                    <label className="uk-label uk-label-warning uk-width-1-1 uk-text-center">
                                      {e.orderStatus}
                                    </label>
                                  </td>
                                  <td>
                                    <label className="uk-label uk-label-warning uk-width-1-1 uk-text-center">
                                      {e.paymentDetails.paymentMethod}/
                                      {e.paymentDetails.paymentStatus}
                                    </label>
                                  </td>
                                  <td>
                                    <button
                                      className="uk-button uk-button-small uk-button-danger"
                                      onClick={() => {
                                        e.orderStatus != "cancel" &&
                                        e.orderStatus != "return"
                                          ? ReturnOrder(e._id)
                                          : Already("Returned");
                                      }}>
                                      Return
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      onClick={() => {
                                        e.orderStatus != "cancel" &&
                                        e.orderStatus != "return"
                                          ? CancelOrder(e._id)
                                          : Already("Cancelled");
                                      }}
                                      className="uk-button uk-button-small uk-button-danger">
                                      Cancel
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </li>
                  <li>
                    <section className="myCustomCard">
                      <h4 className="title mb-4">Notifications</h4>

                      <div className="uk-card uk-card-default uk-card-small notification">
                        <div className="uk-text-left uk-flex uk-flex-between">
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr.
                          <code>
                            31<sup>st</sup> Aug 2021, 01:19 PM
                          </code>
                        </div>
                      </div>

                      <div className="uk-card uk-card-default uk-card-small notification">
                        <div className="uk-text-left uk-flex uk-flex-between">
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr.
                          <code>
                            31<sup>st</sup> Aug 2021, 01:19 PM
                          </code>
                        </div>
                      </div>

                      <div className="uk-card uk-card-default uk-card-small notification">
                        <div className="uk-text-left uk-flex uk-flex-between">
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr.
                          <code>
                            31<sup>st</sup> Aug 2021, 01:19 PM
                          </code>
                        </div>
                      </div>

                      <div className="uk-card uk-card-default uk-card-small notification">
                        <div className="uk-text-left uk-flex uk-flex-between">
                          Lorem ipsum dolor sit amet, consetetur sadipscing
                          elitr.
                          <code>
                            31<sup>st</sup> Aug 2021, 01:19 PM
                          </code>
                        </div>
                      </div>
                    </section>
                  </li>
                  <li>
                    <section className="myCustomCard">
                      <h4 className="title">Manage Address</h4>

                      <button
                        href="#toggle-animation"
                        className="uk-button uk-button-default uk-margin-top"
                        type="button"
                        uk-toggle="target: #toggle-animation; animation: uk-animation-fade">
                        <span
                          className="uk-margin-small-right"
                          data-uk-icon="plus-circle"></span>
                        Add New Address
                      </button>

                      <div
                        id="toggle-animation"
                        className="address uk-margin-small"
                        hidden>
                        <div
                          className="uk-child-width-1-2@m uk-grid-column-small uk-grid-small uk-grid"
                          data-uk-grid="">
                          <LoadScript
                            googleMapsApiKey="AIzaSyAjOrzdzs-dxm48pmGWGshTufkBjj94BZc"
                            libraries={Library}>
                            <GoogleMap
                              mapContainerStyle={mapStyles}
                              zoom={13}
                              center={defaultCenter}>
                              {
                                <Marker
                                  position={{
                                    lat: location.lat ? location.lat : 0,
                                    lng: location.lng ? location.lng : 0,
                                  }}
                                  draggable={true}
                                  onDragEnd={(e) => onMarkerDragEnd(e)}
                                />
                              }
                              <StandaloneSearchBox
                                onLoad={onLoad}
                                onPlacesChanged={onPlacesChanged}>
                                <input
                                  type="text"
                                  autoComplete="off"
                                  placeholder="Search Address"
                                  style={inputStyle}
                                />
                              </StandaloneSearchBox>
                            </GoogleMap>
                          </LoadScript>
                          <div className="">
                            <div className="uk-inline uk-width-1-1">
                              <span
                                className="uk-form-icon uk-icon"
                                data-uk-icon="icon: file-edit"></span>
                              <input
                                className="uk-input"
                                autoComplete="off"
                                type="text"
                                name="address1"
                                placeholder="House"
                                defaultValue=""
                                onChange={(e) => setHouse(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="">
                            <div className="uk-inline uk-width-1-1">
                              <span
                                className="uk-form-icon uk-icon"
                                data-uk-icon="icon: file-edit"></span>
                              <input
                                autoComplete="off"
                                className="uk-input"
                                type="text"
                                name="address2"
                                placeholder="Street"
                                defaultValue=""
                                onChange={(e) => setStreet(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="uk-grid-margin uk-first-column">
                            <div className="uk-inline uk-width-1-1">
                              <input
                                autoComplete="off"
                                className="uk-input"
                                type="text"
                                name="address2"
                                placeholder="Locality"
                                defaultValue=""
                                onChange={(e) => setLocality(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="uk-grid-margin">
                            <div className="uk-inline uk-width-1-1">
                              <input
                                autoComplete="off"
                                className="uk-input"
                                type="text"
                                name="address2"
                                placeholder="City"
                                defaultValue=""
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="uk-grid-margin uk-first-column">
                            <div className="uk-inline uk-width-1-1">
                              <input
                                autoComplete="off"
                                className="uk-input"
                                type="text"
                                name="address2"
                                placeholder="State"
                                defaultValue=""
                                onChange={(e) => setState(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="uk-grid-margin">
                            <div className="uk-inline uk-width-1-1">
                              <span
                                className="uk-form-icon uk-icon"
                                data-uk-icon="icon: file-edit"></span>
                              <input
                                autoComplete="off"
                                className="uk-input"
                                name="pin"
                                id="pin"
                                type="number"
                                placeholder="Pin code"
                                onChange={(e) => setZipcode(e.target.value)}
                                defaultValue=""
                              />
                            </div>
                          </div>
                          <div className="uk-grid-margin">
                            <div className="uk-inline uk-width-1-1">
                              <span
                                className="uk-form-icon uk-icon"
                                data-uk-icon="icon: file-edit"></span>
                              <input
                                autoComplete="off"
                                className="uk-input"
                                name="pin"
                                id="pin"
                                type="text"
                                placeholder="Country"
                                onChange={(e) => setCountry(e.target.value)}
                                defaultValue=""
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          className="uk-button uk-margin-top uk-button-small uk-button-danger"
                          type="button"
                          onClick={SaveAddress}>
                          Save Address
                        </button>
                      </div>
                      <p className="uk-text-muted mt-3">
                        Please select a default address
                      </p>
                      <div
                        className="uk-child-width-1-3@m uk-child-width-1-1 uk-grid-match uk-margin-top uk-grid-small"
                        data-uk-grid>
                        {address.map((e, i) => {
                          return (
                            <div key={i}>
                              <input
                                type="radio"
                                name={e._id}
                                id={e._id}
                                className="myradio"
                                defaultValue={e._id}
                                autoComplete="off"
                                onClick={() => {
                                  SetDefaultAddress(e._id);
                                }}
                                defaultChecked={
                                  e.default == true ? true : false
                                }
                              />
                              <label htmlFor={e._id} className="address">
                                <h5>{e.house}</h5>
                                <p>
                                  {e.street} {e.locality} {e.city} <br />
                                  {e.state} {e.country} {e.zip}
                                </p>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </li>
                  <li>
                    <section className="myCustomCard">
                      <h5 className="title uk-text-center mt-5 mb-3">
                        Are you sure want to logout
                      </h5>

                      <Link
                        className="uk-button uk-button-danger mb-5 mx-auto d-block"
                        to="/logout">
                        Logout
                      </Link>
                    </section>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </MainLayout>
    );
  }
};

export default Dashboard;
