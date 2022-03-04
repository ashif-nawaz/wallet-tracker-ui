import * as Yup from "yup";

const INITIAL_VALUES = {
  title: "",
  date: new Date().toISOString(),
  amount: 0,
  description: "",
};

const VALIDATION_SCHEMA = Yup.object({
  title: Yup.string()
    .min(3, "At least 3 character or more")
    .required("Name is required"),
  date: Yup.string(),

  amount: Yup.string(),
  description: Yup.string(),
});

export { INITIAL_VALUES, VALIDATION_SCHEMA };
