document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form_create_product");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Submitting form...");
      const formData = new FormData(form);

      try {
        const response = await fetch("/api/products", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          alert("Producto creado con éxito");
          form.reset(); // Limpia el formulario
        } else {
          // Si el servidor devuelve un JSON con un mensaje de error
          alert(`Error: ${result.message || "No se pudo crear el producto."}`);
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Ocurrió un error de red. Por favor, intenta de nuevo.");
      }
    });
  }
});
