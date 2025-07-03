// Selecciona el botón de hamburguesa
const btn = document.querySelector(".menu-toggle");

// Selecciona el menú horizontal
const menu = document.querySelector(".menu-horizontal");

// Al hacer clic en el botón de hamburguesa
btn.addEventListener("click", () => {
  // Alterna (agrega o quita) la clase "active" en el menú
  // Esto hace que se muestre o se oculte
  menu.classList.toggle("active");

  // (opcional) También puedes alternar una clase en el botón si quieres cambiar su apariencia
  // btn.classList.toggle("open");
});

// Evento al enviar el formulario de contacto
/*document.getElementById("formularioContacto").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita el envío real del formulario

  // Muestra el mensaje de confirmación
  const mensaje = document.getElementById("mensajeEnviado");
  mensaje.style.display = "block";

  // Opcional: limpiar el formulario
  this.reset();

  // Ocultar mensaje después de 5 segundos
  setTimeout(() => {
    mensaje.style.display = "none";
  }, 5000);
});
*/

// VALIDACION DE FORMULARIO
const form = document.querySelector('form[name="frm"]');
form.addEventListener("submit", (event) => {
  const fname = form.elements["nombres"].value;
  const flastname = form.elements["apellidos"].value;
  const femail = form.elements["email"].value;
  const fphone = form.elements["telefono"].value;
  const fasunto = form.elements["asunto"].value;

  if (!fname || !flastname || !femail || !fphone || !fasunto) {
    event.preventDefault();
    alert("Por favor, complete todos los campos del formulario");
  } else if (!validateEmail(femail)) {
    event.preventDefault();
    alert("Por favor, ingrese un correo valido");
  } else {
    const confirmation = confirm(
      "Esta a punto de enviar el formulario, ¿Desea Continuar?"
    );
    if (!confirmation) {
      event.preventDefault();
    }
  }
});

// CREAR FUNCION validateEmail(femail)
function validateEmail(femail) {
  const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]/;
  return re.test(String(femail).toLowerCase());
}

// RANKING DE DEPORTISTAS
// Lista global
let athletesList = []; // Cambiado de coachesList a athletesList para reflejar deportistas

// Evento del formulario
document.getElementById("formularioDeportistas").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener datos
  const codigo = document.getElementById("codigoDeportista").value.trim();
  const nombre = document.getElementById("nombreDeportista").value.trim();
  const deporte = document.getElementById("deporte").value;
  const horasStr = document.getElementById("horasDeporte").value;
  const horas = Number(horasStr);

  // Validación
  if (
    codigo === "" ||
    nombre === "" ||
    deporte === "" ||
    horasStr === "" ||
    isNaN(horas) ||
    horas < 0 ||
    horas > 16 // Cambiado de 10 a 16 para reflejar horas de deporte
  ) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  // Agregar deportista
  const nuevo = { codigo, name: nombre, sport: deporte, hours: horas }; // Cambiado rating por hours
  athletesList.push(nuevo);

  // Orden descendente
  athletesList.sort((a, b) => b.hours - a.hours); // Cambiado rating por hours

  // Mostrar resultado
  mostrarRanking();

  // Limpiar formulario
  this.reset();
});

// Mostrar lista ordenada con barra
function mostrarRanking() {
  const lista = document.getElementById("rankingDeportistas");
  lista.innerHTML = "";

  athletesList.forEach((athlete) => {
    const li = document.createElement("li");
    li.className = "barra-progreso";

    const barra = document.createElement("div");
    barra.className = "progreso";
    barra.style.width = `${(athlete.hours / 16) * 100}%`; // Cambiado de /10 a /16 para reflejar el nuevo máximo

    const texto = document.createElement("span");
    texto.textContent = `${athlete.name} (${athlete.sport}) – Horas de Deporte: ${athlete.hours}`; // Cambiado Calificación por Horas de Deporte

    li.appendChild(barra);
    li.appendChild(texto);
    lista.appendChild(li);
  });
}