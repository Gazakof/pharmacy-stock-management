document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailError = document.getElementsByClassName("email-error");
    const passwordError = document.getElementsByClassName("password-error");

    emailError.textContent = "";
    passwordError.textContent = "";

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.message.includes("User not found.")) {
          emailError.textContent = errorData.message;
          emailError.style.color = "red";
        } else if (errorData.message.includes("Enter a valid password.")) {
          passwordError.textContent = errorData.message;
          passwordError.style.color = "red";
        } else {
          console.log("Login error!");
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Login successfully!");
      window.location.href = "../dashboard/dashboard.html";
    } catch (err) {
      console.log("Server Error.");
    }
  });
