import React from "react";

import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import MainLayout from "../layouts/main-layout";

const Dashboard = () => {
  return (
    <MainLayout>
      <Header />
      <section class="uk-section">
        <div class="uk-container">
          <div data-uk-grid>
            <div class="uk-width-expand@m uk-width-1-1">
              <h2 class="innheader">About us</h2>
              <p>
                Our major goal as one of India's leading and most trusted
                enterprises is to serve people with goods and services that make
                their lives simpler and more convenient. Kisaan And Factory is a
                comprehensive e-commerce platform that allows you to shop for
                any goods or service from the comfort of your own home. We
                believe that good economic circumstances in the countryside will
                lead to economic prosperity in cities. We offer high-quality
                items at reasonable rates to thrive, which is why we want to be
                able to customize products and send them anywhere in India.
              </p>

              <p>
                As one of India's top and most trusted businesses, our primary
                mission is to provide goods and services that make people's
                lives quicker and easier. Kisaan And Factory is a complete
                e-commerce framework that helps you to shop from the comfort of
                your own home for any goods or services. As per Kisaan And
                Factory, good economic conditions in the countryside would lead
                to economic development in cities. To prosper, we need to be
                able to provide high-quality things at low prices, which is why
                we want to be able to customize products and ship them anywhere
                in India. We offer the consumers with lowest price products.
              </p>
            </div>
          </div>
          <br></br>
          <h2 class="innheader">OUR MISSION - </h2>
          <p>
            {" "}
            We help farmers, small manufacturers and handicraft to grow
            digitally and earn money. AIM PLATFARM’s Kisaan And Factory is a
            one-of-a-kind project to empower and support India's small-scale
            manufacturing industry and farmers. True narratives about actual
            things that you enjoy, inspired by India's farmers and producers,
            will be told at Kisaan And Factory. The Kisaan And Factory will
            enhance the efficiency and profitability of skilled workers,
            farmers, and small industries.{" "}
          </p>
          <p>
            We also help in connecting the youth by utilizing the classified job
            platforms in remote villages and cities in India. This will provide
            the youth an opportunity to earn more. We also offer them the chance
            to work as our delivery partners and marketers. Our mission is to
            link the financial industry and to assist farmers in connecting with
            customers by assisting them in selling more of their products
            directly from the source. We want to be able to assist our farmers
            in getting the most out of their hard work.{" "}
          </p>
          <p>
            The Kisaan And Factory e-commerce network was created to make it
            easy for you to locate everything you need in one place. Expand your
            digital company the Kisaan And Factory way with a simple integrated
            payment gateway and user-friendly Android/IOS apps. From computers
            and cameras to rice and tractors, you'll always find what you're
            searching for at excellent rates in our vast product variety.{" "}
          </p>
          <p>
            There is significant news for farmers who wish to sell fresh
            veggies, fruits, and goods to the city as well as people living near
            your village. These products are in high demand in city markets and
            online grocery shopping. We've also launched our own online food
            purchasing platform, so it's great news for both parties.{" "}
          </p>
          <p>
            We focus on the growth of the farmers primarily with our unique
            initiative. True stories about actual things that you enjoy,
            inspired by India's farmers and manufacturers, will be shared at
            Kisaan Factory. The Kisaan Factory will increase the efficiency and
            productivity of skilled workers, farmers, and small industries.{" "}
          </p>
          <p>
            <b>What Categories Do We Focus On -</b> Apart from perishable
            products, we offer a wide range of products in different categories
            like Grocery, Fashion, Home Furnishings, Mobiles and Tablets,
            Electronics, Books, Sports, Footwear, Toys, Baby Products etc.
          </p>
          <br></br>
          <h2 class="innheader">WHY US?</h2>
          <ul>
            <li>We provide fresh quality foods directly from the source</li>
            <li> We focus on quality and offer non Gmo food products</li>
            <li>
              {" "}
              We will offer Home made products and will help you to make
              products at home.
            </li>
            <li>High technology and professional approach.</li>
            <li> We empower women and skilled workers in farming</li>
            <li> Consistent Quality Checks</li>
            <li> Help kids and women to become self independent</li>
            <li> Empower local traders and manufacturers</li>
            <li> Help farmers to become self independent</li>
          </ul>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
};

export default Dashboard;
