import React from "react";

import Header from "../common/header.component";
import Footer from "../common/homefooter.component";
import ImdateData from "../../images/photo-1628530246501.jpg";
import MainLayout from "../layouts/main-layout";

const Dashboard = () => {
  return (
    <MainLayout>
      <Header />
      <section class="uk-section">
        <div class="uk-container">
          <div data-uk-grid>
            <div class="uk-width-expand@m uk-width-1-1">
              <h2 class="innheader">Privacy policy</h2>
              <p>
                <b>Thanks for having Kisaan and Factory to use (Driver App).</b>
              </p>
              <p>
                Kisaan and Factory Driver are majorly owned by the AIM PLATFORM,
                which delivers perishables only in Punjab and non-perishables
                throughout India. Kisaan and Factory aims to do it all to secure
                our clients' faith, and our devotion to your data protection
                wins hands down. We owe it to consumers to shield their digital
                security. This privacy statement describes the personal data we
                acquire from online users. Please know that Kisaan and Factory
                do it all ways to secure the privacy of visitors who use our
                applications to access our services.
              </p>
              <p>
                <b>Consent</b>
              </p>
              <p>
                You accept the terms of this policy by using this application.
                You consent to the use, collection, and disclaimer of your
                personal data anytime you sign up details through this app
              </p>
              <p>
                <b>Giving of personal data</b>
              </p>
              <p>
                You must provide your phone number, name, address details, and
                reviews in order to enter with our platform. Some services will
                disclose private data such as drivers and vendors. When you use
                apps or websites, we can automatically receive certain
                information, such as your IP address, device location, network
                carrier, and so on. This details may be used to uphold, perform,
                handle, and receive your order. If you want to disable the
                device's automated data access, you can change your phone's
                settings. To learn more about withdrawal, you can also contact a
                phone service operator.
              </p>
              <p>
                <b>Sensitive data</b>
              </p>
              <p>
                Kisaan and Factory will not be using or acquire sensitive data
                unless you seek permission. We know how valuable privacy is to
                consumers of our services.
              </p>
              <p>
                Kisaan and Factory will act to ensure that the personal data
                collected is accurate and complete in accordance with our
                standards. You can modify your data whenever you want. We will
                safeguard the information against leakage, illegal access,
                mishandling, or publication.
              </p>

              <p>
                <b>Changes to our privacy policy</b>
              </p>
              <p>
                If we make any adjustments, we will publish the latest update
                here, so please check back frequently for an up-to-date copy of
                our policy.
              </p>

              <p>
                <b>How to Contact Us</b>
              </p>
              <p>
                If you have any concerns about the Kissan or Factory Privacy
                policies, please contact us at:
              </p>

              <p>
                Email:{" "}
                <a href="email:Support@kisaanandfactory.com">
                  Support@kisaanandfactory.com
                </a>
              </p>
              <p>Or visit to us at this address:</p>

              <p>Urban Estate Phase 1,</p>
              <p>Patiala Punjab,</p>
              <p>147002 India</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </MainLayout>
  );
};

export default Dashboard;
