import React, { useState, useEffect } from 'react';
import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  app: {
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  }
}));


const App = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any>({});
  const [order, setOrder] = useState<any>({});
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId:string, quantity:number) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const updateCartQuantity = async (productId:string, quantity:number) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const removeItemFromCart = async (productId:string) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId:string, newOrder:any) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log("Error on handleCaptureCheckout: " + error);

      setErrorMsg(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);  

  return (
    <Router>
      <div className={classes.app}>
        <Navbar cartSize={cart.total_items} />
        <div className={classes.toolbar}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} addToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart}
                  updateCartQuantity={updateCartQuantity}
                  removeItemFromCart={removeItemFromCart}
                  emptyCart={emptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              handleCaptureCheckout={handleCaptureCheckout}
              error={errorMsg}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
