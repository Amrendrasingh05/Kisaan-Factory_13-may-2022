import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div style={{ overflowY: "scroll", width: "100vw", height: "100vh" }}>
      {children}
    </div>
  );
};

export default MainLayout;
