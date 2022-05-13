import React, { useEffect, useState } from "react";
import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import constant from "../../constant";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../../images/logo.png";
import { useParams, Redirect } from "react-router-dom";
import { Markup } from "interweave";
import MainLayout from "../layouts/main-layout";
import _ from "lodash";
const Search = () => {
  const [isLoader, setisLoader] = useState(false);
  const [Detail, setDetail] = useState({});
  const [newProduct, setnewProduct] = useState([]);

  let { id } = useParams();

  if (id == undefined || id == null || id == "") {
    <Redirect to="/" />;
  }
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
  const AddToCart = async (Id, Quantity) => {
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
  const getUSers = async () => {
    let AllProduct = constant.BaseUrl + `api/v1/userapp/product/${id}`;
    let newsProduct = constant.BaseUrl + `api/v1/userapp/product/new-products`;
    const promise1 = axios.get(AllProduct);
    const promise2 = axios.get(newsProduct);

    Promise.all([promise1, promise2])
      .then(function (values) {
        if (values[0].data.code === 200) {
          setDetail(
            values[0].data.productDetails ? values[0].data.productDetails : {}
          );
          setnewProduct(
            values[1].data.products.length > 0 ? values[1].data.products : []
          );

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

        <section className="uk-section-small">
          <div className="uk-container">
            <div
              className="uk-child-width-1-1 uk-child-width-1-2@m uk-grid"
              data-uk-grid="">
              <div className="uk-first-column">
                <div className="img-single uk-flex">
                  <ul
                    className="uk-subnav mob-v uk-subnav-pill uk-flex-column"
                    uk-switcher="animation: uk-animation-fade;">
                    {Detail.images.map((e, i) => {
                      return (
                        <li className="uk-active" key={i}>
                          <a aria-expanded="true" href={null}>
                            <img
                              src={constant.ServerUrl + e}
                              alt=""
                              data-uk-img=""
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul
                    className="uk-switcher uk-margin-remove-top img-mar"
                    style={{ touchAction: "pan-y pinch-zoom" }}>
                    {Detail.images.map((e, i) => {
                      return (
                        <li className="uk-active" key={i}>
                          <img
                            src={constant.ServerUrl + e}
                            alt=""
                            data-uk-img=""
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="description">
                <h2>{_.upperFirst(Detail.title)}</h2>
                <div className="uk-grid uk-grid-stack" data-uk-grid="">
                  <p className="per-kg uk-first-column">
                    <i className="fa fa-rupee"></i>
                    {(
                      Detail.price -
                      (Detail.price * Detail.discount) / 100
                    ).toFixed(2)}
                    <del>
                      <Markup
                        content={
                          Detail.discount > 0
                            ? " <i className='fa fa-rupee'></i> " + Detail.price
                            : ""
                        }
                      />
                    </del>
                    / {Detail.weight[0].split(" ")}
                  </p>
                </div>
                <p className="det">
                  <strong>Type:</strong>
                  {Detail.type}
                </p>
                <p className="det">
                  <strong>weight:</strong>
                  {Detail.weight[0]}
                </p>
                <p className="det">
                  <strong>Availability:</strong>
                  {Detail.inStock > 0 ? "In Stock" : "Out of stock"}
                </p>
                <p className="det my-3">
                  <strong className="uk-width-1-1" style={{ width: "auto" }}>
                    Product Details
                  </strong>
                </p>
                <p>
                  <Markup content={Detail.description} />
                </p>
                <button
                  className="uk-button uk-button-primary uk-margin-top uk-margin-right "
                  onClick={() => AddToCart(Detail._id, 1)}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="uk-section">
          <div className="uk-container uk-container-expand">
            <h2 className="heading uk-text-center mb-5">
              Recent Viewed Products
            </h2>
            <div
              className="uk-position-relative uk-visible-toggle uk-light"
              tabIndex="-1"
              data-uk-slider="autoplay:true">
              <ul
                className="uk-slider-items uk-child-width-1-4@m uk-child-width-1-1 uk-grid-small uk-grid"
                data-uk-grid="">
                {newProduct.map((e, i) => {
                  return (
                    <li className="uk-first-column" key={i}>
                      <div className="prdcts">
                        <figure>
                          <img alt="" src={constant.ServerUrl + e.images[0]} />
                          {e.discount > 0 ? (
                            <div className="tag discount"> {e.discount}</div>
                          ) : (
                            ""
                          )}
                          <div className="p-action">
                            <a href={null} onClick={() => AddToCart(e._id, 1)}>
                              Add to Cart
                            </a>
                            <div className="d-flex">
                              <a href={null}>
                                <i className="fa fa-heart-o"></i>
                                Like
                              </a>
                              <a href={null}>
                                <i className="fa fa-share"></i>
                                Share
                              </a>
                            </div>
                          </div>
                        </figure>
                        <article>
                          <h3>{_.upperFirst(e.title)}</h3>
                          <p>
                            {e.description
                              .replace(/<\/?[^>]+(>|$)/g, "")
                              .slice(0, 25)}
                          </p>
                          {GetPrice(e)}
                        </article>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <a
                className="uk-position-center-left uk-position-small uk-hidden-hover"
                href={null}
                data-uk-slidenav-previous=""
                uk-slider-item="previous"></a>
              <a
                className="uk-position-center-right uk-position-small uk-hidden-hover"
                href={null}
                data-uk-slidenav-next=""
                uk-slider-item="next"></a>
            </div>
          </div>
        </section>
        <Footer />
      </MainLayout>
    );
  }
};

export default Search;
