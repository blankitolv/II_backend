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

// Manejar el envío del formulario con fetch
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitar el envío tradicional del formulario

  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok) {
      // Asumiendo que el servidor devuelve un token en un campo como 'token'
      // o que la redirección se gestiona de otra manera en el backend.
      // Si la respuesta es un JSON de éxito sin redirección automática,
      // podrías redirigir manualmente:
      window.location.href = result.redirect || "/current";
    } else {
      // Mostrar mensaje de error si la respuesta no es OK
      const errorContainer = document.querySelector(".alert.alert-danger");
      if (errorContainer) {
        errorContainer.textContent = result.message || "Error desconocido al registrarse.";
        errorContainer.style.display = "block"; // Asegurar que el alert sea visible
      } else {
        alert(result.message || "Error desconocido al registrarse.");
      }
    }
  } catch (error) {
    console.error("Error al enviar el formulario de registro:", error);
    alert("Ocurrió un error de red. Por favor, intenta de nuevo.");
  }
});