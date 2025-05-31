import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

import { addUser } from "lib/slice/dashboard";

import { FormikDialogProps } from "./formikDialog.type";

const FormikDialog = ({
  onClose,

  selectedUser
}: FormikDialogProps) => {
  const formik = useFormik({
    initialValues: {
      first_name: selectedUser?.first_name || "",
      last_name: selectedUser?.last_name || "",
      email: selectedUser?.email || "",
      age: ""
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      first_name: yup.string().required("First Name is required"),
      last_name: yup.string().required("Last Name is required"),
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
      //   age: yup
      //     .number()
      //     .required("Age is required")
      //     .positive("Age must be positive")
      //     .integer("Age must be an integer")
      age: yup
        .number()
        .required("Age is required")
        .integer("Age must be an integer")
        .min(18, "Must be at least 18")
        .max(99, "Must be under 100")
      //   password: yup.string().min(8, "Min 8 characters").required(),
      //   confirmPassword: yup
      //     .string()
      //     .oneOf([yup.ref("password")], "Passwords must match")
      //     .required("Confirm your password"),
      //   bio: yup.string().max(200, "Bio must be under 200 characters")
    }),
    //     username: yup
    //     .string()
    //     .required("Username is required")
    //     .min(4, "Must be at least 4 characters")
    //     .matches(/^\S*$/, "No spaces allowed"),
    //   email: yup
    //     .string()
    //     .email("Invalid email format")
    //     .required("Email is required"),
    //   password: yup
    //     .string()
    //     .required("Password is required")
    //     .min(8, "Minimum 8 characters")
    //     .matches(/[0-9]/, "Must contain a number")
    //     .matches(/[A-Z]/, "Must contain an uppercase letter"),
    //   confirmPassword: yup
    //     .string()
    //     .oneOf([yup.ref("password")], "Passwords must match")
    //     .required("Confirm password is required"),
    //   age: yup
    //     .number()
    //     .required("Age is required")
    //     .min(18, "Must be at least 18")
    //     .max(60, "Must be under 60"),
    //   guardianEmail: yup.string().when("age", {
    //     is: age => age < 21,
    //     then: schema =>
    //       schema
    //         .required("Guardian email required if under 21")
    //         .email("Must be a valid email"),
    //     otherwise: schema => schema.notRequired()
    //   }),
    //   bio: yup
    //     .string()
    //     .max(200, "Bio must be under 200 characters")
    //     .notRequired(),
    //   terms: yup
    //     .boolean()
    //     .oneOf([true], "You must accept the terms and conditions")

    onSubmit: async values => {
      const body = {
        name: values.first_name,
        job: values.last_name,
        ...(selectedUser?.id && { id: selectedUser.id })
      };

      try {
        await addUser(body);
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: "500px",
          minHeight: "300px"
        }
      }}
    >
      <DialogTitle id="alert-dialog-title">Formik Dialog</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          id="first_name"
          name="first_name"
          label="First Name"
          margin="normal"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
        <TextField
          fullWidth
          id="last_name"
          name="last_name"
          label="Last Name"
          margin="normal"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="age"
          name="age"
          label="Age"
          type="number"
          margin="normal"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <Typography variant="h6" mt={3}>
          Preview
        </Typography>
        <Typography>First Name: {formik.values.first_name}</Typography>
        <Typography>Last Name: {formik.values.last_name}</Typography>
        <Typography>Email: {formik.values.email}</Typography>
        <Typography>Age: {formik.values.age}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={() => formik.handleSubmit()} type="submit">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FormikDialog;
