document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resetForm");
  const passwordInput = document.getElementById("inputPassword");
  const confirmPasswordInput = document.getElementById("inputConfirmPassword");
  const submitButton = document.getElementById("submitButton");

  function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password && confirmPassword && password === confirmPassword) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
  passwordInput.addEventListener("input", validatePasswords);
  confirmPasswordInput.addEventListener("input", validatePasswords);
});
