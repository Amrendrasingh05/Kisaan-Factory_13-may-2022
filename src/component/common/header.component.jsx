/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../images/logo.png";
import Location from "../../images/Location.png";
import wishlist from "../../images/wishlist.svg";
import cart from "../../images/cart.svg";
import profile from "../../images/profile.png";
import login from "../../images/login.svg";
import { ToastContainer, toast } from "react-toastify";

import Cart from "./cart.component";
import { useHistory } from "react-router";
import constant from "../../constant";
import axios from "axios";
import Logo from "./Logo";
import { Badge } from "@mui/material";
const HomeHeader = () => {
  const [cartItem, getCart] = useState([]);
  const [TotalCalculation, setTotalCalculation] = useState({});
  const [location, setLocation] = useState({});
  const [city, setCity] = useState("Punjab");

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
          getCart(values.data.cartItems.cart);
        }
      })
      .catch((err) => {
        console.log(err, "GET CART ERROR");
        history.push("/login");
      });
  };
  const history = useHistory();

  const [SearchKey, setSearchKey] = useState("");

  const SearchProduct = () => {
    history.push("/search?search=" + SearchKey);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(PostionData);
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token) {
      GetCart();
    }
  }, []);
  return (
    <>
      <header>
        <ToastContainer />
        <div className="uk-container uk-container-expand">
          <nav className="navbar" style={{ position: "sticky" }}>
            <div className="container-fluid">
              <div className="d-flex align-items-center col-sm-3 col-6">
                <Logo />

                <p className="location" id="getLoc">
                  <img src={Location} alt="" /> {city}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between col-sm-9 col-6">
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
                      style={{ marginLeft: "0.2vw", marginRight: "0.2vw" }}
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

                  {localStorage.getItem("auth-token") === null ||
                  localStorage.getItem("auth-token") === undefined ? (
                    <li>
                      <Link to="/login" data-uk-toggle="target: #modal-center">
                        <img src={login} alt="" />
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <a href={null}>
                        <img src={profile} alt="" />
                      </a>
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
      <Cart amount={TotalCalculation}>{cartItem}</Cart>
    </>
  );
};

export default HomeHeader;
