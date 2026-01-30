const API_USERS = "http://localhost:3000/Users";
const company = document.getElementById("inicio")
const candidato = document.getElementById("createAcount")

candidato.addEventListener("click", async function(){
const emailCandidato=document.getElementById("emailCandidato")
const passwordCandidato=document.getElementById("passwordCandidato")
const experiencia=document.getElementById("experiencia")
const profesion = document.getElementById("profesion")

    
    const nuevoUsuario = {
    correo: emailCandidato.value.trim(),
    password: passwordCandidato.value.trim(),
    profesion:profesion.value.trim(),
    experiencia:experiencia.value.trim(),
    rol:"candidato"
  };
   await fetch(API_USERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    });

});


company.addEventListener("click", async function(){
const emailCompany=document.getElementById("emailCompany")
const passwordCompany=document.getElementById("passwordCompany")
const tipeCompany=document.getElementById("tipeCompany")
const descripcionCompany=document.getElementById("descripcionCompany")
    const nuevoCompany = {
    correo: emailCompany.value.trim(),
    password: passwordCompany.value.trim(),
    tipo:tipeCompany.value.trim(),
    descripcion:descripcionCompany.value.trim(),
    rol:"company"
  };
   await fetch(API_USERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoCompany)
    });

});

