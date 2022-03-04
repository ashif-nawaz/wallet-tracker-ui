import {
  Grid,
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Modal,
  Chip,
  Zoom,
  Fab,
} from "@mui/material";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getExpenseSlice, expenseDelete } from "../../store/expense";

import AddExpense from "./AddExpense";

const Expense = (props) => {
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(null);
  const dispatch = useDispatch();
  const { expenses } = useSelector(getExpenseSlice);

  const handleDelete = (item, e) => {
    dispatch(expenseDelete({ _id: item._id }));
  };

  const handleCreateExpenseModalToggle = () => {
    setOpen((state) => !state);
  };

  return (
    <Container maxWidth="xl">
      <Button
        variant="contained"
        sx={{ margin: "2rem auto", display: "block" }}
        onClick={handleCreateExpenseModalToggle}
      >
        Add Expenses
      </Button>

      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={12} sm={3} alignContent="center">
          <Typography component="h5" variant="h5" align="center" gutterBottom>
            Expenses
          </Typography>
          <Box>
            {expenses.length > 0 ? (
              expenses.map((item, index) => {
                const date = new Date(item.date);
                const day = date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                });
                const time = date.toLocaleTimeString(navigator.language, {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <Paper
                    sx={{
                      userSelect: "none",
                      backgroundColor: "info.light",
                      minHeight: "80px",
                      color: "primary.contrastText",
                      padding: 2,
                      margin: "0 0 8px 0",
                    }}
                    key={item._id}
                  >
                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Chip
                        label={`${day} | ${time}`}
                        size="small"
                        color="default"
                      />
                      <Chip
                        label={`Rs.${item.amount}`}
                        size="small"
                        color="info"
                      />
                    </Box>
                    <Typography component="p" variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      color="GreyText"
                    >
                      {item.description}
                    </Typography>
                    <Box
                      component="div"
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <EditIcon
                        fontSize="small"
                        sx={{ ml: 1, cursor: "pointer" }}
                        onClick={(e) => {
                          setEditable(item);
                          handleCreateExpenseModalToggle();
                        }}
                      />
                      <DeleteIcon
                        fontSize="small"
                        sx={{ ml: 1, cursor: "pointer" }}
                        onClick={handleDelete.bind(null, item)}
                      />
                    </Box>
                  </Paper>
                );
              })
            ) : (
              <Typography align="center">Nothing to show</Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleCreateExpenseModalToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: 400,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddExpense
            toggleModal={handleCreateExpenseModalToggle}
            editable={editable}
            setEditable={setEditable}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default Expense;
