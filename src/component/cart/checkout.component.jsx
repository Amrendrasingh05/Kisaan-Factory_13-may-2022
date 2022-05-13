import React, { useEffect, useState } from "react";

import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import { useHistory } from "react-router";
import constant from "../../constant";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../images/logo.png";
import _ from "lodash";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import MainLayout from "../layouts/main-layout";
const Library = ["places"];
let TotalPrice = 0;
const Search = () => {
  let PaymentMethod = "";
  let token = localStorage.getItem("auth-token");
  const headers = {
    "auth-token": token,
    "Content-Type": "application/json",
  };
  const [isLoader, setisLoader] = useState(false);
  const history = useHistory();
  const [profile, getProfile] = useState([]);
  const [address, getAddress] = useState([]);
  const [AllOrder, setAllOrder] = useState([]);
  const [CartID, setCartID] = useState("");

  const [CurrentDefaultAddress, setCurrentDefaultAddress] = useState("");
  const [showAddress, setshowAddress] = useState("uk-active");
  const [showAddAddress, setshowAddAddress] = useState("");
  const [house, setHouse] = useState("");
  const [Street, setStreet] = useState("");
  const [Locality, setLocality] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Zipcode, setZipcode] = useState("");
  const [Country, setCountry] = useState("");

  const [location, setLocation] = useState({});
  const mapStyles = {
    height: "35vh",
    width: "100%",
    marginBottom: "20px",
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
      longitude: location.lng,
      latitude: location.lat,
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
          getCheckoutData();
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
  const ChangeActive = (Type) => {
    if (Type == "SetDefault") {
      setshowAddress("uk-active");
      setshowAddAddress("");
    } else {
      setshowAddress("");
      setshowAddAddress("uk-active");
    }
  };

  const CreateOrder = () => {
    // make the orders and add them into an orders array
    let orderArray = [];
    let index = 0;

    AllOrder.map((cartItem) => {
      const product = {
        productId: cartItem.item._id,
        product: cartItem.item,
        productQuantity: cartItem.quantity,
      };

      const order = {
        orderImg: cartItem.item.images[0],
        vendorID: cartItem.item.soldBy ?? cartItem.item.addedBy,
        totalAmount:
          (cartItem.item.price -
            (cartItem.item.price * cartItem.item.discount) / 100) *
          cartItem.quantity,
        packed: false,
        shipped: false,
        orderStatus: "ordered",
        discountPrice: (cartItem.item.price * cartItem.item.discount) / 100,
        shippingName: profile.name,
        shippindAddressID: CurrentDefaultAddress,
        shippingContact: parseInt(profile.mobile),
        paymentStatus: "paid",
        shippingCharge: 1,
        paymentMethod: PaymentMethod,
        products: [product],
        cartId: CartID,
      };

      orderArray[index] = order;
      index++;
    });

    SaveOrder(0, orderArray.length - 1, orderArray);
  };

  //to save order
  const SaveOrder = (index, endIndex, ordersArray) => {
    const SuucessUrl = constant.BaseUrl + `api/v1/userapp/order/add`;

    axios
      .post(SuucessUrl, ordersArray[index], { headers })
      .then(async function (values) {
        if (index == endIndex) {
          // stop loading here

          clearUSerCart();
        } else {
          // call the save order again
          index++;
          SaveOrder(index, endIndex, ordersArray);
        }
      })
      .catch((err) => {
        if (err.response.status >= 400) {
          toast.error(err.response.data.msg, {
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

  const clearUSerCart = () => {
    const SuucessUrl = constant.BaseUrl + `api/v1/userapp/cart/product/remove`;

    axios
      .delete(SuucessUrl, { headers })
      .then(async function (values) {
        const InvoiceUrl =
          constant.BaseUrl + `api/v1/userapp/order/send_invoice`;
        let Dates = new Date();
        let d = Dates.getDate();
        let m = Dates.getMonth() + 1;
        let y = Dates.getFullYear();

        let invoice = {
          amount:
            TotalCalculation.total.toFixed(2) -
            TotalCalculation.discount.toFixed(2),
          id: CartID,
          email: profile.emailID,
          date: d + "/" + m + "/" + y,
          name: profile.name,
        };
        // to send invoice
        axios
          .post(InvoiceUrl, invoice, { headers })
          .then(async function (values) {
            history.push(
              `./success?firstname=${profile.name}&txnid=${CartID}&amount=${
                TotalCalculation.total.toFixed(2) -
                TotalCalculation.discount.toFixed(2)
              }&mode=${PaymentMethod}`
            );
          })
          .catch((err) => {
            if (err.response.status >= 400) {
              toast.error(err.response.data.msg, {
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
      })
      .catch((err) => {
        if (err.response.status >= 400) {
          toast.error(err.response.data.msg, {
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
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const showRaozrPay = async () => {
    let dataTosend = {
      FirstName: profile.name,
      cartId: CartID,
      amount:
        TotalCalculation.total.toFixed(2) -
        TotalCalculation.discount.toFixed(2),
    };
    const AllProduct =
      constant.BaseUrl + `api/v1/userapp/payment/payment_history/create`;
    await axios
      .post(AllProduct, dataTosend, { headers })
      .then(async function (values) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          toast.error("Razorpay SDK failed to load. Are you online?", {
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

        // Getting the order details back
        const { amount, id, currency, key } = values.data.data;

        const options = {
          key: key, // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: currency,
          name: "Kisaan Factory order",
          description: "Kisaan Factory order",
          image: { Logo },
          order_id: id,
          handler: async function (transaction, response) {
            let data_to_send = {
              razorpay_payment_id: transaction.razorpay_payment_id,
              razorpay_order_id: transaction.razorpay_order_id,
              razorpay_signature: transaction.razorpay_signature,
              payment_id: values.data.payment._id,
            };

            const SuucessUrl =
              constant.BaseUrl +
              `api/v1/userapp/payment/payment_history/checkstatus`;

            axios
              .post(SuucessUrl, data_to_send, { headers })
              .then(async function (values) {
                PaymentMethod = values.data.payment.payment_status.method;
                CreateOrder();
              })
              .catch((err) => {
                if (err.response.status >= 400) {
                  toast.error(err.response.data.msg, {
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
          },
          prefill: {
            name: profile.name,
            email: profile.emailID,
            contact: profile.mobile,
          },
          notes: {
            address: "Kisaan Factory order",
          },
          theme: {
            color: "#003567",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((err) => {
        if (err.response.status >= 400) {
          toast.error(err.response.data.msg, {
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
  const [TotalCalculation, setTotalCalculation] = useState({});
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
  const getTotalAmount = (Data) => {
    let TotalPrice = 0;
    let TotalDiscount = 0;
    for (let i = 0; i < Data.length; i++) {
      let e = Data[i];
      if (e.item.discount === 0) {
        TotalPrice = TotalPrice + e.quantity * parseFloat(e.item.price);
      } else {
        TotalPrice = TotalPrice + e.quantity * parseFloat(e.item.price);
        TotalDiscount =
          TotalDiscount + (e.quantity * (e.item.discount * e.item.price)) / 100;
      }
    }
    setTotalCalculation({ total: TotalPrice, discount: TotalDiscount });
  };

  const getCheckoutData = async () => {
    let Profile = constant.BaseUrl + `api/v1/userapp/dashboard/view/profile`;
    let Address = constant.BaseUrl + `api/v1/userapp/dashboard/address/all`;
    const CartData = constant.BaseUrl + `api/v1/userapp/cart/view`;

    const Profiledata = axios.get(Profile, { headers });
    const AddressData = axios.get(Address, { headers });
    const OrderData = axios.get(CartData, { headers });

    Promise.all([Profiledata, AddressData, OrderData])
      .then(function (values) {
        getProfile(values[0].data.userData ? values[0].data.userData : {});

        getAddress(values[1].data.address ? values[1].data.address : []);

        if (values[1].data.address) {
          values[1].data.address.map((e, i) => {
            if (e.default == true) {
              setCurrentDefaultAddress(e._id);
            }
          });
        }
        setAllOrder(
          values[2].data.cartItems ? values[2].data.cartItems.cart : []
        );
        setCartID(values[2].data.cartItems ? values[2].data.cartItems._id : "");
        getTotalAmount(
          values[2].data.cartItems ? values[2].data.cartItems.cart : []
        );
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
  //use effect to fetch gift data
  useEffect(() => {
    getCheckoutData();
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
              <div className="uk-width-expand@m uk-width-1-1">
                <div className="uk-grid uk-width-1-1 uk-grid-small">
                  {/* <div>
                    <label htmlFor="online">
                      <input
                        type="radio"
                        className="uk-radio"
                        name="payment_type"
                        value="online"
                        required=""
                        id="online"
                      />
                      Pay Online
                    </label>
                  </div> */}
                  {/* <div>
                    <label htmlFor="cod">
                      <input
                        type="radio"
                        className="uk-radio"
                        name="payment_type"
                        value="cod"
                        required=""
                        id="cod"
                      />
                      <i className="fas fa-money-check-alt"></i> Cash On
                      Delivery
                    </label>
                  </div> */}
                </div>
                <div className="uk-width-1-1">
                  <div className="address">
                    <ul data-uk-accordion="" className="uk-accordion">
                      <li className="uk-open">
                        <a className="uk-accordion-title" aria-expanded="false">
                          <label>
                            <i className="fa fa-gift"></i> Select Address
                          </label>
                        </a>
                        <div className="uk-accordion-content" hidden="">
                          <ul
                            className="uk-subnav mine uk-subnav-pill"
                            data-uk-switcher>
                            <li onClick={() => ChangeActive("SetDefault")}>
                              <a href={null}>Set default Address</a>
                            </li>
                            <li onClick={() => ChangeActive("setAddress")}>
                              <a href={null}>Add New Address</a>
                            </li>
                          </ul>

                          <ul className="uk-switcher uk-margin">
                            <li className={showAddress}>
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
                                      <label
                                        htmlFor={e._id}
                                        className="address">
                                        <h5>{e.house}</h5>
                                        <p>
                                          {e.street} {e.locality} {e.city}
                                          <br /> {e.state} {e.country} {e.zip}
                                        </p>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </li>
                            <li className={showAddAddress}>
                              <div
                                className="uk-grid uk-child-width-1-2 uk-grid-small "
                                id="AddNewAddres">
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

                                <div>
                                  <input
                                    className="uk-input uk-margin-bottom"
                                    autoComplete="off"
                                    type="text"
                                    name="address1"
                                    placeholder="House"
                                    defaultValue=""
                                    onChange={(e) => setHouse(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <input
                                    autoComplete="off"
                                    className="uk-input uk-margin-bottom"
                                    type="text"
                                    name="address2"
                                    placeholder="Street"
                                    defaultValue=""
                                    onChange={(e) => setStreet(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <input
                                    autoComplete="off"
                                    className="uk-input uk-margin-bottom"
                                    type="text"
                                    name="address2"
                                    placeholder="Locality"
                                    defaultValue=""
                                    onChange={(e) =>
                                      setLocality(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <input
                                    autoComplete="off"
                                    className="uk-input uk-margin-bottom"
                                    type="text"
                                    name="address2"
                                    placeholder="City"
                                    defaultValue=""
                                    onChange={(e) => setCity(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <input
                                    autoComplete="off"
                                    className="uk-input uk-margin-bottom"
                                    type="text"
                                    name="address2"
                                    placeholder="State"
                                    defaultValue=""
                                    onChange={(e) => setState(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <input
                                    autoComplete="off"
                                    className="uk-input uk-margin-bottom"
                                    name="pin"
                                    id="pin"
                                    type="number"
                                    placeholder="Pin code"
                                    onChange={(e) => setZipcode(e.target.value)}
                                    defaultValue=""
                                  />
                                </div>
                                <div className="uk-width-1-1">
                                  <input
                                    autoComplete="off"
                                    className="uk-input uk-margin-bottom"
                                    name="pin"
                                    id="pin"
                                    type="text"
                                    placeholder="Country"
                                    onChange={(e) => setCountry(e.target.value)}
                                    defaultValue=""
                                  />
                                </div>
                              </div>
                              <button
                                className="uk-button uk-button-primary"
                                type="button"
                                onClick={SaveAddress}>
                                Add new
                              </button>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-3@m uk-width-1-1">
                <div
                  className="uk-child-width-1-1 uk-padding-remove uk-grid-stack"
                  data-uk-grid>
                  <div className="uk-padding-remove-right">
                    <div className="uk-card uk-card-small uk-card-body uk-background-muted">
                      <table className="uk-table stable uk-table-divider uk-table-small">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product name</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AllOrder.map((e, i) => {
                            TotalPrice = 0;
                            if (e.item.discount === 0) {
                              TotalPrice = parseFloat(e.item.price);
                            } else {
                              let Price =
                                e.item.price -
                                (e.item.discount * e.item.price) / 100;

                              TotalPrice = Price;
                            }
                            return (
                              <tr>
                                <td key={i}>
                                  <img
                                    src={constant.ServerUrl + e.item.images[0]}
                                    alt={e.item.title}
                                    className=""
                                    width="50"
                                    height="50"
                                  />
                                </td>
                                <td>
                                  {_.upperFirst(e.item.title)}{" "}
                                  <strong>× {e.quantity}</strong>
                                </td>
                                <td className="uk-text-right">
                                  {e.quantity * TotalPrice}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <hr />
                      <table className="uk-table dbox uk-table-small uk-table-divider">
                        <tbody>
                          <tr>
                            <td className="uk-width-expand">
                              <h4>Subtotal</h4>
                            </td>
                            <td className="uk-text-right">
                              <ins>{TotalCalculation.total.toFixed(2)}</ins>
                            </td>
                          </tr>
                          <input type="hidden" name="wamntdeduc" value="0" />
                          <tr>
                            <td className="uk-width-expand">
                              <h4>Shipping charge</h4>
                            </td>
                            <td className="uk-text-right">
                              <ins>0.00</ins>
                            </td>
                          </tr>
                          <tr>
                            <td className="uk-width-expand">
                              <h4>Discount</h4>
                            </td>
                            <td className="uk-text-right">
                              <ins>{TotalCalculation.discount.toFixed(2)}</ins>
                            </td>
                          </tr>
                          <tr>
                            <td className="uk-width-expand">
                              <h3>Total</h3>
                            </td>
                            <td className="uk-text-right">
                              <ins>
                                {TotalCalculation.total.toFixed(2) -
                                  TotalCalculation.discount.toFixed(2)}
                              </ins>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="uk-text-center">
                        <button
                          className="uk-button  uk-button-primary uk-width-1-1"
                          type="button"
                          onClick={showRaozrPay}>
                          Proceed to checkout
                        </button>
                        <Link
                          className="uk-button  uk-button-danger uk-width-1-1 mt-2"
                          to={"/"}
                          type="button">
                          back to shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form action="#" method="post">
              <input type="hidden" name="shipChar" value="30" />
              <input type="hidden" name="action" value="newOrders" />
            </form>
          </div>
        </section>
        <Footer />
      </MainLayout>
    );
  }
};

export default Search;
