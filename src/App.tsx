import React, { useState, useEffect } from 'react';
import { Navbar, Products, Cart } from './components';
import { commerce } from './lib/commerce';

const App = () => {
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
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);


  console.log(products);
  console.log(cart.total_items);
  

  return (
    <div>
      <Navbar cartSize={cart.total_items} />
      {/*<Products products={products} addToCart={handleAddToCart} />*/}
      <Cart cart={cart} />

    </div>
  )
}

export default App;
