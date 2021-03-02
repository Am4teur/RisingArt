import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const pub_key:string = process.env.REACT_APP_STRIPE_PUBLIC_KEY ? process.env.REACT_APP_STRIPE_PUBLIC_KEY : "";

const stripePromise = loadStripe(pub_key);

interface paymentFormProps {
  shippingData: any;
  checkoutToken: any;
  prevStep: () => void;
  nextStep: () => void;
  handleCaptureCheckout: (checkoutTokenId:string, newOrder:any) => void;
}

const PaymentForm = ({shippingData, checkoutToken, prevStep, nextStep, handleCaptureCheckout}:paymentFormProps) => {

  const handleSubmit = async (e:any, elements:any, stripe:any) => {
    e.preventDefault();

    if(!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if(error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.subdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.country
        },
        fulfillment: { shipping_method: shippingData.option },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      handleCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <div>
      <Review checkoutToken={checkoutToken}/>
      <Divider />
      <Typography variant="h6" gutterBottom style={{margin: "20px 0"}}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br/> <br/>
              <div style={{ display: "flex", justifyContent: "space-between"}}>
                <Button variant="outlined" onClick={prevStep}>Back</Button>
                <Button type="submit" variant="contained" color="primary" disabled={!stripe}>
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )
          }
        </ElementsConsumer>
      </Elements>
    </div>
  )
}

export default PaymentForm;
