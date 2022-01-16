import { Grid, Box, Container, Typography, Paper } from "@mui/material";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getKanbanSlice, updateColumn, onItemAction } from "../../store/kanban";
import { COLUMN_COLOR_ENUM } from "../dashboard/config";

const Kanban = (props) => {
  const dispatch = useDispatch();
  const { columns } = useSelector(getKanbanSlice);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(updateColumn(result));
  };

  const handleActions = (columnId, item, type) => {
    dispatch(onItemAction({ type, columnId, item }));
  };

  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Grid item xs={12} sm={3} key={columnId} alignContent="center">
                <Typography
                  component="h5"
                  variant="h5"
                  align="center"
                  sx={{ backgroundColor: COLUMN_COLOR_ENUM[columnId] }}
                >
                  {column.name}
                </Typography>
                <Box>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <Paper
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          sx={{
                            backgroundColor:
                              snapshot.isDraggingOver && "grey.300",
                            minHeight: 500,
                            p: 3,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Paper
                                      elevation={3}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                      }}
                                      sx={{
                                        userSelect: "none",
                                        backgroundColor: snapshot.isDragging
                                          ? "info.dark"
                                          : COLUMN_COLOR_ENUM[columnId],
                                        minHeight: "80px",
                                        color: "primary.contrastText",
                                        padding: 2,
                                        margin: "0 0 8px 0",
                                      }}
                                    >
                                      <Typography component="p" variant="body1">
                                        {item.content}
                                      </Typography>
                                      <Box
                                        component="div"
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        {column.name !== "Backlog" && (
                                          <ArrowBackIosIcon
                                            fontSize="small"
                                            sx={{ ml: 1, cursor: "pointer" }}
                                            onClick={(e) =>
                                              handleActions(
                                                columnId,
                                                item,
                                                "BACK"
                                              )
                                            }
                                          />
                                        )}

                                        {column.name !== "Done" && (
                                          <ArrowForwardIosIcon
                                            fontSize="small"
                                            sx={{ ml: 1, cursor: "pointer" }}
                                            onClick={(e) =>
                                              handleActions(
                                                columnId,
                                                item,
                                                "FORWARD"
                                              )
                                            }
                                          />
                                        )}
                                        <EditIcon
                                          fontSize="small"
                                          sx={{ ml: 1, cursor: "pointer" }}
                                          onClick={(e) =>
                                            handleActions(
                                              columnId,
                                              item,
                                              "EDIT"
                                            )
                                          }
                                        />
                                        <DeleteIcon
                                          fontSize="small"
                                          sx={{ ml: 1, cursor: "pointer" }}
                                          onClick={(e) =>
                                            handleActions(
                                              columnId,
                                              item,
                                              "DELETE"
                                            )
                                          }
                                        />
                                      </Box>
                                    </Paper>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </Paper>
                      );
                    }}
                  </Droppable>
                </Box>
              </Grid>
            );
          })}
        </DragDropContext>
      </Grid>
    </Container>
  );
};

export default Kanban;
