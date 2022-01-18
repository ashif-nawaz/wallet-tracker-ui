import * as Yup from "yup";

const INITIAL_VALUES = {
  email: "test@test.com",
  password: "Test@123",
  captcha: "",
};

const VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email("Please enter a valid user email")
    .required("Email is required."),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  captcha: Yup.string().required("Captcha is required."),
});

export { INITIAL_VALUES, VALIDATION_SCHEMA };
