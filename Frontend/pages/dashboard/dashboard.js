document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Access denied.");
    window.location.href = "../login/login.html";
    return;
  }

  async function fetchMedicines() {
    try {
      const response = await fetch("http://localhost:5000/medecines/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error while loading medecines.");
      }
      const medecines = await response.json();
      displayMedecines(medecines);
    } catch (error) {
      console.log(error);
    }
  }

  function displayMedecines(medecines) {
    const tableBody = document.getElementById("medecine-list");
    tableBody.innerHTML = "";

    medecines.forEach((med) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${med.name}</td>
            <td>${med.quantity}</td>
            <td>${med.price}</td>
            <td>
            <button onClick="editMedecine('${med._id}')">Edit</button>
            <button onClick="deleteMedecine('${med._id}')">Delete</button>
            </td>`;
      tableBody.appendChild(row);
    });
  }

  document.getElementById("onLogout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
  });

  fetchMedicines();
});
