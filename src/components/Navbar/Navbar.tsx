import React from 'react';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { ShoppingCart, ArrowBack } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';
import logo from '../../imgs/paint-palette.png';


interface navbarProps {
  cartSize: number
}

const Navbar = ({cartSize}: navbarProps) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="risingartlogo" height="32px" width="32px" className={classes.image}/>
            Rising Art
          </Typography>
          <div className={classes.grow}/>
          <div>
            { location.pathname !== "/cart" ? 
              <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                <Badge badgeContent={cartSize} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              :
              <IconButton component={Link} to="/" aria-label="Go back to shop" color="inherit">
                <ArrowBack />
              </IconButton>
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar;
