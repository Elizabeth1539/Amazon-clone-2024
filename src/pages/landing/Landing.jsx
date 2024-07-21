import React from "react";
import LayOut from "../../component/layout/Layout";
import Carousel from "../../component/carousel/Carousel";
import Category from "../../component/category/Category";
import Product from "../../component/product/Product";
function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}
export default Landing;
