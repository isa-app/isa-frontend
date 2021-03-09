import Swal from "sweetalert2";

export function displayAlert(alertType) {
  const alert = {
    title: "",
    icon: "",
    confirmButtonText: "",
    position: "center",
  };

  switch (alertType) {
    case "ID_ALREADY_EXISTS":
      alert.title = "Este usuario ya existe";
      alert.icon = "warning";
      alert.confirmButtonText = "Intentar con otra ID";
      break;

    case "USER_NOT_FOUND":
      alert.title = "Este usuario ya existe";
      alert.icon = "warning";
      alert.confirmButtonText = "Intentar con otra ID";
      break;

    case "UNAUTHORIZED":
      alert.title = "No está autorizado";
      alert.icon = "warning";
      alert.confirmButtonText = "Debe iniciar sesión";
      break;

    case "FORBIDDEN":
      alert.title = "No tiene permisos";
      alert.icon = "error";
      alert.confirmButtonText = "Debe ingresar con la cuenta correcta";
      break;

    case "SERVER_ERROR":
      alert.title = "El servidor no está disponible";
      alert.icon = "error";
      alert.confirmButtonText = "Comuníquese con el administrador";
      break;

    case "WRONG_ID_PASSWORD":
      alert.title = "Credenciales incorrectas";
      alert.icon = "error";
      alert.confirmButtonText = "Intentelo nuevamente";
      break;

    default:
      break;
  }

  Swal.fire(alert);
}
