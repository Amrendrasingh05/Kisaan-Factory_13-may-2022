/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Location from "../../images/Location.png";
import wishlist from "../../images/wishlist.svg";
import cart from "../../images/cart.svg";
import profile from "../../images/profile.png";
import eclipse from "../../images/eclipse.svg";
import login from "../../images/login.svg";
import Cart from "./cart.component";
import constant from "../../constant";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import { Badge, Button } from "@mui/material";
import Logo from "./Logo";
import SideNavbar from "./side-navbar";
const HomeHeader = () => {
  const [cartItem, getCart] = useState([]);
  const [TotalCalculation, setTotalCalculation] = useState({});
  const [location, setLocation] = useState({});
  const [city, setCity] = useState("Punjab");
  const [AllBanner, setAllBanner] = useState([]);
  const [openSideBar, setOpenSideBar] = useState(false);
  const getBanner = async () => {
    let AllProduct = constant.BaseUrl + `api/v1/adminapp/user/slideshows`;

    const promise1 = axios.get(AllProduct);

    Promise.all([promise1])
      .then(function (values) {
        if (values[0].data.code === 200) {
          setAllBanner(values[0].data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const PostionData = async (position) => {
    console.log(position);
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        position.coords.latitude
      },${
        position.coords.longitude
      }&key=${"AIzaSyAjOrzdzs-dxm48pmGWGshTufkBjj94BZc"}`
    );
    let AddressComponents = res.data.results[0].address_components;
    let locality = AddressComponents.find((e, i) => {
      if (e.types[0] == "locality") {
        return e.long_name;
      }
    });
    setCity(locality.long_name);
  };

  const getTotalAmount = (Data) => {
    let TotalPrice = 0;
    let TotalDiscount = 0;
    for (let i = 0; i < Data.length; i++) {
      let e = Data[i];
      if (e.item.discount === 0) {
        TotalPrice = TotalPrice + e.quantity * parseFloat(e.item.price);
      } else {
        let Price = e.item.price - (e.item.discount * e.item.price) / 100;
        TotalPrice = TotalPrice + e.quantity * parseFloat(Price);
        TotalDiscount =
          TotalDiscount + (e.quantity * (e.item.discount * e.item.price)) / 100;
      }
    }
    setTotalCalculation({ total: TotalPrice, discount: TotalDiscount });
    getCart(Data);
  };
  const GetCart = async (Id, Quantity) => {
    let token = localStorage.getItem("auth-token");
    const AllProduct = constant.BaseUrl + `api/v1/userapp/cart/view`;
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .get(AllProduct, { headers })
      .then(function (values) {
        if (values.data.cartItems != null) {
          getTotalAmount(values.data.cartItems.cart);
        }
      })
      .catch((err) => {
        history.push("/login");
      });
  };
  const history = useHistory();

  const [SearchKey, setSearchKey] = useState("");

  const SearchProduct = () => {
    history.push("/search?search=" + SearchKey);
  };

  //use effect to fetch gift data
  useEffect(() => {
    getBanner();
    let token = localStorage.getItem("auth-token");
    if (token) {
      GetCart();
    }
    navigator.geolocation.getCurrentPosition(PostionData);
  }, []);

  return (
    <>
      <SideNavbar
        open={openSideBar}
        handleClose={() => {
          setOpenSideBar(false);
        }}
      />
      <header>
        <ToastContainer />
        <div className="uk-container uk-container-expand uk-padding-remove-left">
          <nav className="navbar">
            <div className="container-fluid">
              <div className="d-flex align-items-center col-xs-6 col-sm-3">
                <Logo />

                <p className="location" id="getLoc">
                  <img src={Location} alt="" /> {city}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between  col-xs-6 col-sm-9">
                <form className="d-flex search" onSubmit={SearchProduct}>
                  <input
                    className="form-control me-0 ms-2"
                    autoComplete="off"
                    type="search"
                    placeholder="Search for minimalist chair"
                    onChange={(e) => {
                      setSearchKey(e.target.value);
                    }}
                    aria-label="Search"
                  />
                  <i className="fa fa-search"></i>
                </form>
                <ul className="topnav">
                  <li>
                    <Link to="/wishlist">
                      <Badge
                        badgeContent={0}
                        showZero={false}
                        sx={{
                          ".MuiBadge-badge": {
                            fontSize: 9,
                            height: 15,
                            minWidth: 15,
                          },
                        }}
                        color="secondary">
                        <img src={wishlist} alt="" />
                      </Badge>
                    </Link>
                  </li>
                  <li>
                    <a
                      href={null}
                      onClick={GetCart}
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                      data-uk-toggle="target: #offcanvas-flip">
                      <Badge
                        badgeContent={cartItem?.length}
                        showZero={true}
                        sx={{
                          ".MuiBadge-badge": {
                            fontSize: 9,
                            height: 15,
                            minWidth: 15,
                          },
                        }}
                        color="secondary">
                        <img src={cart} alt="" />
                      </Badge>
                    </a>
                  </li>

                  {localStorage.getItem("auth-token") == null ||
                  localStorage.getItem("auth-token") == undefined ? (
                    <li>
                      <Link to="/login" data-uk-toggle="target: #modal-center">
                        <img src={login} alt="" />
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Button
                        component="a"
                        onClick={() => setOpenSideBar(false)}>
                        <img src={profile} alt="" />
                      </Button>
                      <ul>
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/logout">Log out</Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div
        className="uk-position-relative uk-visible-toggle uk-light header-bottom"
        tabIndex="0"
        data-uk-slider="infinite:true; center: true; autoplay:true; pause-on-hover:false;">
        {/* <div className="flyer">
            <h2>
            High Quality Grocery -
            </h2>
            <p>
             We provide high quality groceries at affordable prices. We have everything from the fruits , vegetables and important household items. Shop now without any hassles!
            </p>

            <button className="btn btn-primary" to={"/search"}>
              
              <Link to={"/search"}>Shop Now</Link>
            </button>
          </div> */}

        {/* <div className="d-flex justify-content-end rel uk-container-expand uk-container">
          <a
            className="mybtns uk-position-small"
            href={null}
            data-uk-slidenav-previous
            data-uk-slider-item="next"></a>
          <a
            className="mybtns uk-position-small"
            href={null}
            data-uk-slidenav-next
            data-uk-slider-item="previous"></a>
        </div> */}

        <ul className="uk-slider-items myslides uk-grid uk-grid-small">
          {AllBanner.map((e, i) => {
            return (
              <li className="uk-width-3-4@m uk-width-1-1" key={i}>
                <div className="uk-panel">
                  <img src={e.images[0]} alt={e._id} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Cart amount={TotalCalculation}>{cartItem}</Cart>
    </>
  );
};

export default HomeHeader;
