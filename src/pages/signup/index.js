import {
  LockOutlined as LockOutlinedIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuthSlice, removemessage, signup } from "../../store/auth";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./config";

const Signup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ui, isAuth } = useSelector(getAuthSlice);

  const handleSubmit = (values, helpers) => {
    dispatch(signup(values));
  };

  useEffect(() => {
    if (ui.signup.message && ui.signup.message.includes("Successfully")) {
      navigate("/");
    }
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [ui, isAuth, navigate]);

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <Collapse in={Boolean(ui.signup.message)}>
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
        </Collapse>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form autoComplete="off" onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    name="name"
                    label="Name*"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    name="username"
                    label="Username*"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    name="email"
                    label="Email*"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="number"
                    name="number"
                    label="Phone"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.number && Boolean(formik.errors.number)
                    }
                    helperText={formik.touched.number && formik.errors.number}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="password"
                    name="password"
                    label="Password*"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Signup;
