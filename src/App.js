import "./App.css";
import React, { Fragment, useContext } from "react";
import MainHeader from "./components/Header/MainHeader";
import Hero from "./components/Hero/Hero";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContext from "./CartContext";

// import useAJAX from "./Hooks/use-AJAX";

function App() {
  const cartCtx = useContext(CartContext);

  return (
    <Fragment>
      <MainHeader></MainHeader>
      <Hero></Hero>
      <Meals></Meals>
      {<Cart></Cart>}
    </Fragment>
  );
}

export default App;
