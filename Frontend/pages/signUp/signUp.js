document
  .getElementById("signUp")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullName = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const errorMsg = document.getElementById("error-text");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      let data;
      try {
        data = await response.json();
        console.log(data);
      } catch (jsonError) {
        throw new Error("Server response invalid.");
      }

      if (!response.ok) {
        if (data.msg.includes("Full name is required.")) {
          errorMsg.textContent = data.msg;
        } else if (
          data.msg.includes("User already exists.") ||
          data.msg.includes("Email invalid.")
        ) {
          errorMsg.textContent = data.msg;
        } else if (
          data.msg.includes("Password must be longer than 6 characters.")
        ) {
          errorMsg.textContent = data.msg;
        } else {
          console.log("An unexpected error.");
        }
        return;
      }
      localStorage.setItem("token", data.token);
      window.location.href = "../dashboard/dashboard.html";
    } catch (err) {
      console.log("Server Error!!");
    }
  });
