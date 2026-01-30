const form = document.getElementById("signupForm");
const inputs = form.querySelectorAll("input[required]");
const submitButton = document.getElementById("submitButton");

function checkFormValidity() {
  let allRequiredFilled = true;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      allRequiredFilled = false;
    }
  });

  submitButton.disabled = !allRequiredFilled;
}

inputs.forEach((input) => {
  input.addEventListener("input", checkFormValidity);
});

window.addEventListener("load", checkFormValidity);

form.addEventListener("submit", async (event) => {
  event.preventDefault();

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
      window.location.href = result.redirect || "/current";
    } else {
      const errorContainer = document.querySelector(".alert.alert-danger");
      if (errorContainer) {
        errorContainer.textContent =
          result.message || "Error desconocido al registrarse.";
        errorContainer.style.display = "block";
      } else {
        alert(result.message || "Error desconocido al registrarse.");
      }
    }
  } catch (error) {
    console.error("Error al enviar el formulario de registro:", error);
    alert("Ocurrió un error de red. Por favor, intenta de nuevo.");
  }
});
