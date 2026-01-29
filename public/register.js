// Script de validación para habilitar/deshabilitar el botón
const form = document.getElementById("signupForm");
const inputs = form.querySelectorAll("input[required]");
const submitButton = document.getElementById("submitButton");

function checkFormValidity() {
  let allRequiredFilled = true;

  // Itera sobre todos los campos requeridos y verifica si tienen valor
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      allRequiredFilled = false;
    }
  });

  // Habilita el botón solo si todos los campos requeridos están llenos
  submitButton.disabled = !allRequiredFilled;
}

// Agrega un listener a cada campo para verificar la validez al escribir
inputs.forEach((input) => {
  input.addEventListener("input", checkFormValidity);
});

// Verifica la validez al cargar la página (útil si hay valores precargados)
window.addEventListener("load", checkFormValidity);
