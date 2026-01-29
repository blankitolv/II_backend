document.addEventListener("DOMContentLoaded", () => {
  const botonesEliminar = document.querySelectorAll(".delete-button");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          // Podés hacer un alert, recargar la página o eliminar el card del DOM
          document.getElementById(id).remove();
          console.log(`Producto ${id} eliminado`);
        } else {
          const err = await res.json();
          console.error("Error al eliminar:", err);
          alert("Error al eliminar producto");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error de conexión con el servidor");
      }
    });
  });
});
