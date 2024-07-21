import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../loader/Loader";
function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        isLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product__container}>
          {products?.map((singleProduct) => (
            <ProductCard
              renderAdd={true}
              product={singleProduct}
              key={singleProduct.id}
            />
          ))}
        </section>
      )}
    </>
  );
}
export default Product;
