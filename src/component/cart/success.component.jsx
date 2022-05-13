import React from "react";

import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import Tick from "../../images/tick.svg";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../images/logo.png";
import MainLayout from "../layouts/main-layout";
const Search = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();

  return (
    <MainLayout>
      <Header />
      <section className="uk-section">
        <div className="uk-container">
          <div className="uk-flex-center" data-uk-grid>
            <div className="uk-width-1-3@m uk-width-1-1 uk-text-center mh">
              <img
                src={Tick}
                alt=""
                style={{ width: "60px", marginBottom: "22px" }}
              />
              <h2 className="innheader uk-margin-bottom">Thank You !</h2>
              <p>Thank you! your order has been placed successfully</p>
              <p>
                Order ID :-<span>{query.get("txnid")}</span>
              </p>
              <p>
                Amount :-<span>{query.get("amount")}</span>
              </p>
              <p>
                Mode :-<span>{query.get("mode")}</span>
              </p>

              <button className="uk-button uk-button-primary uk-border-rounded uk-margin-top">
                <Link to="/" className="HrefTextColor">
                  Back to Home
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
};

export default Search;
