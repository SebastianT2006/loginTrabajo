const API_USERS = "http://localhost:3000/Users";
const inicio = document.getElementById("inicio");

inicio.addEventListener("click", async function () {
  const email = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const resUsers = await fetch(API_USERS);
    const users = await resUsers.json();

    const userFound = users.find(
      user => user.correo === email && user.password === password
    );

    if (!userFound) {
      Swal.fire("Error", "Correo o contraseña incorrectos", "error");
      return;
    }

    // 👉 guardar sesión (simple)
    localStorage.setItem("usuarioActivo", JSON.stringify(userFound));

    // 👉 redirección por rol
    if (userFound.rol === "candidato") {
      window.location.href = "./candidato.html";
    } else if (userFound.rol === "company") {
      window.location.href = "./admin.html";
    }

  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Error", "Algo salió mal", "error");
  }
});
