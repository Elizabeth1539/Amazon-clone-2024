import React, { useEffect, useState   }  from 'react'
import classes from './result.module.css'
import LayOut from '../../component/layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../component/product/ProductCard'
import Loader from '../../component/loader/Loader'
function Result() {
  const [Results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { categoryName } = useParams();
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setisLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  }, []);
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results </h1>
        <p style={{ padding: "30px" }}>Category </p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products__container}>
            {Results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}
export default Result;