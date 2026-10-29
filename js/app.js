/* ==========================================
   TURISMO RD
   Archivo: app.js
   Funciones e interactividad del sitio
========================================== */

/* ==========================================
   1. MENÚ DE NAVEGACIÓN MÓVIL
========================================== */

// Seleccionamos el botón hamburguesa por su ID.
const botonMenu = document.getElementById("menu-btn");

// Seleccionamos el contenedor de enlaces del menú móvil.
const menuMovil = document.getElementById("menu-movil");

// Cambia la visibilidad del menú y devuelve su nuevo estado.
function alternarMenu(menu) {
    menu.classList.toggle("hidden");

    // Si no tiene la clase hidden, el menú está abierto.
    const estaAbierto = !menu.classList.contains("hidden");

    return estaAbierto;
}

// Detecta el clic y actualiza el menú y el estado del botón.
botonMenu.addEventListener("click", function () {
    // Alternamos el menú y recibimos su nuevo estado.
    const estaAbierto = alternarMenu(menuMovil);

    // Actualizamos el estado accesible del botón.
    botonMenu.setAttribute("aria-expanded", String(estaAbierto));

    // Cambiamos el símbolo según el estado.
    botonMenu.textContent = estaAbierto ? "×" : "☰";

    // Actualizamos la descripción para lectores de pantalla.
    botonMenu.setAttribute(
        "aria-label",
        estaAbierto ? "Cerrar menú" : "Abrir menú",
    );
});
