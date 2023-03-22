import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined
} from '@mui/icons-material';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Order } from '../../app/models/order';
import { currencyFormat } from '../../app/utils/utils';
import OrderDetailed from './OrderDetailed';

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading orders..." />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <Fragment key={order.id}>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() =>
                      open === order.id ? setOpen(null) : setOpen(order.id)
                    }
                  >
                    {open ? (
                      <KeyboardArrowUpOutlined />
                    ) : (
                      <KeyboardArrowDownOutlined />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(order.total)}
                </TableCell>
                <TableCell align="right">
                  {order.orderDate.split('T')[0]}
                </TableCell>
                <TableCell align="right">{order.orderStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open === order.id} timeout="auto" unmountOnExit>
                    <OrderDetailed
                      order={order}
                      key={order.id + order.orderDate}
                    />
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
