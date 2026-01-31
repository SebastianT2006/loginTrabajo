const API_USERS = "http://localhost:3000/Users";
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo || usuarioActivo.rol !== "candidato") {
  Swal.fire("Error", "No has iniciado sesión o no eres candidato", "error")
    .then(() => window.location.href = "./login.html");
}

const userId = usuarioActivo.id;

// Bloquear / habilitar inputs
function toggleEditable(enable = true) {
  const inputs = document.querySelectorAll(
    "#personalForm input, #personalForm textarea, #onlineForm input"
  );

  inputs.forEach(input => {
    if (input) enable ? input.removeAttribute("readonly") : input.setAttribute("readonly", true);
  });

  const toggle = document.getElementById("availableToggle");
  if (toggle) toggle.disabled = !enable;
}

// Cargar datos
async function loadUserData() {
  try {
    const res = await fetch(`${API_USERS}/${userId}`);
    if (!res.ok) throw new Error("Error cargando datos");

    const user = await res.json();

    document.getElementById("fullName").textContent =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Nombre no definido";

    document.getElementById("titleProfession").textContent =
      user.profesion || "Profesión no definida";

    const fields = {
      firstName: user.firstName,
      lastName: user.lastName,
      professionalTitle: user.profesion,
      bioSummary: user.descripcion,
      emailAddress: user.correo,
      phoneNumber: user.telefono,
      linkedinURL: user.linkedin,
      portfolioURL: user.portfolio
    };

    for (const [id, value] of Object.entries(fields)) {
      const el = document.getElementById(id);
      if (el) el.value = value || "";
    }

    const toggle = document.getElementById("availableToggle");
    if (toggle) toggle.checked = user.estado === "activo";

    toggleEditable(false);

  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
}

// Guardar datos
async function saveUserData() {
  const firstName = document.getElementById("firstName")?.value.trim();
  const lastName = document.getElementById("lastName")?.value.trim();

  if (!firstName || !lastName) {
    Swal.fire("Error", "Completa nombre y apellido", "warning");
    return;
  }

  const updateData = {
    firstName,
    lastName,
    descripcion: document.getElementById("bioSummary")?.value.trim() || "",
    telefono: document.getElementById("phoneNumber")?.value.trim() || "",
    linkedin: document.getElementById("linkedinURL")?.value.trim() || "",
    portfolio: document.getElementById("portfolioURL")?.value.trim() || "",
    estado: document.getElementById("availableToggle")?.checked ? "activo" : "inactivo"
  };

  try {
    const res = await fetch(`${API_USERS}/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData)
    });

    if (!res.ok) throw new Error("Error actualizando perfil");

    Swal.fire("Éxito", "Perfil actualizado correctamente", "success");
    localStorage.setItem("usuarioActivo", JSON.stringify({ ...usuarioActivo, ...updateData }));

    // Recargar datos en pantalla
    loadUserData();

  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
}

// Eventos
document.getElementById("editProfileBtn")?.addEventListener("click", () => {
  toggleEditable(true);
  Swal.fire("Edit Profile", "Ahora puedes editar tu información", "info");
});

document.getElementById("saveProfileBtn")?.addEventListener("click", saveUserData);
document.getElementById("discardBtn")?.addEventListener("click", loadUserData);

window.addEventListener("DOMContentLoaded", loadUserData);
