document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logout-link");

  if (logoutLink) {
    logoutLink.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        const response = await fetch("/api/sessions/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
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
