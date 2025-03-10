document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const modalHeader = document.getElementById("modalHeader");
    const openModal = document.getElementById("openModal");
    const closeButtons = document.querySelectorAll("#closeModal"); // Seleccionar TODOS los botones de cierre
    const form = document.getElementById("formRegistro");
    const recomendacion = document.getElementById("recomendacion");
    const btnRecomendar = document.getElementById("btnRecomendar");

    // Función para centrar el modal y evitar que se mueva después
    function centrarModal() {
        requestAnimationFrame(() => {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            const modalHeight = modalContent.offsetHeight;
            const modalWidth = modalContent.offsetWidth;

            let topPosition = Math.max(20, (windowHeight - modalHeight) / 2);
            let leftPosition = Math.max(20, (windowWidth - modalWidth) / 2);

            modalContent.style.position = "absolute";
            modalContent.style.left = `${leftPosition}px`;
            modalContent.style.top = `${topPosition}px`;
            modalContent.style.transform = "none"; // Asegurar que no haya transformaciones que lo muevan
        });
    }

    // Mostrar modal y centrarlo correctamente
    openModal.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");

        // Esperar un pequeño tiempo para que el modal se renderice y luego centrarlo
        setTimeout(centrarModal, 50);
    });

    // Función para cerrar el modal
    function cerrarModal() {
        modal.classList.add("hidden");
    }

    // Asignar evento a todos los botones de cerrar
    closeButtons.forEach(button => {
        button.addEventListener("click", cerrarModal);
    });


    // Hacer la ventana arrastrable (movimiento completo en X y Y)
    modalHeader.addEventListener("mousedown", (e) => {
        e.preventDefault();

        let startX = e.clientX;
        let startY = e.clientY;
        let startLeft = modalContent.offsetLeft;
        let startTop = modalContent.offsetTop;

        function onMouseMove(e) {
            let newLeft = startLeft + (e.clientX - startX);
            let newTop = startTop + (e.clientY - startY);

            // Límites para evitar que se salga de la pantalla
            const maxRight = window.innerWidth - modalContent.offsetWidth - 20;
            const maxBottom = window.innerHeight - modalContent.offsetHeight - 10;

            newLeft = Math.max(10, Math.min(newLeft, maxRight));
            newTop = Math.max(10, Math.min(newTop, maxBottom));

            modalContent.style.left = `${newLeft}px`;
            modalContent.style.top = `${newTop}px`;
        }

        // Agregar eventos al mover el mouse
        document.addEventListener("mousemove", onMouseMove);

        // Remover eventos cuando se suelte el mouse
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMouseMove);
        }, { once: true });

    });

    // Evitar comportamiento extraño al arrastrar
    modalHeader.ondragstart = () => false;

    // Validar y guardar en LocalStorage
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const bootcampSelect = document.getElementById("bootcamp");
        const comentarios = document.getElementById("comentarios").value.trim();

        const bootcamps = Array.from(bootcampSelect.selectedOptions).map(option => option.value);

        if (nombre.length < 3 || apellido.length < 3) {
            alert("El nombre y apellido deben tener más de 3 caracteres.");
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

        const registro = {
            nombre,
            apellido,
            telefono,
            correo,
            bootcamps,
            comentarios: comentarios || "Sin comentarios"
        };

        guardarEnLocalStorage(registro);

        alert("Registro exitoso. Los datos han sido guardados.");
        form.reset();
        modal.classList.add("hidden");
    });

    // Obtener recomendación al hacer clic en el botón btnRecomendar
    btnRecomendar.addEventListener("click", async () => {
        const bootcampSelect = document.getElementById("bootcamp");
        const bootcamps = Array.from(bootcampSelect.selectedOptions).map(option => option.value);

        if (bootcamps.length === 0) {
            alert("Debe seleccionar al menos un bootcamp.");
            return;
        }

        const recomendacionTexto = await obtenerRecomendacionOpenAI(bootcamps);
        recomendacion.innerText = "Recomendación: " + recomendacionTexto;
        console.log(recomendacionTexto);
    });

    function guardarEnLocalStorage(datos) {
        let registros = JSON.parse(localStorage.getItem("registros")) || [];
        registros.push(datos);
        localStorage.setItem("registros", JSON.stringify(registros));
    }

    async function obtenerRecomendacionOpenAI(temas) {
        const apiKey = "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"
        const url = "https://api.openai.com/v1/chat/completions";
        const data = {
            // Your other request data (e.g., model, prompt, etc.)
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "Eres un asistente experto en educación y tecnología."
            }, {
                role: "user",
                content: `Basado en los siguientes temas de interés: ${temas.join(", ")}, recomienda un bootcamp adecuado.`
            }],
            max_tokens: 100
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}` // Add the Authorization header
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                // Handle different error codes for more specific debugging
                if (response.status === 401) {
                    console.error("Error 401: Unauthorized. Check your API key.");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData.choices[0].message.content;
        } catch (error) {
            console.error("Error al obtener recomendación de OpenAI", error);
            return "No se pudo obtener una recomendación en este momento.";
        }
    }
});
