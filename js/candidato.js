const API_USERS = "http://localhost:3000/Users";
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo || usuarioActivo.rol !== "candidato") {
  Swal.fire("Error", "No has iniciado sesión o no eres candidato", "error").then(() => {
    window.location.href = "./login.html";
  });
}

const userId = usuarioActivo.id;

// Función para habilitar/deshabilitar edición
function toggleEditable(enable = true) {
  const inputs = document.querySelectorAll(
    "#personalForm input, #personalForm textarea, #onlineForm input"
  );
  inputs.forEach(input => {
    if (enable) input.removeAttribute("readonly");
    else input.setAttribute("readonly", true);
  });

  const toggle = document.getElementById("availableToggle");
  toggle.disabled = !enable;
}

// Función para cargar datos del usuario
async function loadUserData() {
  try {
    const res = await fetch(`${API_USERS}/${userId}`);
    if (!res.ok) throw new Error("Error cargando datos");
    const user = await res.json();

    // Header
    document.getElementById("fullName").textContent = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Nombre no definido";
    document.getElementById("titleProfession").textContent = user.profesion || "Profesión no definida";
    document.getElementById("lastUpdate").textContent = "Última actualización: hace un momento";

    // Personal
    document.getElementById("firstName").value = user.firstName || "";
    document.getElementById("lastName").value = user.lastName || "";
    document.getElementById("professionalTitle").value = user.profesion || "";
    document.getElementById("bioSummary").value = user.descripcion || "";

    // Online
    document.getElementById("emailAddress").value = user.correo || "";
    document.getElementById("phoneNumber").value = user.telefono || "";
    document.getElementById("linkedinURL").value = user.linkedin || "";
    document.getElementById("portfolioURL").value = user.portfolio || "";

    // Toggle
    document.getElementById("availableToggle").checked = !!user.availableForWork;

    // Bloquear edición por defecto
    toggleEditable(false);

  } catch (error) {
    Swal.fire("Error", "No se pudo cargar el perfil: " + error.message, "error");
  }
}

// Función para guardar cambios
async function saveUserData() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const descripcion = document.getElementById("bioSummary").value.trim();
  const telefono = document.getElementById("phoneNumber").value.trim();
  const linkedin = document.getElementById("linkedinURL").value.trim();
  const portfolio = document.getElementById("portfolioURL").value.trim();
  const available = document.getElementById("availableToggle").checked;

  if (!firstName || !lastName) {
    Swal.fire("Error", "Completa nombre y apellido", "warning");
    return;
  }

  const updateData = { firstName, lastName, descripcion, telefono, linkedin, portfolio, availableForWork: available };

  try {
    const res = await fetch(`${API_USERS}/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData)
    });
    if (!res.ok) throw new Error("Error actualizando perfil");

    Swal.fire("Éxito", "Perfil actualizado correctamente", "success");

    // Actualizar localStorage y recargar datos
    localStorage.setItem("usuarioActivo", JSON.stringify({ ...usuarioActivo, ...updateData }));
    await loadUserData(); // recarga datos y bloquea inputs

  } catch (error) {
    Swal.fire("Error", error.message, "error");
  }
}

// Eventos
document.getElementById("editProfileBtn").addEventListener("click", () => {
  toggleEditable(true);
  Swal.fire("Edit Profile", "Ahora puedes editar tus campos personales y presencia online.", "info");
});

document.getElementById("saveProfileBtn").addEventListener("click", saveUserData);

document.getElementById("discardBtn").addEventListener("click", async () => {
  await loadUserData();
  Swal.fire("Descartado", "Los cambios han sido descartados", "info");
});

// Cargar datos al inicio
window.addEventListener("DOMContentLoaded", loadUserData);