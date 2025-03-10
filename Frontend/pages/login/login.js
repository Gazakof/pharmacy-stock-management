document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const errorMsg = document.getElementById("error-text");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
        console.log(data.msg);
      } catch (jsonError) {
        throw new Error("Server response invalid.");
      }

      if (!response.ok) {
        if (data.msg.includes("User not found.")) {
          errorMsg.textContent = data.msg;
        } else if (data.msg.includes("Enter a valid password.")) {
          errorMsg.textContent = data.msg;
        } else {
          console.log("An unexpected error.");
        }
        return;
      }

      localStorage.setItem("token", data.token);
      console.log("Login successfully!");
      window.location.href = "../dashboard/dashboard.html";
    } catch (err) {
      console.log(err);
    }
  });
