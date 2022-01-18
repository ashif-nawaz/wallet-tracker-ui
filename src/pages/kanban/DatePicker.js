import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const DatePicker = ({ editable }) => {
  const formik = useFormikContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Deadline"
        name="deadline"
        value={editable ? editable.item.deadline : formik.values.deadline}
        onChange={(value) => {
          formik.setFieldValue("deadline", value.toISOString());
        }}
        renderInput={(params) => (
          <TextField {...params} fullWidth margin="normal" />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
