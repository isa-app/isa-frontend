import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { displayAlert } from "../utils/errors";
import { LOGIN_URL } from "../utils/constants";
import Loader from "../components/Loader";
import axios from "axios";
import "../assets/styles/components/Login.scss";

const inputTestValues = {
  id: "0000000040",
  password: "123456789",
};

const Login = (props) => {
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const { register, handleSubmit, errors } = useForm();

  const cancelRegister = useRef(null);

  useEffect(() => {
    // Component Unmount
    return () => {
      setIsUnmounted(true);
      if (cancelRegister.current)
        cancelRegister.current.cancel("Register Canceled");
    };
  }, []);

  const onSubmit = async (data) => {
    setIsButtonEnabled(false);

    cancelRegister.current = axios.CancelToken.source();

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken: cancelRegister.current.token,
      withCredentials: true,
    };

    const postObject = {
      identification: data.user,
      password: data.password,
    };

    let response;

    try {
      response = await axios.post(LOGIN_URL, postObject, options);
      if (response.status === 201);
      props.history.push(`/profile/${response.data.uid}`);

      //
    } catch (err) {
      if (!isUnmounted) {
        setIsButtonEnabled(true);
        if (err.response && err.response.status === 400)
          displayAlert("WRONG_ID_PASSWORD");
        else if (err.response && err.response.status === 500)
          displayAlert("SERVER_ERROR");
      }

      //
    }
  };

  const requiredFieldMessage = "Este campo es requerido";

  if (!isButtonEnabled) {
    return (
      <div className="loader container d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="content-center login container d-flex justify-content-center align-items-center">
      <div className="card mx-md-4 my-4 px-4 py-1 login-form">
        <div className="card-body p-0">
          {/* Form Login */}
          <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="pb-2 d-flex flex justify-content-center">
              Iniciar sesión
            </h2>

            {/* User */}
            <div className="form-row">
              <div className="form-group col-12">
                <label htmlFor="user">Número de identificación</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  className="form-control"
                  ref={register({ required: true })}
                  defaultValue={inputTestValues.id}
                />
                {errors.user && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="form-row">
              <div className="form-group col-12">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  ref={register({ required: true })}
                  defaultValue={inputTestValues.password}
                />
                {errors.password && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mt-4">
              <button
                type="submit"
                className="btn btn-primary px-5 register_submit_btn"
              >
                Entrar
              </button>
              <Link to="/register">
                <p className="register_to_login">Registro</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
//export default connect(null, mapDispatchToProps)(Login);
