// Obtener la referencia a la imagen
const imgContainer = document.querySelector('.img-container')
const img = document.querySelector('.img-container img')

// Función para obtener un valor aleatorio dentro de un rango
function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

// Función para animar la imagen
function animateImage() {
  // Obtener el ancho y alto de la ventana del navegador
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  

  // Obtener valores aleatorios para la rotación y la posición de la imagen

  const posX = getRandomValue(0, windowWidth-(imgContainer.offsetWidth+5)); // Restamos el width de la img  para que la imagen no se salga del borde derecho
  const posY = getRandomValue(0, windowHeight-(imgContainer.offsetHeight+5)); // Restamos el width de la img para que la imagen no se salga del borde inferior
  console.log(posX, posY)

  // Aplicar las animaciones utilizando transform y translate
  imgContainer.style.transform = `translate(${posX}px, ${posY}px)`;
  img.style.transform = `rotate(${getRandomValue(-360, 360)}deg)`;
  img.style.transition = 'transform 2s ease-in-out';
}

window.onload = animateImage;
setInterval(animateImage, 3000); 