const emailInput = document.getElementById("inputEmail");
const passwordInput = document.getElementById("inputPassword");
const submitButton = document.getElementById("submitButton");
const loginForm = document.getElementById("loginForm");
const errorMessageContainer = document.querySelector(".alert.alert-danger");

// función para habilitar o no el botón de submit
function checkInputs() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const isFormValid = !(emailValue.length > 0 && passwordValue.length > 0);
  submitButton.disabled = isFormValid;
}

emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

window.addEventListener("load", checkInputs);

// se agrega el evento submit al formulario de login
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch("/api/sessions/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (errorMessageContainer) {
        errorMessageContainer.style.display = "none";
      }

      if (response.ok && result.status === "success") {
        // Login exitoso, redirigir al usuario
        window.location.href = result.redirect;
      } else {
        if (errorMessageContainer) {
          errorMessageContainer.textContent =
            result.message || "Error desconocido al iniciar sesión.";
          errorMessageContainer.style.display = "block";
        } else {
          alert(result.message || "Error desconocido al iniciar sesión.");
        }
      }
    } catch (error) {
      console.error("Error al enviar el formulario de login:", error);
      if (errorMessageContainer) {
        errorMessageContainer.textContent =
          "Ocurrió un error de red. Por favor, intenta de nuevo.";
        errorMessageContainer.style.display = "block";
      } else {
        alert("Ocurrió un error de red. Por favor, intenta de nuevo.");
      }
    }
  });
}
