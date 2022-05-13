import React, { useEffect, useState } from "react";

import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import constant from "../../constant";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../images/logo.png";
import MainLayout from "../layouts/main-layout";
import _ from "lodash";
const Search = () => {
  let TotalPrice = 0;
  let TotalBillAmount = 0;
  let Discount = 0;
  let CouponDiscount = 0;
  const [isLoader, setisLoader] = useState(false);
  const [cartItem, getCart] = useState([]);

  const ChangeQuantity = (ProductId, Type, PresentQuantity) => {
    let AllProduct = "";
    let QuantityData = {};
    let token = localStorage.getItem("auth-token");
    if (Type == "increase") {
      QuantityData = { quantity: parseInt(PresentQuantity) + 1 };
      AllProduct =
        constant.BaseUrl +
        `api/v1/userapp/cart/product/add/quantity/${ProductId}`;
    } else {
      if (PresentQuantity == 1) {
        toast.error("Quantity not less than 1", {
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
      QuantityData = { quantity: parseInt(PresentQuantity) - 1 };
      AllProduct =
        constant.BaseUrl +
        `api/v1/userapp/cart/product/remove/quantity/${ProductId}`;
    }

    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .put(AllProduct, QuantityData, { headers })
      .then(function (values) {
        GetCart();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const RemoveFromCart = (ProductId) => {
    setisLoader(false);
    let AllProduct = "";

    let token = localStorage.getItem("auth-token");
    AllProduct =
      constant.BaseUrl + `api/v1/userapp/cart/product/remove/${ProductId}`;

    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .post(AllProduct, {}, { headers })
      .then(function (values) {
        GetCart();
        setisLoader(false);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          toast.error("Please login to remove item from cart", {
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
  const GetCart = async () => {
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
          getCart(values.data.cartItems.cart);
        }
        setisLoader(true);
      })
      .catch((err) => {
        setisLoader(true);
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

  const AddToWishList = async (ProductId) => {
    let AllProduct = "";
    setisLoader(false);
    let token = localStorage.getItem("auth-token");
    AllProduct =
      constant.BaseUrl +
      `api/v1/userapp/dashboard/add-to-wishlist/${ProductId}`;

    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };
    axios
      .get(AllProduct, { headers })
      .then(function (values) {
        RemoveFromCart(ProductId);
        GetCart();
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
  //use effect to fetch gift data
  useEffect(() => {
    GetCart();
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
        <div className="white-bg">
          <div className="uk-container uk-container-expand">
            <div className="uk-padding uk-background-default">
              <div className="uk-grid-divider uk-grid-small" data-uk-grid>
                <div className="uk-width-1-1 uk-width-expand@m">
                  <table className="uk-table uk-table-divider uk-table-small uk-table-middle bd uk-margin-top uk-border uk-table-responsive ">
                    <tr>
                      <td>
                        <span className="uk-text-bold">
                          Check Delivery Time & Services
                        </span>
                      </td>
                      <td>
                        {/* <button
                          className="uk-button uk-button-default pink uk-button-small uk-margin-auto-left uk-display-block"
                          type="button"
                          data-uk-toggle="target: #modal-example223"
                        >
                          Enter PIN Code
                        </button> */}
                        <div id="modal-example223" data-uk-modal>
                          <div className="uk-modal-dialog uk-text-center uk-modal-body">
                            <h4 className="">Enter Delivery PIN Code</h4>
                            <div className="uk-margin-small">
                              <form className="uk-width-1-2 uk-margin-auto ">
                                <input
                                  className="uk-input"
                                  type="search"
                                  placeholder="Enter PIN Code"
                                />
                                <button className="uk-button uk-button-primary mt-3">
                                  submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  {cartItem.map((e, i) => {
                    if (e.item.discount === 0) {
                      TotalPrice = parseFloat(e.item.price);
                      TotalBillAmount =
                        TotalBillAmount + e.quantity * parseFloat(e.item.price);
                    } else {
                      let Price =
                        e.item.price - (e.item.discount * e.item.price) / 100;

                      TotalPrice = Price;
                      Discount =
                        Discount +
                        e.quantity * parseFloat(e.item.price - Price);
                      TotalBillAmount =
                        TotalBillAmount + e.quantity * parseFloat(e.item.price);
                    }

                    return (
                      <table
                        key={i}
                        className="uk-table tablez uk-table-divider uk-table-small uk-table-middle bd uk-margin-top uk-border uk-table-responsive ">
                        <tbody>
                          <tr>
                            <td className="uk-table-shrink">
                              <img
                                src={constant.ServerUrl + e.item.images[0]}
                                width="100"
                                alt={_.upperFirst(e.item.title)}
                              />
                            </td>
                            <td className="uk-table-expand">
                              {_.upperFirst(e.item.title)}
                            </td>
                            <td className="uk-width-1-6@m uk-width-1-1">
                              <p className="labels">Quantity</p>
                              <div className="quantity2">
                                <form
                                  id="myform"
                                  method="POST"
                                  className="quantity uk-flex uk-flex-between"
                                  action="#"
                                  autoComplete="off">
                                  <input
                                    type="button"
                                    defaultValue="-"
                                    className="qtyminus minus trig"
                                    onClick={() =>
                                      ChangeQuantity(
                                        e.item._id,
                                        "decrease",
                                        e.quantity
                                      )
                                    }
                                    field="quantity"
                                  />
                                  <input
                                    type="text"
                                    name="quantity"
                                    readOnly={true}
                                    value={e.quantity}
                                    className="qty"
                                  />
                                  <input
                                    type="button"
                                    defaultValue="+"
                                    className="qtyplus plus trig"
                                    onClick={() =>
                                      ChangeQuantity(
                                        e.item._id,
                                        "increase",
                                        e.quantity
                                      )
                                    }
                                    field="quantity"
                                  />
                                </form>
                              </div>
                            </td>
                            <td className="uk-width-1-6@m uk-width-1-1">
                              <p className="labels">Unit Price</p>
                              <p>₹ {e.item.price.toFixed(2)}/-</p>
                            </td>
                            <td className="uk-width-1-6@m uk-width-1-1">
                              <p className="labels">Total</p>
                              <p>₹ {(e.quantity * TotalPrice).toFixed(2)}/-</p>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="5">
                              <div
                                className="uk-grid-divider uk-child-width-expand@s uk-text-center"
                                data-uk-grid>
                                <div>
                                  <button
                                    onClick={() => {
                                      RemoveFromCart(e.item._id);
                                    }}
                                    type="button"
                                    data-uk-icon="icon: trash; ratio:0.8;"
                                    className="uk-icon">
                                    REMOVE
                                  </button>
                                </div>

                                <button
                                  onClick={() => {
                                    AddToWishList(e.item._id);
                                  }}
                                  type="button"
                                  data-uk-icon="icon: heart; ratio:0.8;"
                                  className="uk-icon">
                                  MOVE TO WISHLIST
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  })}

                  <div className="uk-grid uk-grid-small uk-child-width-1-2@m uk-child-width-1-1">
                    <div class="uk-padding-remove-right">
                      <Link
                        className="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
                        to="/">
                        Continue Shoping
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="uk-width-1-1 uk-width-1-3@m">
                  <h2 className="sideheading pt-4">Order Summary</h2>
                  <hr className="hbr" />
                  <table className="uk-table uk-table-divider uk-table-small uk-table-middle bd uk-margin-top uk-border uk-table-responsive ">
                    <tr>
                      {/* <td>
                        <span data-uk-icon="tag"></span> Apply Coupons
                      </td> */}
                      <td>
                        {/* <button
                          className="uk-button uk-button-default pink uk-button-small uk-margin-auto-left uk-display-block"
                          type="button"
                          data-uk-toggle="target: #modal-example224"
                        >
                          APPLY
                        </button> */}
                        <div id="modal-example224" data-uk-modal>
                          <div className="uk-modal-dialog uk-width-1-3@m uk-width-1-1@s uk-text-center uk-modal-body">
                            <h4 className="">Enter Coupon Code</h4>
                            <div className="uk-margin">
                              <form className="uk-search uk-search-default uk-width-1-2@m uk-width-1-1@s">
                                <input
                                  className="uk-search-input"
                                  type="search"
                                  placeholder="Enter Coupon Code"
                                />
                                <button className="uk-button uk-button-primary uk-margin-small-top">
                                  APPLY COUPON
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <div className=" uk-margin-top uk-padding-small">
                    <p className="uk-grid descy">
                      <span className="uk-width-expand">Sub Total (+GST)</span>
                      <span className="uk-width-auto">
                        ₹ {TotalBillAmount.toFixed(2)}
                      </span>
                    </p>
                    <p className="uk-grid descy">
                      <span className="uk-width-expand">Discount</span>
                      <span className="uk-width-auto">
                        ₹ {Discount.toFixed(2)}
                      </span>
                    </p>
                    <hr className="hbr" />

                    <p className="uk-grid descy">
                      <span className="uk-width-expand">Coupon Discount</span>
                      <span className="uk-width-auto">
                        ₹ {CouponDiscount.toFixed(2)}
                      </span>
                    </p>

                    <p className="uk-grid descy">
                      <span className="uk-width-expand">Shipping Cost</span>
                      <span className="uk-width-auto">Free</span>
                    </p>

                    <hr className="hbr" />

                    <p className="uk-grid uk-grid-small gtotal">
                      <span className="uk-width-expand">Total:</span>
                      <span className="uk-width-auto" id="total">
                        ₹ {(TotalBillAmount - Discount).toFixed(2)}
                      </span>
                    </p>
                    <br />
                    <div className="uk-text-center">
                      <Link
                        className="uk-button  uk-position-relative uk-button-primary uk-width-1-1"
                        to={"/checkout"}
                        type="button">
                        go to checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </MainLayout>
    );
  }
};

export default Search;
