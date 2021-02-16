import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../assets/styles/components/Register.scss";

const Register = (props) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isValidPassword, setisValidPassword] = useState(false);
  const [isMatchedPassword, setIsMatchedPassword] = useState(false);

  const { register, handleSubmit, errors, getValues } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
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

  return (
    <div className="container d-flex justify-content-center align-items-center my-2">
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

export default Register;
