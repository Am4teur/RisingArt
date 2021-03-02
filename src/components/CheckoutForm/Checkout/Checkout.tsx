import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';

import { commerce } from '../../../lib/commerce';
import useStyle from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { Link, useHistory } from 'react-router-dom';


const steps = ["Shipping Address", "Payment Details"];

interface checkoutProps {
  cart: any;
  order: any;
  handleCaptureCheckout: (checkoutTokenId:string, newOrder:any) => void;
  error: string;
}

const Checkout = ({cart, order, handleCaptureCheckout, error}: checkoutProps) => {
  const [checkoutToken, setCheckoutToken] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [shippingData, setShippingData] = useState<any>({});
  const classes = useStyle();
  const history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const checkoutToken = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

        setCheckoutToken(checkoutToken);
      } catch (error) {
        console.log(error);

        setTimeout(() => {
          console.log("timeout before going to main page");
          history.push("/");
        }, 20000);
      }
    }

    generateToken();
  }, [cart]);

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Typography variant="h6">You will be redirected to the e-shop page in 15 seconds</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const nextStep = () => setActiveStep((prevActiveStep) => (prevActiveStep + 1));
  const prevStep = () => setActiveStep((prevActiveStep) => (prevActiveStep - 1));

  const next = (data:any) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>  activeStep === 0
                      ? <AddressForm checkoutToken={checkoutToken} next={next}/>
                      : <PaymentForm
                          shippingData={shippingData}
                          checkoutToken={checkoutToken}
                          prevStep={prevStep}
                          nextStep={nextStep}
                          handleCaptureCheckout={handleCaptureCheckout}
                        />;

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {
              steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))
            }
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
