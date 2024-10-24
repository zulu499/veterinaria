// cambiar seion y registro
function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const toggleButton = document.getElementById("toggleButton");
  const titleForm = document.getElementById("titleForm");

  if (loginForm.classList.contains("active")) {
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
    toggleButton.textContent = "Ya tienes una cuenta incia sesion";
    titleForm.textContent = "Registrate";
  } else {
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
    toggleButton.textContent = "Crear cuenta";
    titleForm.textContent = "Iniciar sesion";
  }
}
//handle para el registro
function handleRegister(event) {
  event.preventDefault();
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerContraseña").value;
  const nombre = document.getElementById("registerName").value;
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  localStorage.setItem("userName", nombre);
  alert("registro exitoso");
  toggleForm();
}
// handle para el incio de sesion
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginContraseña").value;
  const emailGuardado = localStorage.getItem("userEmail");
  const passwordGuardado = localStorage.getItem("userPassword");
  if (email === emailGuardado && password === passwordGuardado) {
    alert("Inicio de seion exitosa");
    window.location.href = "landing.html";
  } else {
    alert("usuario o contraseña incorrecta");
  }
}
// mostrar nombre el header
document.addEventListener("DOMContentLoaded", function() {
    const nombreGuardado = localStorage.getItem("userName");
    if (nombreGuardado) {
      document.getElementById("userHeader").textContent = `Hola, ${nombreGuardado}`;
    }
  });

  //escuchar los cambios en las opciones de pago
  const opcionEfectivo = document.getElementById("efectivo");
  const opcionTarjeta = document.getElementById("tarjeta");
  const tarjetaCredito = document.getElementById("tarjetaCredito");
  console.log(opcionEfectivo,opcionTarjeta,tarjetaCredito)
  opcionEfectivo.addEventListener("change",function(){
    if(this.checked){
     tarjetaCredito.style.display="none"
    }
  })
  opcionTarjeta.addEventListener("change",function(){
    if(this.checked){
     tarjetaCredito.style.display="block"
    }
  })