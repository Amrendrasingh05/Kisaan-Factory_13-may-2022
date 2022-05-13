import React, { useEffect, useState } from "react";
import Group from "../../images/Group.png";
import sero from "../../images/0.png";
import shipping from "../../images/shipping.png";
import customersupport from "../../images/customer-support.png";
import { toast } from "react-toastify";

import { Markup } from "interweave";

import Logo from "../../images/logo.png";
import Header from "../common/homeheader.component";
import Footer from "../common/homefooter.component";
import { useHistory } from "react-router";
import constant from "../../constant";
import axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";
import MainLayout from "../layouts/main-layout";
const Home = () => {
  const history = useHistory();
  const [isLoader, setisLoader] = useState(false);
  const [AllBanner, setAllBanner] = useState([]);

  const getBanner = async () => {
    let AllProduct = constant.BaseUrl + `api/v1/adminapp/user/banners`;

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
  function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  }
  const AddToWishList = async (ProductId) => {
    let AllProduct = "";

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
      .then(function (values) {})
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
  const GetPrice = (Data) => {
    if (Data.discount === 0) {
      return (
        <h6>
          Rs. {parseFloat(Data.price)} <del></del>{" "}
        </h6>
      );
    } else {
      let Price = Data.price - (Data.discount * Data.price) / 100;
      return (
        <h6>
          Rs. {parseFloat(Price).toFixed(2)} <del>{Data.price}</del>{" "}
        </h6>
      );
    }
  };
  const [FirstSlider, setFirstSlider] = useState([]);
  const [Product, setProduct] = useState([]);
  const AddToCart = async (Id, Quantity, redirect) => {
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
        toast.success(values.data.msg, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push(redirect);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          if (redirect) {
            toast.error("Please login to buy this item", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("/login");
            return;
          }

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
          if (redirect) {
            toast.error("Please login to buy this item", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("/login");
            return;
          }
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
          if (redirect) {
            toast.error("Please login to buy this item", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("/login");
            return;
          }
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

  const BuyNow = (Id, Quantity) => {
    AddToCart(Id, Quantity, "/checkout");
  };
  const getUSers = async () => {
    let AllProduct = constant.BaseUrl + `api/v1/userapp/product/all`;

    const promise1 = axios.get(AllProduct);

    Promise.all([promise1])
      .then(function (values) {
        if (values[0].data.code === 200) {
          let Shuffles = shuffle(values[0].data.products);

          setFirstSlider(Shuffles);
          setProduct(shuffle(Shuffles));
          setisLoader(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //use effect to fetch gift data
  useEffect(() => {
    getUSers();
    getBanner();
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
        <section className="py-5">
          <div className="uk-container">
            <div className="row">
              <div className="col-sm-3 col-12 justify-content-center d-flex">
              <a href="/HighQuality" target="" rel="noopener noreferrer">
                <div className="card-1 d-flex align-items-center high-quality">
                  <div className="HQ">
                    <img className="HQI" alt="" src={Group}/>
                  </div>
                  <span className="HQT">
                    <h3 className="HH3" style={{color: "#115799"}}>High Quality</h3>
                    <h6 className="HH6" style={{color: "#1f7ed1"}}>Harvested with Love</h6>
                  </span>
                </div>
                </a>
              </div>
              

              
              <div className="col-sm-3 col-12 justify-content-center d-flex">
              <a href="/Pesticide" target="" rel="noopener noreferrer">
                <div className="card-1 d-flex align-items-center high-quality">
                  <div className="PS">
                    <img className="PSI" alt="" src={sero} />
                  </div>
                  <span>
                    <h3 style={{color: "#115799"}}>Pesticide Protection</h3>
                    <h6 style={{color: "#1f7ed1"}}>Checked Marked</h6>
                  </span>
                </div>
                </a>
              </div>
              

              
              <div className="col-sm-3 col-12 justify-content-center d-flex">
              <a href="FreeShipping" target="" rel="noopener noreferrer">
                <div className="card-1 d-flex align-items-center high-quality">
                  <div className="SH">
                    <img className="SHI" alt="" src={shipping} />
                  </div>
                  <span>
                    <h3 style={{color: "#115799"}}>Free Shipping</h3>
                    <h6 style={{color: "#1f7ed1"}}>Order Above 150 INR</h6>
                  </span>
                </div>
                </a>
              </div>
              

              
              <div className="col-sm-3 col-12 justify-content-center d-flex">
              <a href="Support" target="" rel="noopener noreferrer">
                <div className="card-1 d-flex align-items-center high-quality">
                  <div className="CS">
                    <img className="CSI" alt="" src={customersupport} />
                  </div>
                  <span>
                    <h3 style={{color: "#115799"}}>24/7 Support</h3>
                    <h6 style={{color: "#1f7ed1"}}>Dedicated Support</h6>
                  </span>
                </div>
                </a>
              </div>
              

            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="uk-container uk-container-expand">
            <h2 className="heading text-center mb-4">OUR PRODUCTS</h2>

            <div
              className="uk-child-width-1-4@m uk-child-width-1-1 uk-grid-small"
              data-uk-grid>
              {Product.map((e, i) => {
                if (i <= 7) {
                  return (
                    <div className="" key={i}>
                      <div className="prdcts">
                        <figure>
                          <img src={constant.ServerUrl + e.images[0]} alt="" />
                          {e.discount != 0 ? (
                            <div className="tag discount">-{e.discount}%</div>
                          ) : (
                            ""
                          )}
                          <div className="p-action">
                            <a href={null} onClick={() => AddToCart(e._id, 1)}>
                              Add to Cart
                            </a>
                            <a
                              href={null}
                              style={{ marginTop: "5px" }}
                              onClick={() => BuyNow(e._id, 1)}>
                              Buy Now
                            </a>
                            <div className="d-flex">
                              <a
                                href={null}
                                onClick={() => AddToWishList(e._id)}>
                                <i className="fa fa-heart-o"></i> Like
                              </a>
                              <a href={null}>
                                <i className="fa fa-share"></i> Share
                              </a>

                              <a href={`/product/` + e._id}>
                                <i className="fa fa-eye"></i> View
                              </a>
                            </div>
                          </div>
                        </figure>
                        <article>
                          <h3>{_.upperFirst(e.title)}</h3>
                          <p>
                            <Markup
                              content={e.description
                                .replace(/<\/?[^>]+(>|$)/g, "")
                                .slice(0, 25)}
                            />
                          </p>
                          {GetPrice(e)}
                        </article>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <button className="btn btn-default mx-auto d-block mt-5">
              <Link to={"/search"}> Show More </Link>
            </button>
          </div>
        </section>

        <section className="py-5 bg-infotek">
          <div className="uk-container uk-container-expand">
            <div className="row">
              <div className="col-sm-4 col-12 d-flex align-items-center">
                <div className="left">
                  <h3>
                    50+ New Products <br />
                    Added Everyday
                  </h3>
                  <p>
                    With the new products popping up, we have decided <br /> to
                    freshen up the list with new products to sell in 2021!
                  </p>
                  <button className="btn btn-primary">
                    <Link to={"/search"}>Explore More</Link>
                  </button>
                </div>
              </div>
              <div className="col-sm-8 col-12">
                <div
                  className="uk-position-relative uk-visible-toggle uk-light"
                  tabIndex="-1"
                  uk-slider="center: false">
                  <ul className="uk-slider-items cslider uk-grid-small" uk-grid>
                    {FirstSlider.map((e, i) => {
                      if (i <= 5) {
                        return (
                          <li className="uk-width-3-4@m uk-width-1-1" key={i}>
                            <div className="uk-panel">
                              <img
                                src={constant.ServerUrl + e.images[0]}
                                alt=""
                              />
                              <div className="mdesc uk-position-bottom-left uk-padding uk-panel">
                                <div className="desc">
                                  <h3>{_.upperFirst(e.title)}</h3>
                                  <p>
                                    <Markup
                                      content={e.description
                                        .replace(/<\/?[^>]+(>|$)/g, "")
                                        .slice(0, 25)}
                                    />
                                  </p>
                                  <h6>Rs. {e.price}</h6>
                                  <Link
                                    data-uk-icon="arrow-right"
                                    to={`/product/` + e._id}></Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      }
                    })}
                  </ul>

                  <a
                    className="uk-position-center-left uk-position-small uk-hidden-hover@m"
                    href="/"
                    data-uk-slidenav-previous
                    uk-slider-item="previous"></a>
                  <a
                    className="uk-position-center-right uk-position-small uk-hidden-hover@m"
                    href="/"
                    data-uk-slidenav-next
                    uk-slider-item="next"></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="uk-container uk-container-expand">
            <p className="subhead text-center">Share your setup with</p>
            <h2 className="heading text-center">#Kisaanfactory</h2>
          </div>
          <div className="mygrid mt-4">
            <div className="box">
             <a href="http://localhost:3000/search?search=vegetable">
               <img
                src={AllBanner.length > 0 ? AllBanner[0].images[0] : ""}
                alt=""
              />
              </a> 

              <img
                src={AllBanner.length > 0 ? AllBanner[1].images[0] : ""}
                alt=""
              />
            </div>
            <div className="box">
              <img
                src={AllBanner.length > 0 ? AllBanner[2].images[0] : ""}
                alt=""
              />
              <img
                src={AllBanner.length > 0 ? AllBanner[3].images[0] : ""}
                alt=""
              />
            </div>
            <div className="box">
              <img
                src={AllBanner.length > 0 ? AllBanner[4].images[0] : ""}
                alt=""
              />
            </div>
            <div className="box">
              <img
                src={AllBanner.length > 0 ? AllBanner[5].images[0] : ""}
                alt=""
              />
              <img
                src={AllBanner.length > 0 ? AllBanner[6].images[0] : ""}
                alt=""
              />
            </div>
            <div className="box">
              <img
                src={AllBanner.length > 0 ? AllBanner[7].images[0] : ""}
                alt=""
              />
              <img
                src={AllBanner.length > 0 ? AllBanner[8].images[0] : ""}
                alt=""
              />
            </div>
          </div>
        </section>
        <Footer />
      </MainLayout>
    );
  }
};

export default Home;
