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

    if (userFound) {
      console.log("bien");
      if(userFound.rol == "candidato"){
        window.location= "./workers.html";
      }else if(userFound.rol=="company"){
        window.location="./admin.html";
      }else{
        alert("No fue encontrado")
      }
    } else {
      console.log("mal");
    }

  } catch (error) {
    console.error("Error:", error);
  }
});