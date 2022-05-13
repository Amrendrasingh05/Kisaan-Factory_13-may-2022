import React from "react";
import HomeHeader from "../common/header.component";



const Apps =() =>{

    return <>
    <HomeHeader/>
    <div className="AppPage">
      <h1 className="AppHeading">Soon we will on Play Store Till then use blelow Button</h1>
        <a href="https://drive.google.com/file/d/1MACG-LjKhQNDCEoxOAReYcF55AJ4w_vc/view?usp=sharing">
          <button className="AppHeadingLink"><i class="fa fa-download"></i> Download APK</button>
        </a>
   </div>
    </>
}

export default Apps;