import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const DatePicker = ({ editable }) => {
  const formik = useFormikContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="date"
        name="date"
        value={editable ? editable.date : formik.values.date}
        onChange={(value) => {
          formik.setFieldValue("date", value.toISOString());
        }}
        renderInput={(params) => (
          <TextField {...params} fullWidth margin="normal" />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
