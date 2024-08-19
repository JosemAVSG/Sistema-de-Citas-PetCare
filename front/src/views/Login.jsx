import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../../helpers/validation";
import styles from "../styles/login.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../redux/slices/atuhSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import mujer from '../assets/moda-joven-posando-perro.webp';
import { cleanError } from "../redux/slices/atuhSlice";
const Login = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.errors);
  const navigation = useNavigate();

  useEffect(() => {
    if (authenticated) {
      Swal.fire({title: "Login", text: "Login successful", icon: "success", timer: 3000}).then(() => {
        navigation("/myturns");
      });
    }
    if( error !== null) {
      const message = error?.response?.data;
      Swal.fire({title: "Login", text: message || "Login failed", icon: "error", timer: 8000,}).then(() => {
        dispatch(cleanError());
      });
    }
  }, [authenticated, navigation, error, dispatch]);
  return (
    <>
      <section className=" top-0 z-[-2] h-screen transform bg-rose-400 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] ">
        <div className="flex h-full flew-wrap justify-center items-center lg:justify-between">
          <div className="md:mb-0 md:w-8/12 " >
            <img
            src={mujer}
              className={`w-full h-screen ${styles.img}`}
              alt="login Form img"
            />
          </div>
          <div className="md:w-8/12 lg:ms-6 lg:w-6/12 ">
            <Formik
              initialValues={{ username: "", password: "" }}
              validate={(values) => validateLogin(values)}
              onSubmit={(values, { resetForm }) => {
                dispatch(signinUser(values));
                if(error !== null) return;
                resetForm();
              }}
            >
              {() => (
                <div className={styles.container}>
                  <div className={styles.wrapper}>
                    <div className={styles.box}>
                      <Form className={styles.login}>
                        <h2>Login</h2>
                        <div className={styles.form_group}>
                          <label className={styles.label} htmlFor="username">
                            Username
                          </label>
                          <Field
                            id="username"
                            name="username"
                            placeholder="username"
                            className={styles.input}
                          />
                          <ErrorMessage
                            className={styles.error}
                            name="username"
                            component="div"
                          />
                        </div>
                        <div className={styles.form_group}>
                          <label className={styles.label} htmlFor="password">
                            Password
                          </label>
                          <Field
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            className={styles.input}
                          />
                          <ErrorMessage
                            className={styles.error}
                            name="password"
                            component="div"
                          />
                        </div>
                        <button  type="submit" className={styles.btn}>
                          Login
                        </button>
                        <div className={styles.register}>
                          <p>Don´t have an account? </p>
                          <Link to="/register">Register</Link>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
