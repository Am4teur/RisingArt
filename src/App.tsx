import React, { useState, useEffect } from 'react';
import { Navbar, Products, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));


const App = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any>({});

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
  }

  const updateCartQuantity = async (productId:string, quantity:number) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  }

  const removeItemFromCart = async (productId:string) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);  

  return (
    <Router>
      <div>
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
            <Checkout cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
