document.addEventListener("DOMContentLoaded", () => {
    console.log("Landing Page lista!");

    // Selección de elementos del DOM
    const form = document.getElementById("registro");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");

    // Validación del formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que la página se recargue

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        
        if (!validarNombre(nombre)) {
            alert("Por favor, ingresa un nombre válido (mínimo 3 caracteres).");
            return;
        }

        if (!validarEmail(email)) {
            alert("Ingresa un correo válido.");
            return;
        }

        alert("Formulario enviado con éxito!");
        form.reset(); // Reinicia los campos después de enviar
    });

    // Función para validar el nombre
    function validarNombre(nombre) {
        return nombre.length >= 3;
    }

    // Función para validar el email con regex
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Animación del botón CTA
    const ctaButton = document.querySelector(".btn");
    ctaButton.addEventListener("mouseover", () => {
        ctaButton.style.transform = "scale(1.1)";
    });

    ctaButton.addEventListener("mouseout", () => {
        ctaButton.style.transform = "scale(1)";
    });
});
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Landing Page lista!");

    // Selección de elementos del DOM
    const form = document.getElementById("registro");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");

    // Validación del formulario
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que la página se recargue

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        
        if (!validarNombre(nombre)) {
            alert("⚠️ Por favor, ingresa un nombre válido (mínimo 3 caracteres).");
            return;
        }

        if (!validarEmail(email)) {
            alert("⚠️ Ingresa un correo válido.");
            return;
        }

        alert("✅ Formulario enviado con éxito!");
        form.reset(); // Reinicia los campos después de enviar
    });

    // Función para validar el nombre
    function validarNombre(nombre) {
        return nombre.length >= 3;
    }

    // Función para validar el email con regex
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Animación del botón CTA
    const ctaButton = document.querySelector(".btn");
    ctaButton.addEventListener("mouseover", () => {
        ctaButton.style.transform = "scale(1.1)";
    });

    ctaButton.addEventListener("mouseout", () => {
        ctaButton.style.transform = "scale(1)";
    });
});
