import {
  Grid,
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Modal,
  Chip,
} from "@mui/material";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getKanbanSlice, updateColumn, onItemAction } from "../../store/kanban";
import { COLUMN_COLOR_ENUM } from "../dashboard/config";
import AddTask from "./AddTask";
import { createPortal } from "react-dom";

const Kanban = (props) => {
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(null);
  const dispatch = useDispatch();
  const { columns } = useSelector(getKanbanSlice);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(updateColumn(result));
  };

  const handleActions = (columnId, stage, item, type) => {
    dispatch(onItemAction({ type, columnId, stage, item }));
  };

  const handleCreateTaskModalToggle = () => {
    setOpen((state) => !state);
  };

  return (
    <Container maxWidth="xl">
      <Button
        variant="contained"
        sx={{ margin: "2rem auto", display: "block" }}
        onClick={handleCreateTaskModalToggle}
      >
        Create Task
      </Button>

      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result);
        }}
      >
        <Grid container spacing={2} justifyContent="space-around">
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
                            const date = new Date(item.deadline);
                            const day = date.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            });
                            const time = date.toLocaleTimeString(
                              navigator.language,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            );
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
                                          label={item.priority.toUpperCase()}
                                          size="small"
                                          color="info"
                                        />
                                      </Box>
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
                                                column.stage,
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
                                                column.stage,
                                                item,
                                                "FORWARD"
                                              )
                                            }
                                          />
                                        )}
                                        <EditIcon
                                          fontSize="small"
                                          sx={{ ml: 1, cursor: "pointer" }}
                                          onClick={(e) => {
                                            setEditable({ columnId, item });
                                            handleCreateTaskModalToggle();
                                          }}
                                        />
                                        <DeleteIcon
                                          fontSize="small"
                                          sx={{ ml: 1, cursor: "pointer" }}
                                          onClick={(e) =>
                                            handleActions(
                                              columnId,
                                              column.stage,
                                              item,
                                              "DELETE"
                                            )
                                          }
                                        />
                                      </Box>
                                      {snapshot.isDragging &&
                                        createPortal(
                                          <DeleteIcon
                                            sx={{
                                              position: "absolute",
                                              right: "5vw",
                                              bottom: "10vh",
                                            }}
                                            color="error"
                                            fontSize="large"
                                          />,
                                          document.getElementsByTagName(
                                            "body"
                                          )[0]
                                        )}
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
        </Grid>

        <div>
          <Droppable droppableId="delete">
            {(provided, snapshot) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks

              return (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    maxWidth: "40px",
                    maxHeight: "40px",
                    position: "fixed",
                    visibility: "hidden",
                    right: "10vw",
                    bottom: "10vh",
                    padding: 0,
                  }}
                >
                  <DeleteIcon fontSize="large" />

                  {provided.placeholder}
                </Box>
              );
            }}
          </Droppable>
        </div>
      </DragDropContext>

      <Modal
        open={open}
        onClose={handleCreateTaskModalToggle}
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
          <AddTask
            toggleModal={handleCreateTaskModalToggle}
            editable={editable}
            setEditable={setEditable}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default Kanban;
