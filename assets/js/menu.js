// Menú móvil: abrir y cerrar. Sin librerías externas.
(function () {
  var boton = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu-principal');
  if (!boton || !menu) return;

  function cerrar() {
    menu.classList.remove('abierto');
    boton.setAttribute('aria-expanded', 'false');
  }

  boton.addEventListener('click', function () {
    var abierto = menu.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrar();
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) cerrar();
  });
})();
