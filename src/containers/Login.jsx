import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../assets/styles/components/Login.scss";

const axios = require('axios');

const Login = () => {
  const [submitted, setSubmitted] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data)

    axios.post('http://54.172.72.74:4000/api/auth', {
      identification: data.user,
      password: data.password
    })
      .then(function (response) {
        console.log(response);
        setSubmitted("400")

      })
      .catch(function (error) {
        setSubmitted("500")

      });
  }

  const requiredFieldMessage = "Este campo es requerido";

  return (
    <div className="container d-flex justify-content-center align-items-center my-2">
      <div className="card m-4 px-4 py-1">
        <div className="card-body p-0">

          {/* Form Login */}
          <form className="m-3 login" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="pb-2 d-flex flex justify-content-center">Login</h2>

            {/* User */}
            <div className="form-row">
              <div className="form-group col-12">
                <label htmlFor="user">Número de identificación</label>
                <input type='text' id="user" name="user" className="form-control" ref={register({ required: true })}
                />
                {errors.user && <span className="required_message">
                  {requiredFieldMessage}
                </span>}
              </div>
            </div>

            {/* Password */}
            <div className="form-row">
              <div className="form-group col-12">
                <label htmlFor='password'>Contraseña</label>
                <input type='password' id="password" name="password" className="form-control" ref={register({ required: true })}
                />
                {errors.password && <span className="required_message">
                  {requiredFieldMessage}
                </span>}
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
              <Link to="/register" >
                <p className="register_to_login">Registro</p>
              </Link>
            </div>
            {submitted === "500" && <span className="required_message">
              {"Intentalo mas tarde"}
            </span>}
            {submitted === "400" && <span className="required_message">
              {"Credenciales invalidas"}
            </span>}

          </form>
        </div>
      </div >
    </div >
  );
};

export default Login;
