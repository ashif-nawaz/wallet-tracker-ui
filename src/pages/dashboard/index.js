import { Container, Grid, Paper, Typography, Badge, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { COLUMN_ICON_ENUM, COLUMN_COLOR_ENUM } from "./config";

import { getKanbanSlice } from "../../store/kanban";
const Dashboard = (props) => {
  const { columns } = useSelector(getKanbanSlice);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography component="h2" variant="h4" mb={4}>
          Today
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <Grid key={columnId} item xs={12} sm={6} md={3}>
                <Link to="/tasks" component={RouterLink} underline="none">
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 150,
                      backgroundColor: COLUMN_COLOR_ENUM[columnId],
                    }}
                  >
                    <Typography
                      component="h6"
                      variant="h6"
                      align="center"
                      mb={3}
                    >
                      {columnId}
                    </Typography>
                    <Badge
                      color="secondary"
                      badgeContent={column.items.length || "0"}
                      component="div"
                    >
                      {COLUMN_ICON_ENUM[columnId]}
                    </Badge>
                  </Paper>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
