import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

import useStyles from './styles';


interface cartItemProps {
  item: any;
  updateCartQuantity: (productId: string, quantity:number) => void;
  removeItemFromCart: (productId: string) => void;
  product: any;
}

const CartItem = ({item, updateCartQuantity, removeItemFromCart, product}:cartItemProps) => {
  const classes = useStyles();
  const { control } = useFormContext();

  const PayWhatYouWant = () => {
    return (
      <CardContent className={classes.cardContent}>
        <Controller
          as={TextField}
          control={control}
          fullWidth
          name={"paywhatyouwant"}
          label={"Pay What You Want"}
          required
          defaultValue={0.5}
        />
      </CardContent>
    )
  }

  return (
    <Card>
      <CardMedia image={item.media.source} className={classes.media} title={item.name}/>
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      {product.conditionals.is_pay_what_you_want ? <PayWhatYouWant /> : null}
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => updateCartQuantity(item.id, item.quantity-1)}>-</Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size="small" onClick={() => updateCartQuantity(item.id, item.quantity+1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={() => removeItemFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  );
}

export default CartItem;
