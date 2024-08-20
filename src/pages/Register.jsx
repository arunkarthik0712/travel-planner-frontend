import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(
        8,
        "Password must contain 8 or more characters with one special character"
      )
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const res = await axiosInstance.post(`/api/auth/register`, values);
      setSubmitting(false);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      setSubmitting(false);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center items-center space-y-6 w-[85%] md:w-[30%] p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-teal-600 w-full">
            Create an account
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form className="w-full space-y-5">
                <div>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border-2 border-teal-300 rounded-md focus:border-teal-500 outline-none"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border-2 border-teal-300 rounded-md focus:border-teal-500 outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border-2 border-teal-300 rounded-md focus:border-teal-500 outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 border-2 border-teal-300 rounded-md focus:border-teal-500 outline-none"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 text-lg font-bold text-white bg-teal-600 rounded-full hover:bg-teal-500 transition-all"
                >
                  {isSubmitting ? <Loader /> : "Register"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center items-center space-x-2">
            <p className="text-teal-600">Already have an account?</p>
            <Link to="/login" className="text-teal-600 hover:text-teal-800">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
