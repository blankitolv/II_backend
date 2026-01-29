const emailInput = document.getElementById("inputEmail");
const passwordInput = document.getElementById("inputPassword");
const submitButton = document.getElementById("submitButton");

function checkInputs() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  // se asigna a isFormValid el CONTRARIO de > si (email tiene algo) && (password tiene algo)
  // se asigna el contrario porque es más facil la asignación a `submitButton.disabled`
  const isFormValid = !(emailValue.length > 0 && passwordValue.length > 0);
  submitButton.disabled = isFormValid;
}
/*
  genero un evento, cada vez que teclea algo el evento input lanza @checkInputs
  valida si debe o no habilitar el
  botón de enviar el formulario
  */
emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

// esperamos el evento "load" para ejecutar por primera vez @checkInputs
window.addEventListener("load", checkInputs);
