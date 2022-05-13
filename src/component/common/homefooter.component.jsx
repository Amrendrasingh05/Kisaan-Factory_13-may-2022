import React from 'react';
import logo from '../../images/FooterLogo.png'
import tw4px from '../../images/Phone 24px.png'
import Location from '../../images/Location.png'


const HomeFooter = ()=>{
    return(
        <>
       
<footer className="py-5">
    <div className="uk-container uk-container-expand">
        <div className="myftr">
           
            <div className="ftr">

                
                
                <a className='footerLogo' href="/"><img style={{height: "60px",marginTop:"0px", marginBottom:"25px",marginLeft:"25px"}}  alt="" src={logo}/></a>
                <h6 style={{color: "White"}}>Kisaan and factory</h6>
                <div className="mlocation my-3">
                    <img alt="" src={Location}/>
                    <h6 style={{color: "White"}}>Urban estate phase 1, <br></br> Patiala Punjab, <br></br>  147002 India</h6>           
                </div>
                <span className="phone-number mb-2">
                    <img alt="" src={tw4px}/>
                        <h6><a href="tel:01755006831">01755006831</a></h6>
                </span>
                <h6>
                    <a href="/">www.kisaanandfactory.com</a>
                </h6>
            
            </div>
            <div className="ftr">
                <h3 style={{color: "White"}}>Menu</h3>
                <ul>
                    <li><a href="/search">Products</a></li>
                    <li><a href="/refund-policy">Refund Policy</a></li>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/payment-policy">Payment Policy</a></li>
                    <li><a href="/privacy-policy">Privacy policy</a></li>
                    <li><a href="/driver-privacy-policy">Driver Privacy policy</a></li>
                    <li><a href="/terms-and-conditions">Terms & Conditions</a></li>

                </ul>
            </div>
            <div className="ftr">
                <h3 style={{color: "White"}}>Accounts</h3>
                <ul>
                    <li><a href="/dashboard">My Account</a></li>
                    <li><a href="/checkout">Checkout</a></li>
                    <li><a href="/cart">My Cart</a></li>
                    <li><a href="/wishlist">My Wishlist</a></li>
                    <li><a href="https://kisaanandfactory.com/w-panel" target={'_blank'}>Register as Warehouse</a></li>
                    <li><a href="https://kisaanandfactory.com/v-panel" target={'_blank'}>Register as vendor</a></li>

                </ul>
            </div>
            <div className="ftr">
                <h3 style={{color: "White"}}>Stay Connected</h3>
                <ul>
                    <li><a href="/">Facebook</a></li>
                    <li><a href="/">Instagram</a></li>
                    <li><a href="/">Twitter</a></li>
                </ul>
            </div>
            <div className="ftr">
                <h3 style={{color: "White"}}>Stay Updated</h3>

                <div className="d-flex nletter mt-3">
                    <input aria-describedby="button-addon2" aria-label="Recipient's username" className="form-control" placeholder="someone@gmail.com" required="" type="email"/>
              
                    <button className="btn btn-primary" id="button-addon2"  type="button">
                        <i className="fa fa-paper-plane">
                        </i>
                    </button>
                </div>
                
                <div className='app'>
                <img style={{height: "40px",marginTop:"-10px", marginBottom:"25px",marginLeft:"0px"}}  alt="" src={logo} />
                <p className='appLink'><a href="/Apps">Kisaan&Factory App</a></p>
                </div>
        
            </div>
        </div>
    </div>
    
</footer>
        </>

    )
}

export default  HomeFooter;