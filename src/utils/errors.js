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

    case "SERVER_ERROR":
      alert.title = "El servidor no está disponible";
      alert.icon = "error";
      alert.confirmButtonText = "Intentar de nuevo después";
      break;

    default:
      break;
  }

  Swal.fire(alert);
}
