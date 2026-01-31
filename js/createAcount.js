const API_USERS = "http://localhost:3000/Users";

const btnCandidato = document.getElementById("createAcount");
const btnCompany = document.getElementById("inicio");

// ======================
// REGISTRO CANDIDATO
// ======================
btnCandidato.addEventListener("click", async () => {
  const email = document.getElementById("emailCandidato").value.trim();
  const password = document.getElementById("passwordCandidato").value.trim();
  const experiencia = document.getElementById("experiencia").value.trim();
  const profesion = document.getElementById("profesion").value.trim();
  const firstName = document.getElementById("firstName")?.value.trim() || "-";
  const lastName = document.getElementById("lastName")?.value.trim() || "-";

  if (!email || !password || !experiencia || !profesion) {
    Swal.fire("Error", "Todos los campos son requeridos", "error");
    marcarCamposInvalidos([email, password, experiencia, profesion]);
    return;
  }

  try {
    const res = await fetch(API_USERS);
    const users = await res.json();

    if (users.find(u => u.correo === email)) {
      Swal.fire("Error", "Este correo ya está registrado", "error");
      return;
    }

    const nuevoUsuario = {
      id: crypto.randomUUID(),
      correo: email,
      password,
      firstName,
      lastName,
      profesion,
      experiencia,
      rol: "candidato",
      estado: "activo",
      estadoProceso: "pendiente"
    };

    await fetch(API_USERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    });

    Swal.fire("Registrado", "Candidato creado correctamente", "success");
    limpiarCampos(["emailCandidato", "passwordCandidato", "experiencia", "profesion", "firstName", "lastName"]);

  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Error", "No se pudo registrar al candidato", "error");
  }
});

// ======================
// REGISTRO EMPRESA
// ======================
btnCompany.addEventListener("click", async () => {
  const email = document.getElementById("emailCompany").value.trim();
  const password = document.getElementById("passwordCompany").value.trim();
  const tipo = document.getElementById("tipeCompany").value.trim();
  const descripcion = document.getElementById("descripcionCompany").value.trim();
  const nombreEmpresa = document.getElementById("nombreEmpresa")?.value.trim() || "Empresa";

  if (!email || !password || !tipo || !descripcion) {
    Swal.fire("Error", "Todos los campos son requeridos", "error");
    marcarCamposInvalidos([email, password, tipo, descripcion]);
    return;
  }

  try {
    const res = await fetch(API_USERS);
    const users = await res.json();

    if (users.find(u => u.correo === email)) {
      Swal.fire("Error", "Este correo ya está registrado", "error");
      return;
    }

    const nuevaEmpresa = {
      id: crypto.randomUUID(),
      correo: email,
      password,
      nombreEmpresa,
      tipo,
      descripcion,
      rol: "company"
    };

    await fetch(API_USERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaEmpresa)
    });

    Swal.fire("Registrado", "Empresa creada correctamente", "success");
    limpiarCampos(["emailCompany", "passwordCompany", "tipeCompany", "descripcionCompany", "nombreEmpresa"]);

  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Error", "No se pudo registrar la empresa", "error");
  }
});

// ======================
// FUNCIONES AUXILIARES
// ======================
function marcarCamposInvalidos(campos) {
  campos.forEach(c => {
    const input = typeof c === "string" ? document.getElementById(c) : c;
    if (input) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    }
  });
}

function limpiarCampos(campos) {
  campos.forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = "";
    if (input) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });
}


