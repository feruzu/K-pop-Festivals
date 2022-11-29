 document.addEventListener('DOMContentLoaded', function(){
     iniciarApp();
 });

 function iniciarApp() {
     crearGaleria();
 }

 function crearGaleria() {
     const galeria = document.querySelector('.galeria-img');

     for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/galeria-min/${i}.webp" type="image/webp" />
        <img src="build/img/galeria-min/${i}.jpg" alt="imagen galeria" />
        `;

        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
     }
 }


 function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/galeria/${id}.webp" type="image/webp" />
    <img src="build/img/galeria/${id}.jpg" alt="imagen galeria" />
    `;

    // overlay img
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar');
        overlay.remove();
    }



    // añade a html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar');
 }