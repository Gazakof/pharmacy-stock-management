document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Access denied.");
    window.location.href = "../login/login.html";
    return;
  }

  let medicines = [];
  let currentIndex = 0;

  async function fetchMedicines() {
    try {
      const response = await fetch("http://localhost:5000/medecines/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error while loading medecines.");
      }
      medicines = await response.json();
      displayMedecines(medicines);
    } catch (error) {
      console.log(error);
    }
  }

  function displayMedecines(medicines) {
    const tableBody = document.getElementById("medecine-list");
    tableBody.innerHTML = "";

    medicines.forEach((med) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td class="medecine-name">${med.name}</td>
            <td class="medecine-quantity">${med.quantity}</td>`;
      tableBody.appendChild(row);
    });
  }

  document.getElementById("onLogout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
  });

  fetchMedicines();
});
