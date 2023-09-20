import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "axronbv@gmai.com",
      password: "2008070107",
    },
    validationSchema: yup.object({
      email: yup.string().email("Elektron pochta kerak").required("tasdiqlandi"),
      password: yup
        .string("parol string bolishi lozim")
        .required(" tasdqilandi")
        .min(8, "minimum8ta"),
    }),
    onSubmit: (values) => {
      axios
        .post("https://reqres.in/api/login", values)
        .then(() => {
          formik.resetForm();
          navigate("/categories");
        })
        .catch(() => {
          toast.error("Error");
        });
    },
  });
  console.log(formik.touched);
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form className="container w-25 mt-4" onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">elektron pochta</label>
          <input
            type="email"
            id="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-danger">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="form-group mb-3">
          <input value="Send" type="submit" className="btn btn-primary w-100" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
