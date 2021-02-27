import React from 'react';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ShoppingCart } from '@material-ui/icons';

import useStyles from './styles';
import logo from '../../imgs/paint-palette.png';


interface navbarProps {
  cartSize: number
}

const Navbar = ({cartSize}: navbarProps) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img src={logo} alt="risingartlogo" height="32px" width="32px" className={classes.image}/>
            Rising Art
          </Typography>
          <div className={classes.grow}/>
          <div>
          <IconButton aria-label="Show cart items" color="inherit">
            <Badge badgeContent={cartSize} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;
