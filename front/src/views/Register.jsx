import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateRegister } from "../../helpers/validation";
import styles from "../styles/register.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/slices/atuhSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const Register = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.errors);
  const navigation = useNavigate();
  useEffect(() => {
    if (authenticated) {
      Swal.fire({title: "Register", text: "Registration successful", icon: "success", timer: 3000, allowEscapeKey: true, allowOutsideClick: true, allowEnterKey: true, stopKeydownPropagation: true }).then(() => {
        navigation("/myturns");
      });
    }
    if( error !== null) {
      const message = error.response.data;
      Swal.fire({title: "Register", text: message, icon: "error", timer: 3000, allowEscapeKey: true, allowOutsideClick: true, allowEnterKey: true, stopKeydownPropagation: true});
    }
  }, [authenticated, navigation, error]);


  return (
    <div className=" top-0 z-[-2] h-screen w-screen transform bg-rose-400 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] ">
      <div className="w-full h-screen flex justify-center items-center">
        <Formik
          initialValues={{
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
            username: "",
            password: "",
          }}
          validate={(values) => validateRegister(values)}
          onSubmit={(values, { resetForm }) => {
            dispatch(signupUser(values));
            resetForm();
          }}
        >
          {() => (
            <div className={styles.wrapper}>
              <div className={styles.box}>
                <h2>Create Account</h2>
                <Form className={styles.form}>
                  <div className={styles.login}>
                    <div className={styles.form_group}>
                      <label className={styles.label} htmlFor="name">
                        Name
                      </label>
                      <Field
                        className={styles.input}
                        id="name"
                        name="name"
                        placeholder="name"
                      />
                      <ErrorMessage name="name" component="div" />
                    </div>
                    <div className={styles.form_group}>
                      <label className={styles.label} htmlFor="email">
                        Email
                      </label>
                      <Field
                        className={styles.input}
                        id="email"
                        name="email"
                        placeholder="email"
                        type="email"
                      />
                      <ErrorMessage name="email" component="div" />
                    </div>
                    <div className={styles.form_group}>
                      <label className={styles.label} htmlFor="birthdate">
                        Birthdate
                      </label>
                      <Field
                        className={styles.input}
                        id="birthdate"
                        name="birthdate"
                        placeholder="birthdate"
                        type="date"
                      />
                      <ErrorMessage name="birthdate" component="div" />
                    </div>
                    <div className={styles.form_group}>
                      <label className={styles.label} htmlFor="nDni">
                        nDni
                      </label>
                      <Field
                        className={styles.input}
                        id="nDni"
                        name="nDni"
                        placeholder="nDni"
                        type="number"
                      />
                      <ErrorMessage name="nDni" component="div" />
                    </div>
                    <div className={styles.form_group}>
                      <label className={styles.label} htmlFor="email">
                        Username
                      </label>
                      <Field
                        className={styles.input}
                        id="username"
                        name="username"
                        placeholder="username"
                      />
                      <ErrorMessage name="username" component="div" />
                    </div>
                    <div className={styles.form_group}>
                      <label className={styles.label} htmlFor="password">
                        Password
                      </label>
                      <Field
                        className={styles.input}
                        id="password"
                        name="password"
                        placeholder="password"
                        type="password"
                        
                      />
                      <ErrorMessage name="password" component="div" />
                    </div>
                  </div>
                  <div className={styles.button}>
                    <button type="submit" className={styles.btn}>
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
