import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerRequest } from "../actions";
import { displayAlert } from "../utils/errors";
import { REGISTER_URL } from "../utils/constants";
import axios from "axios";
import Loader from "../components/Loader";
import "../assets/styles/components/Register.scss";
import "../assets/styles/components/Loader.scss";

// const SLOW_REQUEST =
//   "http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk";

const inputTestValues = {
  firstName: "Larry",
  lastName: "Hudson",
  typeId: 13,
  id: "0000000030",
  phone: "+5964349",
  email: "betty@holberton.com",
  password: "123456789",
  passwordConfirmation: "123456789",
};

const Register = (props) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isValidPassword, setisValidPassword] = useState(false);
  const [isMatchedPassword, setIsMatchedPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [isUnmounted, setIsUnmounted] = useState(false);

  const { register, handleSubmit, errors, getValues } = useForm({});

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
    console.log(data);
    setIsButtonEnabled(false);

    cancelRegister.current = axios.CancelToken.source();

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken: cancelRegister.current.token,
    };

    const postObject = {
      name: data.firstName,
      lastName: data.lastName,
      idType: Number(data.typeId),
      identification: data.id,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };

    let response;

    try {
      response = await axios.post(REGISTER_URL, postObject, options);
      console.log(response.data);
      if (response.status === 201) props.registerRequest(data);
      // props.history.push("/");
      //
    } catch (err) {
      if (!isUnmounted) {
        setIsButtonEnabled(true);
        if (err.response && err.response.status === 400)
          displayAlert("ID_ALREADY_EXISTS");
        else if (err.response && err.response.status === 500)
          displayAlert("SERVER_ERROR");
      }

      //
    }
  };

  const validatePassword = () => {
    if (hasSubmitted) {
      const passwordInput = getValues("password");

      passwordInput.length === 0 || passwordInput.length >= 8
        ? setisValidPassword(true)
        : setisValidPassword(false);
    }
  };

  const validatePasswordMatch = () => {
    if (hasSubmitted) {
      if (getValues("password") === getValues("passwordConfirmation")) {
        setIsMatchedPassword(true);
      } else {
        setIsMatchedPassword(false);
      }
    }
  };

  const triggerPasswordMatch = () => {
    if (hasSubmitted) validatePasswordMatch();
  };

  const invalidPasswordMsg = "⚠ Mín. 8 Caracteres";
  const invalidPasswordConfirmationMsg = "⚠ No coincide";
  const requiredFieldMessage = "Este campo es requerido";

  if (!isButtonEnabled) {
    return (
      <div className="loader container d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="register container d-flex justify-content-center align-items-center my-2">
      <div className="card m-4 px-4 py-1">
        <div className="card-body p-0">
          <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="pb-2">Registro</h2>
            <div className="form-row">
              <div className="form-group col-12">
                <label htmlFor="inputNombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  id="inputNombre"
                  name="firstName"
                  ref={register({ required: true })}
                  defaultValue={inputTestValues.firstName}
                />
                {errors.firstName && errors.firstName.type === "required" && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-12 ">
                <label htmlFor="inputApellido">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  id="inputApellido"
                  name="lastName"
                  ref={register({ required: true })}
                  defaultValue={inputTestValues.lastName}
                />
                {errors.lastName && errors.lastName.type === "required" && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-12 col-md-6">
                <label htmlFor="tipo_id">Tipo de Identificación</label>
                <select
                  className="form-control mr-2"
                  id="tipo_id"
                  name="typeId"
                  ref={register({ required: true })}
                  defaultValue={inputTestValues.typeId}
                >
                  <option value=""></option>
                  <option value="13">Cédula de Ciudadanía</option>
                  <option value="22">Cédula de extranjería</option>
                  <option value="41">Pasaporte</option>
                </select>
                {errors.typeId && errors.typeId.type === "required" && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
              <div className="form-group col-12 col-md-6">
                <label htmlFor="inputIdentificacion">
                  Número de identificación
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  id="inputIdentificacion"
                  name="id"
                  ref={register({ required: true })}
                  defaultValue={inputTestValues.id}
                />
                {errors.id && errors.id.type === "required" && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-12 col-md-6">
                <label htmlFor="inputTelefono">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  id="inputTelefono"
                  name="phone"
                  ref={register({ required: true })}
                  defaultValue={inputTestValues.phone}
                />
                {errors.phone && errors.phone.type === "required" && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
              <div className="form-group col-12 col-md-6">
                <label htmlFor="emailInput">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  placeholder=""
                  name="email"
                  ref={register({ required: true })}
                  defaultValue={inputTestValues.email}
                />
                {errors.email && errors.email.type === "required" && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-12 col-md-6">
                <label htmlFor="passwordInput">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Mínimo 8 caracteres"
                  name="password"
                  onChange={triggerPasswordMatch}
                  onFocus={() => setisValidPassword(true)}
                  onBlur={validatePassword}
                  ref={register({
                    required: true,
                    validate: () => isValidPassword,
                  })}
                  defaultValue={inputTestValues.password}
                />
                {!isValidPassword &&
                  hasSubmitted &&
                  getValues("password").length !== 0 && (
                    <span className="required_message">
                      {invalidPasswordMsg}
                    </span>
                  )}
                {errors.password && errors.password.type === "required" && (
                  <span className="required_message">
                    {requiredFieldMessage}
                  </span>
                )}
              </div>
              <div className="form-group col-12 col-md-6">
                <label htmlFor="passwordConfirmationInput">
                  Confirma tu contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirmationInput"
                  placeholder="Mínimo 8 caracteres"
                  onFocus={() => setIsMatchedPassword(true)}
                  onBlur={validatePasswordMatch}
                  name="passwordConfirmation"
                  ref={register({
                    required: true,
                    validate: () => isMatchedPassword,
                  })}
                  defaultValue={inputTestValues.passwordConfirmation}
                />
                {!isMatchedPassword &&
                  hasSubmitted &&
                  getValues("passwordConfirmation").length !== 0 && (
                    <span className="required_message">
                      {invalidPasswordConfirmationMsg}
                    </span>
                  )}
                {errors.passwordConfirmation &&
                  errors.passwordConfirmation.type === "required" && (
                    <span className="required_message">
                      {requiredFieldMessage}
                    </span>
                  )}
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mt-4">
              <button
                type="submit"
                className="btn btn-primary px-5 register_submit_btn"
                onClick={() => {
                  setHasSubmitted(true);
                  validatePassword();
                }}
                disabled={!isButtonEnabled}
              >
                Enviar
              </button>
              <Link to="/login">
                <p className="register_to_login">¿Ya tienes una cuenta?</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  registerRequest,
};

// export default Register;
export default connect(null, mapDispatchToProps)(Register);
