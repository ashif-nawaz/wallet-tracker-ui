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
import { addItem, editItem } from "../../store/kanban";
import { useEffect, useState } from "react";

const AddTask = ({ editable, setEditable }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, helpers) => {
    helpers.resetForm();
    if (values.id) {
      dispatch(editItem(values));
      setEditable(null);
    } else {
      dispatch(addItem(values));
    }
    // props.toggleModal();
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
          Create Task
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
                  name: editable.item.content,
                  deadline: editable.item.deadline,
                  priority: editable.item.priority,
                  columnId: editable.columnId,
                  id: editable.item.id,
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
                      id="name"
                      name="name"
                      label="Task Name*"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography color="textSecondary">Priority</Typography>
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
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {editable ? "Update Task" : "Create Task"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddTask;
