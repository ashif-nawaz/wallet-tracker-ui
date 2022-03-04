import { Container, Grid, Paper, Typography, Badge, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { COLUMN_ICON_ENUM, COLUMN_COLOR_ENUM } from "./config";
import { useEffect } from "react";

import { getExpenseSlice, expenseFetch } from "../../store/expense";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { totalExpenses } = useSelector(getExpenseSlice);

  useEffect(() => {
    dispatch(expenseFetch({}));
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography component="h2" variant="h4" mb={4}>
          This Month
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/expenses" component={RouterLink} underline="none">
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 150,
                  backgroundColor: "info.light",
                }}
              >
                <Typography component="h6" variant="h6" align="center" mb={3}>
                  Expenses
                </Typography>
                <Badge
                  color="secondary"
                  badgeContent={totalExpenses || "0"}
                  component="div"
                >
                  {COLUMN_ICON_ENUM.Done}
                </Badge>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
