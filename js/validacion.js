import {tiposError, mensajes} from "./errores.js";

// Selecciona el botón "Enviar"
const submitButton = document.querySelector('form button[type="submit"]');

const camposDelFormulario = document.querySelectorAll("[required]");
console.log(camposDelFormulario);

let todosCamposValidos = true; // Variable para comprobar si todos los campos son válidos

camposDelFormulario.forEach((campo) => {
  campo.addEventListener("blur", () => verificarCampo(campo));
  campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarCampo(campo) {
  let mensaje = "";
  campo.setCustomValidity("");

  tiposError.forEach((error) => {
    if (campo.validity[error]) {
      mensaje = mensajes[campo.name][error];
    }
  });

  const mensajeError = campo.parentNode.querySelector(".mensaje-error");
  const validarInputCheck = campo.checkValidity();

  if (!validarInputCheck) {
    mensajeError.textContent = mensaje;
    //todosCamposValidos = false; // Si algún campo no es válido, desactivamos la variable
  } else {
    mensajeError.textContent = "";
  }
  // llamamos a verificarTodosCampos después de verificar cada! campo
  verificarTodosCampos();
}
//función verificarTodosCampos que verifica si todos los campos son válidos.
function verificarTodosCampos() {
  let todosCamposValidos = true; // Variable para comprobar si todos los campos son válidos
  camposDelFormulario.forEach((campo) => { //iteramos sobre todos los campos y verificamos si cada campo es válido utilizando checkValidity()
    if (!campo.checkValidity()) {//Si algún campo no es válido, establecemos todosCamposValidos en false.
      todosCamposValidos = false;
    }
  });

  if (todosCamposValidos) {
    submitButton.disabled = false;//habilitamos el botón "Enviar" solo si todosCamposValidos es true.
  } else {
    submitButton.disabled = true;
  }
}