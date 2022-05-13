import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router";

import fivstars from "../../images/5_stars.svg";
import fourstars from "../../images/4_stars.svg";
import threestars from "../../images/3_stars.svg";
import twostars from "../../images/2_stars.svg";
import onestars from "../../images/1_star.svg";
import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import constant from "../../constant";
import axios from "axios";
import { Markup } from "interweave";
import useInfiniteScroll from "react-infinite-scroll-hook";

import _ from "lodash";
import { toast } from "react-toastify";
import Logo from "../../images/logo.png";
import Slider from "@mui/material/Slider";
import { Box, CircularProgress, Typography } from "@mui/material";
import MainLayout from "../layouts/main-layout";
const PTypess = [
  {
    value: "product",
    label: "Product",
  },
  {
    value: "service",
    label: "Service",
  },
];
const RatingDrop = [
  {
    img: fivstars,
    value: 5,
  },
  {
    img: fourstars,
    value: 4,
  },
  {
    img: threestars,
    value: 3,
  },
  {
    img: twostars,
    value: 2,
  },
  {
    img: onestars,
    value: 1,
  },
];
const Search = () => {
  const [isLoader, setisLoader] = useState(false);

  const loaderRef = useRef();

  const history = useHistory();

  const GetPrice = (Data) => {
    if (Data.discount === 0) {
      return (
        <h6>
          Rs. {parseFloat(Data.price)} <del></del>
        </h6>
      );
    } else {
      let Price = Data.price - (Data.discount * Data.price) / 100;
      return (
        <h6>
          Rs. {parseFloat(Price).toFixed(2)} <del>{Data.price}</del>
        </h6>
      );
    }
  };
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

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const SearchKey = params.get("search");
  const [Offset, setOffset] = useState(0);
  const [Product, setProduct] = useState([]);
  const [price, setPrice] = useState([0, 50000]);
  const [discount, setDiscount] = useState([0, 100]);
  const [cateogry, setcateogry] = useState([]);
  const [Rating, setRating] = useState([]);
  // const [Experience,setExperience] = useState({});
  const [Categories, setCategories] = useState([]);
  const [pType, setpType] = useState([]);
  useEffect(() => {
    getUSers(0);
  }, [price, discount, Rating, Categories, pType]);

  const handleRating = (event) => {
    if (event.target.checked) {
      setRating([...Rating, event.target.value]);
    } else {
      setRating(
        Rating.filter((e) => {
          return e != event.target.value;
        })
      );
    }
  };

  const handleCategory = (event) => {
    if (event.target.checked) {
      setCategories([...Categories, event.target.value]);
    } else {
      setCategories(
        Categories.filter((e) => {
          return e != event.target.value;
        })
      );
    }
  };

  const handleType = (event) => {
    if (event.target.checked) {
      setpType([...pType, event.target.value]);
    } else {
      setpType(
        pType.filter((e) => {
          return e != event.target.value;
        })
      );
    }
  };

  const minDistance = 10;

  const handleDiscount = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setDiscount([clamped, clamped + minDistance]);
        setOffset(0);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setDiscount([clamped - minDistance, clamped]);
        setOffset(0);
      }
    } else {
      setDiscount(newValue);
    }

    setOffset(0);
    setProduct([]);
  };

  const handlePrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 50000 - minDistance);
        setPrice([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPrice([clamped - minDistance, clamped]);
      }
    } else {
      setPrice(newValue);
    }
    setOffset(0);
    setProduct([]);
  };

  function valuediscount(value) {
    return `${value}`;
  }

  function valuePrice(value) {
    return `${value}`;
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
  let AllProduct;
  const getUSers = async (type) => {
    let token = localStorage.getItem("auth-token");
    const headers = {
      "auth-token": token,
      "Content-Type": "application/json",
    };

    let RatingArr = "";
    let pTypeArr = "";
    let CategoriesArr = "";

    if (Rating.length > 0) {
      RatingArr = Rating;
    }

    if (Categories.length > 0) {
      CategoriesArr = Categories;
    }
    if (pType.length > 0) {
      pTypeArr = pType;
    }

    AllProduct =
      constant.BaseUrl +
      `api/v1/userapp/product/search/product?offset=${Offset}&productName=${SearchKey}&discount_start=${
        discount[0]
      }&discount_end=${discount[1]}&price_start=${price[0]}&price_end=${
        price[1]
      }&productType=${pTypeArr.toString()}&rating=${RatingArr.toString()}&categoryId=${CategoriesArr.toString()}`;
    let Cateogry = constant.BaseUrl + `api/v1/adminapp/product/category/all`;
    const promise1 = axios.get(AllProduct);
    const promise2 = axios.get(Cateogry, { headers });

    Promise.all([promise1, promise2])
      .then(function (values) {
        if (values[0].data.code === 200) {
          if (values[0].data.productDetails) {
            if (type == 1) {
              setOffset(
                Offset + parseInt(values[0].data.productDetails.length)
              );
              setProduct([...Product, ...values[0].data.productDetails]);
              setcateogry(values[1].data.data);
            } else {
              setOffset(parseInt(values[0].data.productDetails.length));
              setProduct(values[0].data.productDetails);
              setcateogry(values[1].data.data);
            }
          } else {
            toast.error("No More Product, please change your filter", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

          setisLoader(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [sentryRef] = useInfiniteScroll({
    loading: !isLoader,
    hasNextPage: true,
    onLoadMore: () => getUSers(1),
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: false,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: "0px 0px 400px 0px",
  });

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
            <div data-uk-grid="true">
              <div className="uk-width-1-4@m uk-width-1-1 sticky-side-filter">
                <section className="light-bg">
                  <h4>Discount Range</h4>
                  <div className="price-range-slider">
                    <Slider
                      getAriaLabel={() => "Minimum distance shift"}
                      value={discount}
                      onChange={handleDiscount}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuediscount}
                      disableSwap
                      max={100}
                      min={0}
                    />
                  </div>

                  <h4>Product Rating</h4>

                  <div className="uk-flex uk-flex-column">
                    {RatingDrop.map((e, i) => {
                      return (
                        <label className="filter_checkbox" key={i}>
                          <input
                            type="checkbox"
                            className="uk-checkbox"
                            name=""
                            onChange={handleRating}
                            value={e.value}
                            id={e.value}
                            autoComplete="off"
                          />
                          <img src={e.img} alt="" />
                        </label>
                      );
                    })}
                  </div>

                  <h4 className="uk-margin-top">Price Range</h4>

                  <div className="price-range-slider">
                    <Slider
                      getAriaLabel={() => "Minimum distance shift"}
                      value={price}
                      onChange={handlePrice}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuePrice}
                      disableSwap
                      max={50000}
                      min={0}
                    />
                  </div>

                  {/* <h4>Experience</h4>

                  <div className="uk-flex uk-flex-column">
                    <label className="filter_checkbox">
                      <input
                        type="checkbox"
                        className="uk-checkbox"
                        name=""
                        onChange={handleExperience}
                        id="1_year"
                        value="1"
                        autoComplete="off"
                      />
                      <p>1 Year Experience</p>
                    </label>

                    <label className="filter_checkbox">
                      <input
                        type="checkbox"
                        className="uk-checkbox"
                        name=""
                        onChange={handleExperience}
                        id="2_year"
                        value="2"
                        autoComplete="off"
                      />
                      <p>2 Year Experience</p>
                    </label>

                    <label className="filter_checkbox">
                      <input
                        type="checkbox"
                        className="uk-checkbox"
                        name=""
                        id="3_year"
                        onChange={handleExperience}
                        value="3"
                        autoComplete="off"
                      />
                      <p>3 Year Experience</p>
                    </label>
                  </div> */}

                  <h4>Category</h4>

                  <div
                    className="uk-flex uk-flex-column"
                    style={{
                      maxHeight: "30vh",
                      overflowY: "scroll",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}>
                    {cateogry.map((e, i) => {
                      return (
                        <label key={i} className="filter_checkbox">
                          <input
                            type="checkbox"
                            className="uk-checkbox"
                            name=""
                            onChange={handleCategory}
                            id={e._id}
                            value={e._id}
                            autoComplete="off"
                          />
                          <p>{e.name}</p>
                        </label>
                      );
                    })}
                  </div>

                  <h4 className="uk-margin-top">Product/Service</h4>

                  <div className="uk-flex uk-flex-column">
                    {PTypess.map((e, i) => {
                      return (
                        <label className="filter_checkbox" key={i}>
                          <input
                            type="checkbox"
                            name="Type"
                            id={e.value}
                            value={e.value}
                            className="uk-checkbox"
                            autoComplete="off"
                            onChange={handleType}
                          />
                          <p>{e.label}</p>
                        </label>
                      );
                    })}
                  </div>
                </section>

                <img src="images/Group 134.png" alt="" />
              </div>
              <div className="uk-width-expand@m uk-width-1-1 overflow-auto">
                <h2 className="innheader uk-margin-bottom">
                  {SearchKey ? "Results for:" + SearchKey : ""}
                </h2>

                <div
                  className="uk-child-width-1-3@m uk-child-width-1-1 uk-grid-small"
                  data-uk-grid="true">
                  {Product.map((e, i) => {
                    return (
                      <div className="" key={i}>
                        <div className="prdcts">
                          <figure>
                            <img
                              src={constant.ServerUrl + e.images[0]}
                              alt=""
                            />
                            {e.discount !== 0 ? (
                              <div className="tag discount">-{e.discount}%</div>
                            ) : (
                              ""
                            )}
                            <div className="p-action">
                              <a
                                href={null}
                                onClick={() => AddToCart(e._id, 1)}>
                                Add to Cart
                              </a>
                              <a
                                style={{ marginTop: "5px" }}
                                href={null}
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
                  })}
                  {isLoader && (
                    <div style={{ width: "100%" }} ref={sentryRef}>
                      <Box
                        sx={{
                          minWidth: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}>
                        <CircularProgress />
                        <Typography
                          variant="h5"
                          color="primary"
                          sx={{ marginX: 2 }}>
                          Loading Products...
                        </Typography>
                      </Box>
                    </div>
                  )}
                </div>

                {/*<button
                  className={`btn btn-default mx-auto d-block mt-5 ${
                    Product.length === 0 ? "HideClass" : ""
                  }`}
                  onClick={() => {
                    getUSers(1);
                  }}>
                  Load More
                </button>*/}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </MainLayout>
    );
  }
};

export default Search;
