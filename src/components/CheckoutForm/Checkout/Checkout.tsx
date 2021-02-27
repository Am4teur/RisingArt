import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';

import { commerce } from '../../../lib/commerce';
import useStyle from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';


const steps = ["Shipping Address", "Payment Details", "Confirmation"];

interface checkoutProps {
  cart: any;
}

const Checkout = ({cart}: checkoutProps) => {
  const [checkoutToken, setCheckoutToken] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const classes = useStyle();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const checkoutToken = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

        setCheckoutToken(checkoutToken);
      } catch (error) {

      }
    }

    generateToken();
  }, [cart]);

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  );

  const Form = () =>  activeStep === 0
                      ? <AddressForm checkoutToken={checkoutToken}/>
                      : <PaymentForm />;

  return (
    <>
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
          {activeStep === steps.length-1 ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
