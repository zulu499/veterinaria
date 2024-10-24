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
document.addEventListener("DOMContentLoaded", function () {
  const nombreGuardado = localStorage.getItem("userName");
  if (nombreGuardado) {
    document.getElementById(
      "userHeader"
    ).textContent = `Hola, ${nombreGuardado}`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const opcionEfectivo = document.getElementById("efectivo");
  const opcionTarjeta = document.getElementById("tarjeta");
  const tarjetaCredito = document.getElementById("tarjetaCredito");

  console.log(opcionEfectivo, opcionTarjeta, tarjetaCredito);

  opcionEfectivo.addEventListener("change", function () {
    if (this.checked) {
      tarjetaCredito.style.display = "none";
    }
  });

  opcionTarjeta.addEventListener("change", function () {
    if (this.checked) {
      tarjetaCredito.style.display = "flex";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("reservaForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const nombreDueno = document.getElementById("dueno").value;
      const nombreMascota = document.getElementById("mascota").value;
      const tipoMascota = document.getElementById("tipoMascota").value;
      const direccion = document.getElementById("direccion").value;
      const fecha = document.getElementById("fecha").value;
      const tipoPago = document.querySelector(
        'input[name="pago"]:checked'
      ).value;

      let reserva = {
        nombreDueno,
        nombreMascota,
        tipoMascota,
        direccion,
        fecha,
        tipoPago,
      };

      if (tipoPago === "tarjeta") {
        const numeroTarjeta = document.getElementById("tarjetaNumero").value;
        const fechaExpiracion =
          document.getElementById("fechaExpiracion").value;
        const cvc = document.getElementById("CVC").value;

        reserva = { ...reserva, numeroTarjeta, fechaExpiracion, cvc };
      }

      localStorage.setItem("reserva", JSON.stringify(reserva));

      alert("Reserva guardada exitosamente");
    });
});
function generarFechaAletoria() {
  const fechaActual = new Date();
  const fechaLimite = new Date(fechaActual);
  fechaLimite.setDate(fechaLimite.getDate() + 15);
  const fechaAletoria = new Date(
    fechaActual.getTime() + Math.random() * (fechaLimite - fechaActual)
  );
  return fechaAletoria.toISOString().split("T")[0];
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("examenForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const dueno = document.getElementById("dueno").value;
      const mascota = document.getElementById("mascota").value;
      const tipoMascota = document.getElementById("tipoMascosta").value;
      const tipoExamen = document.getElementById("tipoExamen").value;
      const fecha = generarFechaAletoria();
      let solicitudExamen = {
        dueno,
        mascota,
        tipoMascota,
        tipoExamen,
        fecha,
      };
      localStorage.setItem("solicitudExamen", JSON.stringify(solicitudExamen));
      alert("Solicitud de examen guardada");
    });
});
