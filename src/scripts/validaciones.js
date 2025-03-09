document.addEventListener("DOMContentLoaded", function () {
    console.log("Iniciando Validación de Formulario");

    const form = document.querySelector("form");

    // Función para validar correo electrónico
    function validarCorreo(correo) {
        // Expresión regular que verifica el formato del correo y los dominios permitidos
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|icloud\.com|gmail\.es|yahoo\.es|hotmail\.es|icloud\.es)$/;
        return emailRegex.test(correo); // Devuelve verdadero si el correo cumple con el formato
    }

    // Función para validar el número de teléfono
    function validarTelefono(telefono) {
        // Expresión regular que valida el formato del teléfono con prefijo +504 y números válidos
        const phoneRegex = /^\+504\s?[2389]\d{7}$/;
        return phoneRegex.test(telefono); // Devuelve verdadero si el teléfono cumple con el formato
    }

    // Función para validar que el nombre no esté vacío
    function validarNombre(nombre) {
        return nombre.trim() !== "";  // El campo no puede estar vacío
    }

    // Función para validar que el nombre tenga al menos 3 caracteres
    function validarNombreL(nombre) {
        return nombre.trim().length >= 3;  // El campo debe tener al menos 3 caracteres
    }

    // Función para validar que el apellido no esté vacío
    function validarApellido(apellido) {
        return apellido.trim() !== "";  // El campo no puede estar vacío
    }

    // Función para validar que el apellido tenga al menos 3 caracteres
    function validarApellidoL(apellido) {
        return apellido.trim().length >= 3;  // El campo debe tener al menos 3 caracteres
    }

    // Función para validar que los comentarios tengan al menos 10 caracteres
    function validarComentarios(comentarios) {
        return comentarios.trim().length >= 10;  // El campo debe tener al menos 10 caracteres
    }

    // Función para mostrar el mensaje de error junto al campo
    function mostrarError(input, mensaje) {
        input.style.outline = "2px solid red";  // Resaltar el borde en rojo

        // Busca si ya existe un mensaje de error
        let errorMensaje = input.nextElementSibling;
        if (!errorMensaje || errorMensaje.tagName !== "SPAN") {
            // Si no existe, crea un nuevo mensaje de error
            errorMensaje = document.createElement("span");
            errorMensaje.style.color = "red";
            errorMensaje.style.fontSize = "12px";
            errorMensaje.style.display = "block";
            input.parentNode.insertBefore(errorMensaje, input.nextSibling);  // Inserta el mensaje después del input
        }
        errorMensaje.textContent = mensaje;  // Muestra el mensaje de error
    }

    // Función para limpiar el mensaje de error
    function limpiarError(input) {
        input.style.outline = "";  // Elimina el borde rojo
        const errorMensaje = input.nextElementSibling;
        if (errorMensaje && errorMensaje.tagName === "SPAN") {
            errorMensaje.remove();  // Elimina el mensaje de error si existe
        }
    }

    // Evento que se dispara al enviar el formulario
    form.addEventListener("submit", function (e) {
        e.preventDefault();  // Evita que el formulario se envíe inmediatamente
        console.log("Validando formulario...");

        let bolFormularioValido = true;  // Bandera para verificar si el formulario es válido

        // Definimos los campos y sus validaciones
        const campos = [
            { 
                id: "txtEmail", 
                validacion: validarCorreo, 
                mensaje: "El correo debe tener un formato válido y pertenecer a los dominios permitidos (gmail, yahoo, hotmail, icloud) con extensión .com o .es." 
            },
            { 
                id: "txtTeléfono", 
                validacion: validarTelefono, 
                mensaje: "El teléfono principal debe iniciar con +504 y tener 8 dígitos, comenzando con 2, 3, 8 o 9." 
            },
            { 
                id: "txtNombre", 
                validacion: validarNombre, 
                mensaje: "El campo Nombre no puede estar vacío." 
            },
            { 
                id: "txtNombre", 
                validacion: validarNombreL, 
                mensaje: "El campo Nombre debe tener al menos 3 caracteres." 
            },
            { 
                id: "txtApellido", 
                validacion: validarApellido, 
                mensaje: "El campo Apellido no puede estar vacío." 
            },
            { 
                id: "txtApellido", 
                validacion: validarApellidoL, 
                mensaje: "El campo Apellido debe tener al menos 3 caracteres." 
            },
            { 
                id: "txtComentarios", 
                validacion: validarComentarios, 
                mensaje: "El campo Comentarios debe tener al menos 10 caracteres." 
            }
        ];

        // Se valida cada campo
        campos.forEach(function (campo) {
            const input = document.getElementById(campo.id);  // Obtenemos el campo por su ID
            const esValido = campo.validacion(input.value);  // Validamos el valor del campo
            if (!esValido) {
                mostrarError(input, campo.mensaje);  // Si no es válido, mostramos el mensaje de error
                bolFormularioValido = false;  // Indicamos que el formulario no es válido
            } else {
                limpiarError(input);  // Si es válido, limpiamos el error (si existe)
            }
        });

        // Si el formulario es válido, lo enviamos
        if (bolFormularioValido) {
            console.log("Formulario válido. Enviando...");
            form.submit();  // Envía el formulario
        } else {
            console.log("Errores encontrados. Corrige antes de enviar.");
        }
    });

    // Limpiar el error cuando el usuario corrige el campo (mientras escribe)
    const camposInput = [
        { id: "txtEmail", validacion: validarCorreo },
        { id: "txtTeléfono", validacion: validarTelefono },
        { id: "txtNombre", validacion: validarNombre },
        { id: "txtApellido", validacion: validarApellido },
        { id: "txtComentarios", validacion: validarComentarios }
    ];

    // Asignamos el evento de 'input' para limpiar los errores al cambiar los valores
    camposInput.forEach(function (campo) {
        const input = document.getElementById(campo.id);
        input.addEventListener("input", function () {
            limpiarError(input);  // Limpiar el error al cambiar el valor del campo
        });
    });
});
