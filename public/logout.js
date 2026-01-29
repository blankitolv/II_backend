document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logout-link");

  if (logoutLink) {
    logoutLink.addEventListener("click", async (event) => {
      event.preventDefault(); // Prevenir la navegación del enlace

      try {
        const response = await fetch("/api/sessions/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // No es necesario un body para el logout, pero se incluye por consistencia si fuera necesario
          body: JSON.stringify({}), 
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
          // El cliente se encarga de la redirección
          window.location.href = result.redirect;
        } else {
          alert(result.message || "Failed to log out.");
        }
      } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred during logout.");
      }
    });
  }
});