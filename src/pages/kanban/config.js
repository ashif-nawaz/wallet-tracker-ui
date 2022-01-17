import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const INITIAL_VALUES = {
  name: "",
  deadline: new Date().toISOString(),
  priority: "high",
};

const VALIDATION_SCHEMA = Yup.object({
  name: Yup.string()
    .min(3, "At least 3 character or more")
    .required("Name is required"),
  deadline: Yup.string(),
  // .min(3, "At least 3 character or more")
  // .required("Username is required"),
  priority: Yup.string(),
  // .email("Please enter a valid user email")
  // .required("Email is required."),
});

export { INITIAL_VALUES, VALIDATION_SCHEMA };
