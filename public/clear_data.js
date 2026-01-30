/*truco para limpiar el localstorage más fácilmente*/
document.addEventListener("DOMContentLoaded", () => {
  const brandLogo = document.getElementById("brand-logo");
  if (brandLogo) {
    brandLogo.addEventListener("click", (event) => {
      console.log("Hzo click");
    });
    brandLogo.addEventListener("dblclick", (event) => {
      event.preventDefault();
      // Limpiar localStorage
      localStorage.clear();
      console.log("Local Storage cleared.");
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      console.log("Client-side cookies cleared.");

      alert("Local data and client-side cookies have been cleared.");
      window.location.reload();
    });
  }
});
