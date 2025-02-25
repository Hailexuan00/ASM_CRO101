import React, { useState } from "react";
import Manhinhlogin from "../manhinhlogin";
import Manhinhsignupsignup from "../manhinhsignup";
import HomeScreen from "../HomeScreen";
import ProductDetailsScreen from "../ProductDetailsScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [registeredAccount, setRegisteredAccount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRegistrationSuccess = (account) => {
    setRegisteredAccount(account);
    setCurrentScreen("login");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen("home");
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentScreen("productDetails");
  };

  return (
    <>
      {isLoggedIn ? (
        currentScreen === "home" ? (
          <HomeScreen onProductSelect={handleProductSelect} />
        ) : (
          <ProductDetailsScreen product={selectedProduct} />
        )
      ) : currentScreen === "login" ? (
        <Manhinhlogin
          onSwitch={() => setCurrentScreen("signup")}
          registeredAccount={registeredAccount}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <Manhinhsignupsignup onSwitch={handleRegistrationSuccess} />
      )}
    </>
  );
}