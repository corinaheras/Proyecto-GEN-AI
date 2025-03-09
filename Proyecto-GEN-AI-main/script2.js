document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const form = document.getElementById("formRegistro");

    // Mostrar modal
    openModal.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");
    });

    // Cerrar modal
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Validar y guardar en LocalStorage
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evitar recarga de la página

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const bootcampSelect = document.getElementById("bootcamp");
        const comentarios = document.getElementById("comentarios").value.trim();

        // Obtener los bootcamps seleccionados
        const bootcamps = Array.from(bootcampSelect.selectedOptions).map(option => option.value);

        // Validaciones
        if (nombre.length < 3) {
            alert("El nombre debe tener más de 3 caracteres.");
            return;
        }
        if (apellido.length < 3) {
            alert("El apellido debe tener más de 3 caracteres.");
            return;
        }
        if (!/^\d{10}$/.test(telefono)) {
            alert("El teléfono debe tener exactamente 10 dígitos.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            alert("Ingrese un correo válido.");
            return;
        }
        if (bootcamps.length === 0) {
            alert("Debe seleccionar al menos un bootcamp.");
            return;
        }
        if (comentarios.length > 0 && comentarios.length < 3) {
            alert("Si ingresa un comentario, debe tener más de 3 caracteres.");
            return;
        }

        // Crear objeto de datos
        const registro = {
            nombre,
            apellido,
            telefono,
            correo,
            bootcamps,
            comentarios: comentarios || "Sin comentarios"
        };

        console.log("Datos a guardar:", registro); // Verificar en consola que los datos sean correctos

        // Guardar datos en LocalStorage
        guardarEnLocalStorage(registro);

        alert("Registro exitoso. Los datos han sido guardados.");
        form.reset();
        modal.classList.add("hidden");
    });

    // Función para guardar en LocalStorage
    function guardarEnLocalStorage(datos) {
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        registros.push(datos);
        localStorage.setItem("registros", JSON.stringify(registros));
        console.log("Datos guardados en localStorage:", registros); // Verificar si realmente se guardan
    }
});
