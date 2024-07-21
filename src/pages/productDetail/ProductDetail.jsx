import React, {useEffect, useState} from 'react'
import classes from "./productDetail.module.css"
// import {LayOut} from '../../Components/LayOut/LayOut'
import LayOut from '../../component/layout/Layout'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import { useParams } from 'react-router-dom'
import ProductCard from '../../component/product/ProductCard'
import Loader from '../../component/loader/Loader'
function ProductDetail() {
  const [product, setproduct] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  console.log(product);
  return (
    <LayOut>
     
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}
export default ProductDetail;