import {
  FourMp,
  PendingActions as PendingActionsIcon,
} from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { Form, Formik } from "formik";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./config";
import DatePicker from "./DatePicker";
import { useDispatch } from "react-redux";
import { expenseAdd, expenseEdit } from "../../store/expense";
import { useEffect, useState } from "react";

const AddExpense = ({ editable, setEditable }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, helpers) => {
    helpers.resetForm();
    if (editable) {
      console.log(editable);
      dispatch(expenseEdit({ ...values, _id: editable._id }));
      setEditable(null);
    } else {
      dispatch(expenseAdd(values));
    }
  };

  useEffect(() => {
    return () => {
      setEditable(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="div" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PendingActionsIcon sx={{ color: "secondary.contrastText" }} />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Add Expense
        </Typography>
        {/* <Collapse in={Boolean(ui.signup.message)}>
        <Alert
          severity={
            ui.signup.message && ui.signup.message.includes("Successfully")
              ? "success"
              : "error"
          }
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(removemessage({ type: "signup" }));
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2, mt: 2, width: "100%" }}
        >
          {ui.signup.message}
        </Alert>
      </Collapse> */}
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if (editable) {
                formik.setValues({
                  title: editable.title,
                  date: editable.date,
                  description: editable.description,
                  amount: editable.amount,
                });
              }

              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

            return (
              <Form autoComplete="off" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="title"
                      name="title"
                      label="Expense Title*"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="amount"
                      name="amount"
                      label="Expense amount*"
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.amount && Boolean(formik.errors.amount)
                      }
                      helperText={formik.touched.amount && formik.errors.amount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="description"
                      name="description"
                      label="Expense description*"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <Typography color="textSecondary"></Typography>
                    <ToggleButtonGroup
                      name="priority"
                      color="secondary"
                      value={formik.values.priority}
                      exclusive
                      onChange={(e) => {
                        e.target.name = "priority";
                        formik.handleChange(e);
                      }}
                    >
                      <ToggleButton value="high">High</ToggleButton>
                      <ToggleButton value="medium">Medium</ToggleButton>
                      <ToggleButton value="low">Low</ToggleButton>
                    </ToggleButtonGroup>
                  </Grid> */}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {editable ? "Update Expense" : "Create Expense"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddExpense;
