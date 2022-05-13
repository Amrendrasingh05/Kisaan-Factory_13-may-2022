import React, { useState,useEffect } from "react";
import axios from "axios";
import logo from "../../images/logo.png";
import { toast } from 'react-toastify';
import constant from '../../constant';
import { Link } from "react-router-dom";
import _ from "lodash";
const Cart = (props) => {
  const [CartItem,setCartItem] = useState({children:[],amount:{}});
    const [isLoad,setIsload] = useState(false);
    const ChangeQuantity = (ProductId,Type,PresentQuantity)=>{
        let AllProduct="";
        let QuantityData = {};
        let token = localStorage.getItem('auth-token')
        if(Type=='increase'){
            QuantityData = { quantity: parseInt(PresentQuantity)+1 };
            AllProduct =
            constant.BaseUrl + `api/v1/userapp/cart/product/add/quantity/${ProductId}`;
        }else{
          if(PresentQuantity==1){
            toast.error('Quantity not less than 1', {
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
            QuantityData = { quantity: parseInt(PresentQuantity)-1 };
            AllProduct =
            constant.BaseUrl + `api/v1/userapp/cart/product/remove/quantity/${ProductId}`;
        }
         
        const headers = { 
          'auth-token': token, 
        'Content-Type': 'application/json'
      };
        axios
          .put(AllProduct,QuantityData, {headers})
          .then(function (values) {
            let Prodyct = values.data.updatedCart.cart.find((e,i)=>{
              return e.item ==ProductId
            });
            let NewProdycts = [];
            for(var j=0;j<CartItem.children.length;j++){
                var Data = CartItem.children[j];
              
               if(Data.item._id==Prodyct.item){
                Data.quantity = Prodyct.quantity
               }
               NewProdycts.push(Data);  
            }
      let TotalPrice = 0;
      let TotalDiscount = 0;
      for (let i = 0; i <NewProdycts.length; i++) {
        let e = NewProdycts[i];
        if (e.item.discount === 0) {
          TotalPrice = TotalPrice + (e.quantity)*parseFloat(e.item.price);
        } else {
          let Price = e.item.price - (e.item.discount * e.item.price) / 100;
          TotalPrice = TotalPrice + (e.quantity)*parseFloat(Price);
          TotalDiscount = TotalDiscount + (e.quantity)*(e.item.discount * e.item.price) / 100;
        }
      }
      setIsload(true);
      setCartItem({children:NewProdycts,amount:{total:TotalPrice,discount:TotalDiscount}})
          })
          .catch((err) => {
            if(err.response.status==401){
              toast.error('Please login to add to cart', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            }else{
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
    }
    const GetPrice = (Data) => {
        if (Data.item.discount === 0) {
         
          return (
            <h4 className="price">
              Rs. {((Data.quantity)*parseFloat(Data.item.price)).toFixed(2)} <del></del>
            </h4>
          );
        } else {
          let Price = Data.item.price - (Data.item.discount * Data.item.price) / 100;
         
          return (
            <h4 className="price">
              Rs. {((Data.quantity)*parseFloat(Price)).toFixed(2)} <del>{Data.item.price.toFixed(2)}</del>
            </h4>
          );
        }
      };
    const RemoveFromCart = (ProductId)=>{
      let AllProduct="";
     
      let token = localStorage.getItem('auth-token')
      AllProduct =
          constant.BaseUrl + `api/v1/userapp/cart/product/remove/${ProductId}`;
      
       
      const headers = { 
        'auth-token': token, 
      'Content-Type': 'application/json'
    };
      axios
        .post(AllProduct,{}, {headers})
        .then(function (values) {
        let RemaingItems = [];
        RemaingItems  = CartItem.children.filter( (e)=> {
          return  e.item._id != ProductId;
      });
      let TotalPrice = 0;
      let TotalDiscount = 0;
      for (let i = 0; i < RemaingItems.length; i++) {
        let e = RemaingItems[i];
        if (e.item.discount === 0) {
          TotalPrice = TotalPrice + (e.quantity)*parseFloat(e.item.price);
        } else {
          let Price = e.item.price - (e.item.discount * e.item.price) / 100;
          TotalPrice = TotalPrice + (e.quantity)*parseFloat(Price);
          TotalDiscount = TotalDiscount + (e.quantity)*(e.item.discount * e.item.price) / 100;
        }
      }
      setIsload(true);
      setCartItem({children:RemaingItems,amount:{total:TotalPrice,discount:TotalDiscount}})
        })
        .catch((err) => {
          if(err.response.status==401){
            toast.error('Please login to remove item from cart', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }else{
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
    }
    useEffect(() => {
      if(isLoad==false){
        setCartItem(props);
      }

  }, [props,CartItem,isLoad])
  return (
    <>
     <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
        <div className="uk-offcanvas-bar uk-text-secondary">
    
            <button className="uk-offcanvas-close uk-text-danger" type="button" data-uk-close></button>
            <img src={logo} className="logo" alt=""/>
            <h3 className="head2">Kisaan Factory Cart</h3>
    
            <div className="uk-grid-small uk-margin-top uk-grid-divider" data-uk-grid>
                <div className="uk-width-expand">
                    <div className="uk-flex uk-flex-between">
                        <p className="deds">Total Ammount</p>
                        <p className="price">₹ {CartItem.amount.total?CartItem.amount.total.toFixed(2):0}</p>
                    </div>
                    <div className="uk-flex uk-flex-between">
                        <p className="deds">Offer Discount</p>
                        <p className="price">₹ {CartItem.amount.discount?CartItem.amount.discount.toFixed(2):0}</p>
                    </div>
                    <div className="uk-flex uk-flex-between">
                        <p className="deds">Delivery Charge</p>
                        <p className="price">FREE</p>
                    </div>
                </div>
                <div className="uk-width-1-3">
                    <div className="uk-flex uk-flex-column uk-flex-middle">
                        <small>TOTAL PAYABLE</small>
                    <h4 className="price">₹ {CartItem.amount.total?CartItem.amount.total.toFixed(2):0}</h4>
                    </div>
                </div>
            </div>

            <h6 className="info uk-margin-bottom">You've got FREE delivery. Start Checkout Now </h6>
            {
               CartItem.children.map((e,i)=>{
                    return (
                        <div className="cart-items" key={i}>
                        <div>
                            <img src={constant.ServerUrl+e.item.images[0]} alt=""/>
                        </div>
                        <div>
                            <h4 className="pname">{_.upperFirst(e.item.title)} </h4>
                            <form id="myform" method="POST" className="quantity uk-flex uk-flex-between" action="#" autoComplete="off">
                                <input type="button" defaultValue="-" className="qtyminus minus trig" onClick={()=>ChangeQuantity(e.item._id,'decrease',e.quantity)} field="quantity"/>
                                <input type="text" name="quantity" readOnly={true} value={e.quantity} className="qty"/>
                                <input type="button" defaultValue="+" className="qtyplus plus trig" onClick={()=>ChangeQuantity(e.item._id,'increase',e.quantity)} field="quantity"/>
                            </form>
                        </div>
                        <div>
                            {GetPrice(e)}
                                                
                        </div>
                        <a className="del" href={null} onClick={()=>RemoveFromCart(e.item._id)}><i data-uk-icon="trash"></i></a>
                    </div>
                    )
                })
            }
            
            <Link className="btn btn-default mx-auto d-block mt-5" to={"/cart"}>Check Out</Link>
        </div>
    </div>
  
    </>
  );
};

export default Cart;
