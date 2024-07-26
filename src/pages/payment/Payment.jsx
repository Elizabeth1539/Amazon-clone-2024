import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../component/layout/Layout";
import { DataContext } from "../../component/dataProvider/DataProvider";
import ProductCard from "../../component/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../component/currencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../utility/firebase";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Type } from "../../utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

 const handlePayment = async (e) => {
   e.preventDefault();
   try {
     setProcessing(true);
     console.log("Processing payment...");
     // 1. backend || functions ---> contact to the client secret
     const response = await axiosInstance({
       method: "POST",
       url: `/payment/create?total=${total * 100}`,
     });
     console.log("Client Secret response:", response.data);
     const clientSecret = response.data?.clientSecret;

     // 2. client side (react side confirmation)
     const { paymentIntent, error } = await stripe.confirmCardPayment(
       clientSecret,
       {
         payment_method: {
           card: elements.getElement(CardElement),
         },
       }
     );

     if (error) {
       console.error("Payment failed: ", error);
       setCardError(error.message);
       setProcessing(false);
       return;
     }

     console.log("PaymentIntent:", paymentIntent);

     // 3. after the confirmation --> order firestore database save, clear basket
     console.log("Saving order to Firestore...");
     await db
       .collection("users")
       .doc(user.uid)
       .collection("orders")
       .doc(paymentIntent.id)
       .set({
         basket: basket,
         amount: paymentIntent.amount,
         created: paymentIntent.created,
       });

     console.log("Order saved successfully!");

     // empty the basket
     dispatch({ type: Type.EMPTY_BASKET });
     setProcessing(false);
     navigate("/orders", { state: { msg: "You have placed a new order" } });
   } catch (error) {
     console.error("Error during payment process: ", error);
     setProcessing(false);
   }
 };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
