import {
  Close as CloseIcon,
  LockOutlined as LockOutlinedIcon,
} from "@mui/icons-material";
import {
  Container,
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuthSlice, postLogin, removemessage } from "../../store/auth";
import ClientCaptcha from "react-client-captcha";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./config";
import { useState } from "react";

const Login = (props) => {
  const [currentCaptcha, setCurrentCaptcha] = useState("");
  const [invalidCaptcha, setInvalidCaptcha] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ui, isAuth } = useSelector(getAuthSlice);

  const handleSubmit = (values, helpers) => {
    setInvalidCaptcha(false);
    if (currentCaptcha === values.captcha) {
      dispatch(postLogin(values));
    } else {
      setInvalidCaptcha(true);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

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
          Login
        </Typography>

        <Collapse in={Boolean(ui.login.message) || invalidCaptcha}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  dispatch(removemessage({ type: "login" }));
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2, mt: 2, width: "100%" }}
          >
            {invalidCaptcha ? "Invalid Captcha" : ui.login.message}
          </Alert>
        </Collapse>

        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form autoComplete="off" onSubmit={formik.handleSubmit}>
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
                helperText={formik.touched.password && formik.errors.password}
              />
              <Grid container>
                <Grid item xs={12}>
                  <ClientCaptcha
                    captchaCode={(code) => setCurrentCaptcha(code)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="captcha"
                    name="captcha"
                    label="Captcha*"
                    type="text"
                    value={formik.values.captcha}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.captcha && Boolean(formik.errors.captcha)
                    }
                    helperText={formik.touched.captcha && formik.errors.captcha}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Login;
