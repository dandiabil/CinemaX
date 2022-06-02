import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Register from "./Register/Register";
import "./MainPage.scss";
import Catalogs from "./Catalogs/Catalogs";
import CatalogDetail from "./CatalogDetail/CatalogDetail";
import NotFound from "./NotFound/NotFound";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";

const MainPage = () => {
  return (
    <main>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/catalogs" exact element={<Catalogs />} />
        <Route path="/catalogs/:id" element={<CatalogDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default MainPage;
