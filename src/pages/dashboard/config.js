import {
  PendingActions as PendingActionsIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Autorenew as AutorenewIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const COLUMN_COLOR_ENUM = {
  Backlog: "info.light",
  ToDo: "error.light",
  Ongoing: "warning.light",
  Done: "success.light",
};

const COLUMN_ICON_ENUM = {
  Backlog: <PendingActionsIcon sx={{ color: "secondary.contrastText" }} />,
  ToDo: <FormatListNumberedIcon sx={{ color: "secondary.contrastText" }} />,
  Ongoing: <AutorenewIcon sx={{ color: "secondary.contrastText" }} />,
  Done: <CheckCircleIcon sx={{ color: "secondary.contrastText" }} />,
};

export { COLUMN_COLOR_ENUM, COLUMN_ICON_ENUM };
