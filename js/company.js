document.addEventListener("DOMContentLoaded", () => {

  const API_USERS = "http://localhost:3000/Users";
  const tableContainer = document.getElementById("tableContainer");
  const empresa = JSON.parse(localStorage.getItem("usuarioActivo"));
  const ESTADOS = ["pendiente", "contactado", "entrevista", "contratado", "descartado"];

  /* ===============================
     Validar sesión
  ================================= */
  if (!empresa || empresa.rol !== "company") {
    Swal.fire("Error", "Acceso no autorizado", "error")
      .then(() => window.location.href = "./login.html");
    return;
  }

  /* ===============================
     Cargar candidatos
  ================================= */
  async function getData() {
    try {
      const res = await fetch(API_USERS);
      const data = await res.json();
      render(data);
    } catch (error) {
      console.error("Error al cargar candidatos:", error);
    }
  }

  /* ===============================
     Render tabla
  ================================= */
  function render(candidatos) {
    tableContainer.innerHTML = "";

    candidatos.forEach(user => {
      if (user.rol === "candidato" && user.estado === "activo") {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${user.firstName || "-"}</td>
          <td>${user.lastName || "-"}</td>
          <td><span class="badge bg-primary-subtle text-primary">${user.profesion || "-"}</span></td>
          <td><span class="badge bg-success-subtle text-success">${user.estadoProceso || "pendiente"}</span></td>
          <td><a href="perfil_usuario.html?id=${user.id}" class="btn btn-sm btn-outline-light">Ver Perfil</a></td>
          <td></td>
        `;

        // Crear select para cambiar estado
        const tdSelect = tr.querySelector("td:last-child");
        const select = document.createElement("select");
        select.className = "form-select form-select-sm bg-dark text-light";

        ESTADOS.forEach(estado => {
          const option = document.createElement("option");
          option.value = estado;
          option.textContent = estado;
          if (estado === user.estadoProceso) option.selected = true;
          select.appendChild(option);
        });

        // Evento para cambiar estado
        select.addEventListener("change", () => changeEstado(user.id, select.value));

        tdSelect.appendChild(select);

        tableContainer.appendChild(tr);
      }
    });
  }

  /* ===============================
     Cambiar estado candidato
  ================================= */
  async function changeEstado(userId, nuevoEstado) {
    try {
      await fetch(`${API_USERS}/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estadoProceso: nuevoEstado })
      });
      Swal.fire("Actualizado", "Estado del candidato modificado", "success");
      getData();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar estado", "error");
    }
  }

  /* ===============================
     Perfil empresa
  ================================= */
  async function loadCompanyProfile() {
    try {
      const res = await fetch(`${API_USERS}/${empresa.id}`);
      const data = await res.json();

      document.getElementById("companyName").value = data.nombreEmpresa || "";
      document.getElementById("companyType").value = data.tipo || "";
      document.getElementById("companyDescription").value = data.descripcion || "";
      document.getElementById("companyEmail").value = data.correo || "";

      setCompanyEditable(false);

    } catch (error) {
      Swal.fire("Error", "No se pudo cargar perfil", "error");
    }
  }

  function setCompanyEditable(enable) {
    document.querySelectorAll("#companyForm input, #companyForm textarea")
      .forEach(input => input.readOnly = !enable);

    const saveBtn = document.getElementById("saveCompanyBtn");
    enable ? saveBtn.classList.remove("d-none") : saveBtn.classList.add("d-none");
  }

  async function saveCompanyProfile() {
    const updateData = {
      nombreEmpresa: document.getElementById("companyName").value.trim(),
      tipo: document.getElementById("companyType").value.trim(),
      descripcion: document.getElementById("companyDescription").value.trim()
    };

    try {
      await fetch(`${API_USERS}/${empresa.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData)
      });

      Swal.fire("Guardado", "Perfil actualizado", "success");
      setCompanyEditable(false);
      localStorage.setItem("usuarioActivo", JSON.stringify({ ...empresa, ...updateData }));

    } catch (error) {
      Swal.fire("Error", "No se pudo guardar", "error");
    }
  }

  /* ===============================
     Eventos
  ================================= */
  const perfilLink = document.querySelector('[data-bs-target="#companyProfileModal"]');
  if (perfilLink) {
    perfilLink.addEventListener("click", () => {
      loadCompanyProfile();
      new bootstrap.Modal(document.getElementById("companyProfileModal")).show();
    });
  }

  document.getElementById("editCompanyBtn").addEventListener("click", () => setCompanyEditable(true));
  document.getElementById("saveCompanyBtn").addEventListener("click", saveCompanyProfile);

  /* ===============================
     Init
  ================================= */
  getData();

});
