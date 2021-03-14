import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

interface cartProps {
  cart: any;
  updateCartQuantity: (productId: string, quantity:number) => void;
  removeItemFromCart: (productId: string) => void;
  emptyCart: () => void;
  prods: any;
}

const Cart = ({cart, updateCartQuantity, removeItemFromCart, emptyCart, prods}:cartProps) => {
  const classes = useStyles();
  const [products, setProducts] = useState<any>([]);
  const methods = useForm();

  useEffect(() => {
    setProducts(prods);
  }, [prods])

  const EmptyCart = () => (
    <>
    <Typography variant="subtitle1"> Your cart is empty! </Typography>
    <Button component={Link} to="/" type="button" variant="contained" color="primary">Go to Shop</Button>
    </>
  );

  const FilledCart = () => (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit((data) => (console.log("end")))}>
      <Grid container spacing={3}>

        {
          cart.line_items.map((item:any) => {
            console.log(products);
            
            for(let i:number=0; i < products.length; i++) {
              if(products[i].id === item.product_id) {
                return (<Grid item xs={12} sm={4} key={item.id}>
                  <CartItem item={item} updateCartQuantity={updateCartQuantity} removeItemFromCart={removeItemFromCart} product={products[i]} />
                </Grid>)
              }
            }
          })
        }
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary"
            onClick={emptyCart}>Empty Cart</Button>
          <Button type="submit" component={Link} to="/checkout" className={classes.checkoutButton} size="large" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
      </form>
    </FormProvider>
  );

  if(!cart.line_items) return (<div>Loading...</div>);

  return (
    <Container>
      <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>
      <Typography className={classes.title} variant="h5" gutterBottom>You have {cart.total_items} items on the your cart</Typography>
      { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
    </Container>
  )
}

export default Cart;
