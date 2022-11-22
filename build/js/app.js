 document.addEventListener('DOMContentLoaded', function(){
     iniciarApp();
 });

 function iniciarApp() {
     crearGaleria();
 }

 function crearGaleria() {
     const galeria = document.querySelector('.galeria-img');

     galeria.textContent = 'Vamos a crear la galeria';
 }