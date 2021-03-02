import { makeStyles } from '@material-ui/core/styles';

const spacing = 8;

export default makeStyles((theme) => ({
  title: {
    marginTop: spacing * 2,
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  cardDetails: {
    display: 'flex',
    marginTop: spacing * 4,
    width: '100%',
    justifyContent: 'space-between',
  },
}));