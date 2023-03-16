import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import {
  AppDispatch,
  useAppDispatch,
  useAppSelector
} from '../../app/store/configureStore';
import { currencyFormat } from '../../app/utils/utils';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';
import BasketSummary from './BasketSummary';

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket) return <Typography variant="h3">Empty basket</Typography>;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status ===
                      'pendingRemoveItem-' + item.productId + 'removebutton'
                    }
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: 'removebutton'
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status === 'pendingAddItem-' + item.productId}
                    color="success"
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price, item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status ===
                      'pendingRemoveItem-' + item.productId + 'deletebutton'
                    }
                    color="success"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: 'deletebutton'
                        })
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
