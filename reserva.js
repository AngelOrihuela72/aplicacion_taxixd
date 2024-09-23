const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
const totalItems = items.length;

// Duplicar todos los ítems al principio y al final para crear un bucle continuo
items.forEach(item => {
    const clone = item.cloneNode(true);
    carouselInner.appendChild(clone);  // Añadir al final
    const cloneFirst = item.cloneNode(true);
    carouselInner.insertBefore(cloneFirst, items[0]);  // Añadir al principio
});

// Obtener de nuevo todos los elementos del carrusel
const allItems = document.querySelectorAll('.carousel-item');
const totalAllItems = allItems.length;

// Actualizar la posición del carrusel
function updateCarousel(noTransition = false) {
    const itemWidth = items[0].getBoundingClientRect().width;

    // Controlar la transición para que sea continua
    if (noTransition) {
        carouselInner.style.transition = 'none';  // Sin transición
    } else {
        carouselInner.style.transition = 'transform 0.3s ease';  // Con transición
    }

    // Mover el carrusel
    carouselInner.style.transform = `translateX(-${(currentIndex + totalItems) * itemWidth}px)`;  // Moverse en base al total duplicado
}

// Desplazar a la siguiente imagen
function nextItem() {
    currentIndex++;
    updateCarousel();  // Desplazamiento con transición

    // Cuando llegues al final de los ítems originales, reajustar la posición al inicio
    if (currentIndex === totalItems) {
        setTimeout(() => {
            currentIndex = 0;  // Volver al primer ítem sin animación
            updateCarousel(true);  // Sin transición para un cambio invisible
        }, 300);  // Después de la transición
    }
}

// Desplazar a la imagen anterior
function prevItem() {
    currentIndex--;
    updateCarousel();  // Desplazamiento con transición

    // Cuando llegues al inicio de los ítems originales, reajustar la posición al final
    if (currentIndex < 0) {
        setTimeout(() => {
            currentIndex = totalItems - 1;  // Volver al último ítem sin animación
            updateCarousel(true);  // Sin transición para un cambio invisible
        }, 300);  // Después de la transición
    }
}

// Eventos de click
nextBtn.addEventListener('click', nextItem);
prevBtn.addEventListener('click', prevItem);

// Parpadeo cada 12 segundos
setInterval(() => {
    carouselInner.style.animation = 'blink 1s';  // Parpadeo de 1 segundo
    setTimeout(() => {
        carouselInner.style.animation = '';  // Remover animación después del parpadeo
        currentIndex = 0;  // Volver a la primera imagen
        updateCarousel(true);  // Sin transición para reajustar instantáneamente
    }, 1000);  // Duración del parpadeo
}, 20000);

// Ajustar el carrusel cuando la ventana se redimensiona
window.addEventListener('resize', () => updateCarousel(true));

// Inicializar el carrusel
updateCarousel(true);


/* menu de opciones */
function seleccionarOpcion(opcion, imagenSrc, elemento) {
    // Limpiar las selecciones anteriores
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach(op => {
        const casilla = op.querySelector('.casilla');
        casilla.innerHTML = ''; // Limpia la casilla
        op.classList.remove('seleccionada'); // Quita el estilo de selección
    });

    // Marcar la opción seleccionada
    const casillaSeleccionada = elemento.querySelector('.casilla');
    casillaSeleccionada.innerHTML = '✔️'; // Agrega el check
    elemento.classList.add('seleccionada'); // Agrega estilo a la opción seleccionada

    // Mostrar el resultado
    document.getElementById('resultado').innerText = opcion;

    // Mostrar la imagen del carro seleccionado
    const imagen = document.getElementById('imagen');
    imagen.src = imagenSrc;
    imagen.style.display = 'block'; // Muestra la imagen
}