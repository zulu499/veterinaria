// cambiar seion y registro
function toggleForm() {
  const loginForm = document.getElementById('loginForm')
  const registerForm = document.getElementById('registerForm')
  const toggleButton = document.getElementById('toggleButton')
  const titleForm = document.getElementById('titleForm')

  if (loginForm.classList.contains('active')) {
    loginForm.classList.remove('active')
    registerForm.classList.add('active')
    toggleButton.textContent = 'Ya tienes una cuenta incia sesion'
    titleForm.textContent = 'Registrate'
  } else {
    registerForm.classList.remove('active')
    loginForm.classList.add('active')
    toggleButton.textContent = 'Crear cuenta'
    titleForm.textContent = 'Iniciar sesion'
  }
}
//handle para el registro
function handleRegister(event) {
  event.preventDefault()
  const email = document.getElementById('registerEmail').value
  const password = document.getElementById('registerContraseña').value
  const nombre = document.getElementById('registerName').value
  localStorage.setItem('userEmail', email)
  localStorage.setItem('userPassword', password)
  localStorage.setItem('userName', nombre)
  alert('registro exitoso')
  toggleForm()
}
// handle para el incio de sesion
function handleLogin(event) {
  event.preventDefault()
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginContraseña').value
  const emailGuardado = localStorage.getItem('userEmail')
  const passwordGuardado = localStorage.getItem('userPassword')
  if (email === emailGuardado && password === passwordGuardado) {
    alert('Inicio de seion exitosa')
    window.location.href = 'landing.html'
  } else {
    alert('usuario o contraseña incorrecta')
  }
}
// mostrar nombre el header
document.addEventListener('DOMContentLoaded', function () {
  const nombreGuardado = localStorage.getItem('userName')
  if (nombreGuardado) {
    document.getElementById(
      'userHeader'
    ).textContent = `Hola, ${nombreGuardado}`
  }
})

// Manejar opciones de pago
document.addEventListener('DOMContentLoaded', function () {
  const opcionEfectivo = document.getElementById('efectivo')
  const opcionTarjeta = document.getElementById('tarjeta')
  const tarjetaCredito = document.getElementById('tarjetaCredito')
  const tarjetaNumero = document.getElementById('tarjetaNumero')
  const fechaExpiracion = document.getElementById('fechaExpiracion')
  const cvc = document.getElementById('CVC')

  tarjetaNumero.required = false
  fechaExpiracion.required = false
  cvc.required = false

  opcionEfectivo.addEventListener('change', function () {
    if (this.checked) {
      tarjetaCredito.style.display = 'none'
      tarjetaNumero.required = false
      fechaExpiracion.required = false
      cvc.required = false
    }
  })

  opcionTarjeta.addEventListener('change', function () {
    if (this.checked) {
      tarjetaCredito.style.display = 'flex'
      tarjetaNumero.required = true
      fechaExpiracion.required = true
      cvc.required = true
    }
  })
})

//Manejar reserva
document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('reservaForm')
    .addEventListener('submit', function (event) {
      event.preventDefault()

      const nombreDueno = document.getElementById('dueno').value
      const nombreMascota = document.getElementById('mascota').value
      const tipoMascota = document.getElementById('tipoMascota').value
      const direccion = document.getElementById('direccion').value
      const fecha = document.getElementById('fecha').value
      const tipoPago = document.querySelector(
        'input[name="pago"]:checked'
      ).value
      const email = localStorage.getItem('userEmail')

      let reserva = {
        nombreDueno,
        nombreMascota,
        tipoMascota,
        direccion,
        fecha,
        tipoPago,
        email,
      }

      if (tipoPago === 'tarjeta') {
        const numeroTarjeta = document.getElementById('tarjetaNumero').value
        const fechaExpiracion = document.getElementById('fechaExpiracion').value
        const cvc = document.getElementById('CVC').value

        reserva = { ...reserva, numeroTarjeta, fechaExpiracion, cvc }
      }

      let reservas = JSON.parse(localStorage.getItem('reservas')) || {}
      if (!reservas[email]) {
        reservas[email] = []
      }
      reservas[email].push(reserva)
      localStorage.setItem('reservas', JSON.stringify(reservas))

      alert('Reserva guardada exitosamente')
    })
})

// Generar fecha aleatoria
function generarFechaAletoria() {
  const fechaActual = new Date()
  const fechaLimite = new Date(fechaActual)
  fechaLimite.setDate(fechaLimite.getDate() + 15)
  const fechaAletoria = new Date(
    fechaActual.getTime() + Math.random() * (fechaLimite - fechaActual)
  )
  return fechaAletoria.toISOString().split('T')[0]
}

//Manejar solicitud de examen
document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('examenForm')
    .addEventListener('submit', function (event) {
      event.preventDefault()
      const dueno = document.getElementById('dueno').value
      const mascota = document.getElementById('mascota').value
      const tipoMascota = document.getElementById('tipoMascota').value
      const tipoExamen = document.getElementById('tipoExamen').value
      const fecha = generarFechaAletoria()
      const email = localStorage.getItem('userEmail')

      let solicitudExamen = {
        dueno,
        mascota,
        tipoMascota,
        tipoExamen,
        fecha,
        email,
      }
      let examenes = JSON.parse(localStorage.getItem('examenes')) || {}
      if (!examenes[email]) {
        examenes[email] = []
      }
      examenes[email].push(solicitudExamen)
      localStorage.setItem('examenes', JSON.stringify(examenes))

      alert(`Solicitud de examen guardada para la fecha: ${fecha}`)
    })
})

// Mostrar en el visualizador

document.addEventListener("DOMContentLoaded", function () {
  const emailGuardado = localStorage.getItem("userEmail");
  
  const solicitudesExamen = JSON.parse(localStorage.getItem("examenes")) || {}; // Cambia "solicitudExamen" por "examenes"
  const solicitudesTableBody = document.getElementById("solicitudesTable").querySelector("tbody");

  const reservas = JSON.parse(localStorage.getItem("reservas")) || {}; // Cambia "reserva" por "reservas"
  const citasTableBody = document.getElementById("citasTable").querySelector("tbody");

  if (solicitudesExamen[emailGuardado] && solicitudesExamen[emailGuardado].length > 0) {
      solicitudesExamen[emailGuardado].forEach(solicitud => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${solicitud.dueno}</td>
              <td>${solicitud.mascota}</td>
              <td>${solicitud.tipoMascota}</td>
              <td>${solicitud.tipoExamen}</td>
              <td>${solicitud.fecha}</td>
          `;
          solicitudesTableBody.appendChild(row);
      });
  } else {
      solicitudesTableBody.innerHTML = "<tr><td colspan='5'>No hay solicitudes de exámenes.</td></tr>";
  }

  if (reservas[emailGuardado] && reservas[emailGuardado].length > 0) {
      reservas[emailGuardado].forEach(reserva => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${reserva.nombreDueno}</td>
              <td>${reserva.nombreMascota}</td>
              <td>${reserva.tipoMascota}</td>
              <td>${reserva.direccion}</td>
              <td>${reserva.fecha}</td>
              <td>${reserva.tipoPago}</td>
          `;
          citasTableBody.appendChild(row);
      });
  } else {
      citasTableBody.innerHTML = "<tr><td colspan='6'>No hay citas registradas.</td></tr>";
  }
});
