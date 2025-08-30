import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "./Toast";

function Layout({ children, toastMessage, toastVisible, onAddClick }) {
  return (
    <>
      <Header onAddClick={onAddClick} /> {/* 💡 Προωθεί τη συνάρτηση */}
      {children}
      <Footer />
      <Toast message={toastMessage} visible={toastVisible} />
    </>
  );
}


export default Layout;
