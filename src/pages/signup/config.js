import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const INITIAL_VALUES = {
  name: "Ashif Nawaz",
  email: "test@test.com",
  password: "Test@123",
};

const VALIDATION_SCHEMA = Yup.object({
  name: Yup.string()
    .min(3, "At least 3 character or more")
    .required("Name is required"),

  email: Yup.string()
    .email("Please enter a valid user email")
    .required("Email is required."),

  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export { INITIAL_VALUES, VALIDATION_SCHEMA };
