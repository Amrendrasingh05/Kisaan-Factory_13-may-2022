import React, { useEffect, useState } from "react";
import products from "../../images/products/2.jpg";
import User from "../../images/profile.jpg";
import { toast } from "react-toastify";
import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import { useHistory } from "react-router";
import constant from "../../constant";
import axios from "axios";
import { Link } from "react-router-dom";
import { Markup } from "interweave";
import _ from "lodash";
import Logo from "../../images/logo.png";
import MainLayout from "../layouts/main-layout";

const Dashboard = () => {
  const history = useHistory();
  const [isLoader, setisLoader] = useState(false);
  const [Wishlist, getWishlist] = useState([]);
  const AddToCart = async (Id, Quantity) => {
    setisLoader(false);
    let token = localStorage.getItem("auth-token");
    const AllProduct =
      constant.BaseUrl + `api/v1/userapp/cart/product/add-toCart/${Id}`;
    const article = { quantity: Quantity };
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .post(AllProduct, article, { headers })
      .then(function (values) {
        removeFromWishList(Id);
        toast.success(values.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        if (err.response.status == 401) {
          toast.error("Please login to add to cart", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (err.response.status == 400) {
          toast.error("Please login to add to cart", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const removeFromWishList = async (ProductId) => {
    let AllProduct = "";
    setisLoader(false);
    let token = localStorage.getItem("auth-token");
    AllProduct =
      constant.BaseUrl +
      `api/v1/userapp/dashboard/remove-from-wishlist/${ProductId}`;

    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .get(AllProduct, { headers })
      .then(function (values) {
        getDashbardData();
      })
      .catch((err) => {
        if (err.response.status == 401) {
          toast.error("Please login to remove item from wishlist", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (err.response.status == 400) {
          toast.error("Please login to add to wishlist", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(err.response.data.msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };
  const getDashbardData = async () => {
    let token = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    let Profile = constant.BaseUrl + `api/v1/userapp/dashboard/view/favourites`;

    const Profiledata = axios.get(Profile, { headers });

    Promise.all([Profiledata])
      .then(function (values) {
        getWishlist(values[0].data.favourites);
        setisLoader(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //use effect to fetch gift data
  useEffect(() => {
    getDashbardData();
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
          <div className="uk-container uk-container-small">
            <h2 className="innheader uk-margin-bottom">My Wishlist</h2>
            {Wishlist.map((e, i) => {
              return (
                <div className="wishlist">
                  <div className="uk-grid-small" data-uk-grid>
                    <div className="uk-width-1-6@m uk-width-1-1 wlist">
                      <img
                        src={constant.ServerUrl + e.images[0]}
                        alt=""
                        data-uk-img=""
                      />
                    </div>
                    <div className="uk-width-expand@m uk-width-1-1 uk-flex uk-flex-middle">
                      <div className="descy">
                        <h3 class="pnam">{_.upperFirst(e.title)}</h3>

                        <p class="pdes">
                          <Markup content={e.description} />
                        </p>
                        <h6 class="price">
                          Rs.
                          {(e.price - (e.price * e.discount) / 100).toFixed(2)}
                          <Markup
                            content={
                              e.discount > 0 ? `<del>${e.price}</del>` : ""
                            }
                          />
                        </h6>
                      </div>
                    </div>
                    <div className="uk-width-auto@m uk-width-auto uk-flex uk-flex-middle">
                      <a
                        href={null}
                        onClick={() => {
                          removeFromWishList(e._id);
                        }}
                        className="uk-padding-small uk-text-danger">
                        <span uk-icon="icon:trash"></span>
                      </a>
                    </div>
                    <div className="uk-width-auto@m uk-width-expand uk-flex uk-flex-middle">
                      <button
                        onClick={() => AddToCart(e._id, 1)}
                        className="uk-button uk-button-primary uk-margin-small uk-margin-right ">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <Footer />
      </MainLayout>
    );
  }
};

export default Dashboard;
