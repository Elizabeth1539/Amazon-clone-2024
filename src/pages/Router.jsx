import React from "react";
// import { Router } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import Auth from "./auth/Auth";
import Payment from "./payment/Payment";
import Orders from "./order/Order";
import Cart from "./cart/Cart";
import Result from "./results/Result";
import ProductDetail from "./productDetail/ProductDetail";


function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
       
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
export default Routing;
