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
      if (medicines.length > 0) displayMedecineDetails(0);
    } catch (error) {
      console.log(error);
    }
  }

  function displayMedecines(medicines) {
    const tableBody = document.getElementById("medecine-list");
    tableBody.innerHTML = "";

    medicines.forEach((med, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td class="medecine-name">${med.name}</td>
            <td class="medecine-quantity">${med.quantity}</td>`;
      row.addEventListener("click", () => displayMedecineDetails(index));
      tableBody.appendChild(row);
    });
  }

  function displayMedecineDetails(index) {
    if (medicines.length === 0) return;

    currentIndex = index;
    const med = medicines[index];

    const date = new Date(med.expiration);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    document.getElementById("content-title").textContent = med.name;
    document.getElementById("medicine-name").textContent = med.name;
    document.getElementById("medicine-manufacturer").textContent =
      med.manufacturer;
    document.getElementById("medicine-price").textContent = `${med.price}€`;
    document.getElementById(
      "medicine-expiration"
    ).textContent = `Expiration: ${formattedDate}`;
    document.getElementById("medicine-number").textContent = med.quantity;
  }

  document.getElementById("prev-Btn").addEventListener("click", () => {
    if (currentIndex == 0) {
      displayMedecineDetails(medicines.length - 1);
      return;
    }
    if (currentIndex > 0) displayMedecineDetails(--currentIndex);
  });

  document.getElementById("next-Btn").addEventListener("click", () => {
    if (currentIndex == medicines.length - 1) {
      displayMedecineDetails(0);
      return;
    }
    if (currentIndex < medicines.length - 1)
      displayMedecineDetails(++currentIndex);
  });

  document.getElementById("onLogout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
  });

  fetchMedicines();
});
