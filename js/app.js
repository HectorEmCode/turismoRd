/* ==========================================
   TURISMO RD
   Archivo: js/app.js
   Funciones e interactividad del sitio
========================================== */

/* ==========================================
   1. MENÚ DE NAVEGACIÓN MÓVIL
========================================== */

const botonMenu = document.getElementById("menu-btn");
const menuMovil = document.getElementById("menu-movil");

// Alterna la visibilidad del menú y devuelve su estado.
function alternarMenu(menu) {
    menu.classList.toggle("hidden");

    const estaAbierto = !menu.classList.contains("hidden");

    return estaAbierto;
}

if (botonMenu && menuMovil) {
    botonMenu.addEventListener("click", function () {
        const estaAbierto = alternarMenu(menuMovil);

        botonMenu.setAttribute("aria-expanded", String(estaAbierto));

        botonMenu.textContent = estaAbierto ? "×" : "☰";

        botonMenu.setAttribute(
            "aria-label",
            estaAbierto ? "Cerrar menú" : "Abrir menú",
        );
    });
}

/* ==========================================
   2. FUNCIONES DE VALIDACIÓN
========================================== */

// Comprueba que un campo no esté vacío.
function validarCampo(valor) {
    return valor.trim().length > 0;
}

// Comprueba el formato básico de un correo.
function validarCorreo(correo) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo.trim());
}

// Comprueba que el teléfono tenga entre 10 y 15 dígitos.
function validarTelefono(telefono) {
    const digitos = telefono.replace(/\D/g, "");

    return digitos.length >= 10 && digitos.length <= 15;
}

// Valida todos los datos y devuelve el resultado.
function validarFormulario(datos) {
    if (!validarCampo(datos.nombre)) {
        return {
            valido: false,
            mensaje: "Por favor, introduce tu nombre completo.",
        };
    }

    if (!validarCorreo(datos.correo)) {
        return {
            valido: false,
            mensaje: "Introduce un correo electrónico válido.",
        };
    }

    if (!validarTelefono(datos.telefono)) {
        return {
            valido: false,
            mensaje: "Introduce un teléfono válido de al menos 10 dígitos.",
        };
    }

    if (!validarCampo(datos.destino)) {
        return {
            valido: false,
            mensaje: "Selecciona un destino de interés.",
        };
    }

    if (!validarCampo(datos.mensaje)) {
        return {
            valido: false,
            mensaje: "Escribe un mensaje sobre tu viaje.",
        };
    }

    if (!datos.consentimiento) {
        return {
            valido: false,
            mensaje: "Debes aceptar el uso de tus datos.",
        };
    }

    return {
        valido: true,
        mensaje:
            "Formulario validado correctamente. Esta es una demostración académica; no se ha enviado ninguna solicitud.",
    };
}

/* ==========================================
   3. MENSAJES DEL FORMULARIO
========================================== */

function mostrarEstado(elemento, mensaje, esValido) {
    elemento.textContent = mensaje;

    elemento.className = esValido
        ? "mt-4 text-center text-sm text-[#40E0D0]"
        : "mt-4 text-center text-sm text-red-400";

    return esValido;
}

/* ==========================================
   4. FORMULARIO DE CONTACTO
========================================== */

const formularioContacto = document.getElementById("form-contacto");
const mensajeEstado = document.getElementById("mensaje-estado");

if (formularioContacto && mensajeEstado) {
    const campoNombre = document.getElementById("nombre");
    const campoCorreo = document.getElementById("correo");
    const campoTelefono = document.getElementById("telefono");
    const campoDestino = document.getElementById("destino");
    const campoMensaje = document.getElementById("mensaje");
    const campoConsentimiento = document.getElementById("consentimiento");

    // Tercer evento: valida el nombre mientras se escribe.
    campoNombre.addEventListener("input", function () {
        const nombre = campoNombre.value;

        if (validarCampo(nombre)) {
            mostrarEstado(
                mensajeEstado,
                "Nombre ingresado correctamente.",
                true,
            );
        } else {
            mostrarEstado(
                mensajeEstado,
                "El nombre no puede estar vacío.",
                false,
            );
        }
    });

    // Evento submit: comprueba todos los campos.
    formularioContacto.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const datos = {
            nombre: campoNombre.value,
            correo: campoCorreo.value,
            telefono: campoTelefono.value,
            destino: campoDestino.value,
            mensaje: campoMensaje.value,
            consentimiento: campoConsentimiento.checked,
        };

        const resultado = validarFormulario(datos);

        mostrarEstado(mensajeEstado, resultado.mensaje, resultado.valido);
    });
}

/* ==========================================
   5. MODO CLARO Y OSCURO
========================================== */

const botonTema = document.getElementById("theme-btn");

// Aplica el tema elegido y actualiza el botón.
function aplicarTema(tema) {
    const esClaro = tema === "light";

    document.documentElement.setAttribute(
        "data-theme",
        esClaro ? "light" : "dark",
    );

    if (botonTema) {
        botonTema.textContent = esClaro ? "🌙" : "☀️";

        botonTema.setAttribute(
            "aria-label",
            esClaro ? "Activar modo oscuro" : "Activar modo claro",
        );

        botonTema.setAttribute("aria-pressed", String(esClaro));
    }

    return esClaro;
}

// Recupera el tema guardado, si existe.
let temaGuardado = "dark";

try {
    temaGuardado = localStorage.getItem("turismo-tema") || "dark";
} catch (error) {
    // El sitio continúa funcionando si no hay almacenamiento.
}

aplicarTema(temaGuardado);

// Evento click para alternar los temas.
if (botonTema) {
    botonTema.addEventListener("click", function () {
        const temaActual = document.documentElement.getAttribute("data-theme");

        const nuevoTema = temaActual === "dark" ? "light" : "dark";

        aplicarTema(nuevoTema);

        try {
            localStorage.setItem("turismo-tema", nuevoTema);
        } catch (error) {
            // El cambio visual funciona aunque no se pueda guardar.
        }
    });
}
