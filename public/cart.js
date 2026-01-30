document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const productsCartContainer = document.getElementById("cart-container");

  if (productsCartContainer && addToCartButtons.length > 0) {
    const userCartId = productsCartContainer.dataset.cartId;
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const productId = event.target.dataset.productId;

        if (!userCartId) {
          alert("You must be logged in to add items to the cart.");
          return;
        }

        try {
          const response = await fetch(
            `/api/carts/${userCartId}/product/${productId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                quantity: 1,
              }),
            },
          );
          if (response.ok) {
            alert("Product added to cart!");
          } else {
            const errorData = await response.json();
            alert(errorData.message || "Failed to add product to cart.");
          }
        } catch (error) {
          console.error("Error adding product to cart:", error);
          alert("An error occurred.");
        }
      });
    });
  }

  const deleteFromCartButtons = document.querySelectorAll(
    ".delete-product-button",
  );
  const cartViewContainer = document.querySelector("[data-cart-id]");

  if (cartViewContainer && deleteFromCartButtons.length > 0) {
    const userCartId = cartViewContainer.dataset.cartId;
    deleteFromCartButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        console.log("CLICKS");
        const productId = event.target.dataset.productId;
        try {
          const response = await fetch(
            `/api/carts/${userCartId}/products/${productId}`,
            {
              method: "DELETE",
            },
          );

          if (response.ok) {
            const productContainer = document.querySelector(
              `[data-product-container="${productId}"]`,
            );
            if (productContainer) {
              productContainer.remove();
            }
            alert("Product removed from cart!");
          } else {
            alert("Failed to remove product from cart.");
          }
        } catch (error) {
          console.error("Error removing product from cart:", error);
          alert("An error occurred.");
        }
      });
    });
  }
  const quantityInputs = document.querySelectorAll(".quantity-input");

  if (cartViewContainer && quantityInputs.length > 0) {
    const userCartId = cartViewContainer.dataset.cartId;
    quantityInputs.forEach((input) => {
      input.addEventListener("change", async (event) => {
        const productId = event.target.dataset.productId;
        const newQuantity = event.target.value;

        try {
          const response = await fetch(
            `/api/carts/${userCartId}/products/${productId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ quantity: newQuantity }),
            },
          );

          if (response.ok) {
            alert("Quantity updated successfully!");
          } else {
            const errorData = await response.json();
            alert(errorData.message || "Failed to update quantity.");
          }
        } catch (error) {
          console.error("Error updating quantity:", error);
          alert("An error occurred.");
        }
      });
    });
  }

  const purchaseButton = document.getElementById("purchase-button");
  if (cartViewContainer && purchaseButton) {
    const userCartId = cartViewContainer.dataset.cartId;
    purchaseButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`/api/carts/${userCartId}/purchase`, {
          method: "POST",
        });

        if (response.ok) {
          alert(
            "Purchase completed successfully! A confirmation email has been sent.",
          );
          window.location.reload();
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to complete the purchase.");
        }
      } catch (error) {
        console.error("Error during purchase:", error);
        alert("An error occurred during the purchase process.");
      }
    });
  }
});
