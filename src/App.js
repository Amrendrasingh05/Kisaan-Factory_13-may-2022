import "./css/bootstrap.min.css";
import "./css/bootstrap.rtl.min.css";
import "./css/bootstrap-grid.min.css";
import "./css/bootstrap-grid.rtl.min.css";
import "./css/bootstrap-reboot.min.css";
import "./css/bootstrap-reboot.rtl.min.css";
import "./css/bootstrap-utilities.min.css";
import "./css/bootstrap-utilities.rtl.min.css";
import "./css/Font.css";
import "./css/uikit-rtl.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./css/uikit.min.css";

import "./App.css";
import "./Custom.css";

import "../node_modules/uikit/dist/js/uikit.js";
import "../node_modules/uikit/dist/js/uikit-icons.js";
import "uikit/dist/css/uikit.min.css";

import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./component/Protected";
//auth
import Home from "./component/home/home.component";
import Login from "./component/Auth/login.component";
import Search from "./component/search/search.component";
import Dashboard from "./component/dashboard/dashboard.component";
import WishList from "./component/dashboard/wishlist.component";

import Cart from "./component/cart/cart.component";
import Checkout from "./component/cart/checkout.component";

import Suucess from "./component/cart/success.component";
import DetailsPAge from "./component/home/productPage.component";

import About from "./component/static/about.component";
import Payment from "./component/static/payment.component";
import terms from "./component/static/terms.component";
import termsc from "./component/static/termsc.component";

import Refundpolicy from "./component/static/refund.component";
import DriverPrivacyPolicy from "./component/static/driver.privacy";

import resetPassword from "./component/Auth/resetpassword";

import ChatBoard from "./component/static/chat";
import Notfound from "./component/NotFound";

import HighQuality from "./component/SupportColumn/HighQuality";
import Pesticide from "./component/SupportColumn/Pesticide";
import FreeShipping from "./component/SupportColumn/FreeShipping";
import Support from "./component/SupportColumn/Support24";

import Apps from "./component/Apps/Apps";



function Logout() {
  localStorage.clear();
  return <Redirect to="/" />;
}
function App() {
  UIkit.use(Icons);

  return (
    <Router>
      <Switch>
        <Route exact path="/chat-board" component={ChatBoard} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/product/:id" component={DetailsPAge} />
        <Route exact path="/about-us" component={About} />
        <Route exact path="/payment-policy" component={Payment} />
        <Route exact path="/privacy-policy" component={terms} />
        <Route
          exact
          path="/driver-privacy-policy"
          component={DriverPrivacyPolicy}
        />

        <Route exact path="/terms-and-conditions" component={termsc} />
        <Route exact path="/refund-policy" component={Refundpolicy} />
        <Route exact path="/reset-password" component={resetPassword} />

        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/wishlist" component={WishList} />

        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/checkout" component={Checkout} />
        <ProtectedRoute path="/success" component={Suucess} />

        <Route exact path="/logout" component={Logout} />

        <Route exact path="/HighQuality" component={HighQuality} />
        <Route exact path="/Pesticide" component={Pesticide} />
        <Route exact path="/FreeShipping" component={FreeShipping} />
        <Route exact path="/Support" component={Support} />

        <Route exact path="/Apps" component={Apps} />


        <Route component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;
