import React, { useEffect } from "react";

import tawkTo from "../../utils/tawk";

const Dashboard = () => {



  //use effect to fetch gift data
  useEffect(() => {
    tawkTo("61bf055380b2296cfdd2678f","1fn92pk3n")
  }, []);
 
    return (
      <>
       
      </>
    );
  
};

export default Dashboard;
