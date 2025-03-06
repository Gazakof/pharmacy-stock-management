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
      const response = await fetch("http://localhost:5000/medicines/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error while loading medicines.");
      }
      medicines = await response.json();
      displayMedicines(medicines);
      if (medicines.length > 0) displayMedicineDetails(0);
    } catch (error) {
      console.log(error);
    }
  }

  function displayMedicines(medicines) {
    const tableBody = document.getElementById("medicine-list");
    tableBody.innerHTML = "";

    medicines.forEach((med, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td class="medicine-name">${med.name}</td>
            <td class="medicine-quantity">${med.quantity}</td>`;
      row.addEventListener("click", () => displayMedicineDetails(index));
      tableBody.appendChild(row);
    });
  }

  function displayMedicineDetails(index) {
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
      displayMedicineDetails(medicines.length - 1);
      return;
    }
    if (currentIndex > 0) displayMedicineDetails(--currentIndex);
  });

  document.getElementById("next-Btn").addEventListener("click", () => {
    if (currentIndex == medicines.length - 1) {
      displayMedicineDetails(0);
      return;
    }
    if (currentIndex < medicines.length - 1)
      displayMedicineDetails(++currentIndex);
  });

  document.getElementById("onLogout").addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "../login/login.html";
  });

  fetchMedicines();
});

function showModal() {
  let active = document.querySelector(".medicine-modal");
  active.classList.add("active-modal");
}

function closeModal() {
  let desactive = document.querySelector(".medicine-modal");
  desactive.classList.remove("active-modal");
}

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../login/login.html";
    return;
  }

  document
    .getElementById("modal-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const quantity = document.getElementById("quantity").value;
      const price = document.getElementById("price").value;
      const manufacturer = document.getElementById("manufacturer").value;
      const expiration = document.getElementById("expiration").value;

      const errMessage = document.getElementById("error-text");

      if (!name || !quantity || !price || !manufacturer || !expiration) {
        errMessage.textContent = "Fill all the fields please.";
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/medicines", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            quantity,
            price,
            manufacturer,
            expiration,
          }),
        });

        let data;

        try {
          data = await response.json();
          console.log(data);
        } catch (jsonError) {
          throw new Error("Server response invalid.");
        }

        document.getElementById("modal-form").reset();
        closeModal();
      } catch (err) {
        console.log("Server error!");
      }
    });
});
