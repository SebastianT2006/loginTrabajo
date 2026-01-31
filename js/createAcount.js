const API_USERS = "http://localhost:3000/Users";
const company = document.getElementById("inicio")
const candidato = document.getElementById("createAcount")

candidato.addEventListener("click", async function(){
const emailCandidato=document.getElementById("emailCandidato")
const passwordCandidato=document.getElementById("passwordCandidato")
const experiencia=document.getElementById("experiencia")
const profesion = document.getElementById("profesion")
if(emailCandidato.value=="" || passwordCandidato.value=="" ||experiencia.value==""||profesion.value==""){
 Swal.fire({
  title: "Error!",
  text: "Todos los campos son requeridos!",
  icon: "error"
});
    emailCandidato.classList.add("is-invalid");
    passwordCandidato.classList.add("is-invalid");
    experiencia.classList.add("is-invalid");
    profesion.classList.add("is-invalid");
    emailCandidato.classList.remove("is-valid");
    passwordCandidato.classList.remove("is-valid");
    experiencia.classList.remove("is-valid");
    profesion.classList.remove("is-valid");

}else{
 Swal.fire({
  title: "Good job!",
  text: "usuario agregado!",
  icon: "success"
});
    emailCandidato.classList.add("is-valid");
    passwordCandidato.classList.add("is-valid");
    experiencia.classList.add("is-valid");
    profesion.classList.add("is-valid");
    emailCandidato.classList.remove("is-invalid");
    passwordCandidato.classList.remove("is-invalid");
    experiencia.classList.remove("is-invalid");
    profesion.classList.remove("is-invalid");

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
emailCandidato.value = "";
passwordCandidato.value = "";
experiencia.value = "";
profesion.value = "";

}
});


company.addEventListener("click", async function(){
const emailCompany=document.getElementById("emailCompany")
const passwordCompany=document.getElementById("passwordCompany")
const tipeCompany=document.getElementById("tipeCompany")
const descripcionCompany=document.getElementById("descripcionCompany")
if(emailCompany.value=="" || passwordCompany.value=="" ||tipeCompany.value==""||descripcionCompany.value==""){
 Swal.fire({
  title: "Error!",
  text: "Todos los campos son requeridos!",
  icon: "error"
});
    emailCompany.classList.add("is-invalid");
    passwordCompany.classList.add("is-invalid");
    tipeCompany.classList.add("is-invalid");
    descripcionCompany.classList.add("is-invalid");
    emailCompany.classList.remove("is-valid");
    passwordCompany.classList.remove("is-valid");
    tipeCompany.classList.remove("is-valid");
    descripcionCompany.classList.remove("is-valid");

}else{
  Swal.fire({
  title: "Good job!",
  text: "usuario agregado!",
  icon: "success"
});
  emailCompany.classList.add("is-valid");
    passwordCompany.classList.add("is-valid");
    tipeCompany.classList.add("is-valid");
    descripcionCompany.classList.add("is-valid");
    emailCompany.classList.remove("is-invalid");
    passwordCompany.classList.remove("is-invalid");
    tipeCompany.classList.remove("is-invalid");
    descripcionCompany.classList.remove("is-invalid");


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
}


});

