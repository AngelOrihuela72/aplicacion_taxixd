function validarFormulario(event) {
    var formulario = document.querySelector('form');

    // Verifica si el formulario es válido
    if (!formulario.checkValidity()) {
        event.preventDefault(); // Evita que el formulario se envíe si es inválido
        alert("Por favor, llena todos los campos obligatorios.");
    } 
    // Si es válido, no se hace preventDefault, por lo que el formulario se enviará
}

// Asocia la validación personalizada al evento 'submit' del formulario
window.onload = function() {
    var formulario = document.querySelector('form');
    formulario.addEventListener('submit', validarFormulario);
};
