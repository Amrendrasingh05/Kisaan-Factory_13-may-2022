import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
} from "@mui/material";

import Group from "../../images/Group.png";
import sero from "../../images/0.png";
import shipping from "../../images/shipping.png";
import customersupport from "../../images/customer-support.png";

import React from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const options = [
  {
    label: "My Account",
    icon: "fa fa-user-circle-o",
  },

  {
    label: "My Orders",
    icon: "fa fa-coffee",
  },
  {
    label: "My Cart",
    icon: "fa fa-shopping-cart",
  },
  {
    label: "Notification",
    icon: "fa fa-bell",
  },
];

const SideNavbar = ({ handleClose, window, open, footerComponent }) => {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={"Hello User"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {options.map((item, index) => (
          <ListItem button key={item.label}>
            <ListItemIcon>
              <i className={item.icon}></i>
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <div className="col">
        <div className="col-sm-12 col-12 justify-content-center d-flex">
          <div className="card-1 d-flex align-items-center high-quality">
            <div>
              <img alt="" src={Group} />
            </div>
            <span>
              <h3>High Quality</h3>
              <h6>Harvested with Love</h6>
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-12 justify-content-center d-flex">
          <div className="card-1 d-flex align-items-center high-quality">
            <div>
              <img alt="" src={sero} />
            </div>
            <span>
              <h3>Pesticide Protection</h3>
              <h6>Checked Marked</h6>
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-12 justify-content-center d-flex">
          <div className="card-1 d-flex align-items-center high-quality">
            <div>
              <img alt="" src={shipping} />
            </div>
            <span>
              <h3>Free Shipping</h3>
              <h6>Order Above 150 INR</h6>
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-12 justify-content-center d-flex">
          <div className="card-1 d-flex align-items-center high-quality">
            <div>
              <img alt="" src={customersupport} />
            </div>
            <span>
              <h3>24/7 Support</h3>
              <h6>Dedicated Support</h6>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={handleClose}
      anchor="right"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          backgroundColor: "#ffffff",
        },
      }}>
      {drawer}
    </Drawer>
  );
};

export default SideNavbar;
