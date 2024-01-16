import React, { ReactElement, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

import { getPatients, getOrders, Patient, Order } from "./data";
import "./App.css";

interface OrderDialogProps {
  nowOrderId: string;
  setNowOrderId: React.Dispatch<React.SetStateAction<string>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderDialog: React.FC<OrderDialogProps> = ({
  nowOrderId,
  setNowOrderId,
  isDialogOpen,
  setIsDialogOpen,
  orders,
  setOrders,
}): ReactElement => {
  const nowOrderIds = orders.filter(({ OrderId }) => OrderId === nowOrderId);

  const handleOnClose = () => {
    setNowOrderId("");
    setIsDialogOpen(false);
  };

  const handleOnChangeOrder = (
    e: React.ChangeEvent<HTMLInputElement>,
    Id: string
  ) => {
    setOrders(
      orders.map((order: Order) => {
        if (order.Id === Id) {
          return { ...order, Message: e.target.value };
        } else {
          return order;
        }
      })
    );
  };

  const handleNewAOrder = () => {
    const newOrder = {
      Id: (Number(orders[orders.length - 1].Id) + 1).toString(),
      Message: "",
      OrderId: nowOrderId,
    };
    setOrders([...orders, newOrder]);
  };

  const handleDeleteOrder = (orderIdToDelete: string) => {
    setOrders(orders.filter(({ Id }) => Id !== orderIdToDelete));
  };

  return (
    <Dialog onClose={handleOnClose} open={isDialogOpen} fullWidth maxWidth="sm">
      <DialogTitle>Patient Order</DialogTitle>
      <Container>
        <Stack className="btn-group" direction="row-reverse">
          <Button
            className="new-btn"
            variant="contained"
            onClick={handleNewAOrder}
          >
            新增
          </Button>
        </Stack>
      </Container>

      {nowOrderIds.map(({ Id, Message }) => (
        <ListItem key={`Dialog-${Id}`} component="div" disablePadding>
          <ListItemButton>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              value={Message}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOnChangeOrder(e, Id)
              }
            />
            <Icon className="delete-icon" onClick={() => handleDeleteOrder(Id)}>
              delete_forever
            </Icon>
          </ListItemButton>
        </ListItem>
      ))}
    </Dialog>
  );
};

const RenderRow = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [nowOrderId, setNowOrderId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const handleClickItem = (orderId: string) => {
    setIsDialogOpen(true);
    setNowOrderId(orderId);
  };

  useEffect(() => {
    getPatients().then((res: Patient[]) => setPatients(res));
    getOrders().then((res: Order[]) => setOrders(res));
  }, []);

  return (
    <>
      <OrderDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        nowOrderId={nowOrderId}
        setNowOrderId={setNowOrderId}
        orders={orders}
        setOrders={setOrders}
      />
      {patients.map(({ Name, OrderId }) => (
        <ListItem
          key={`Item-${OrderId}`}
          component="div"
          disablePadding
          onClick={() => handleClickItem(OrderId)}
        >
          <ListItemButton>
            <ListItemText primary={Name} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

function App() {
  return (
    <div className="layout">
      <Box>
        <RenderRow />
      </Box>
    </div>
  );
}

export default App;
