// Pestañas accesibles (Tarifas). Sin JavaScript, todos los paneles se muestran uno debajo de otro.
(function () {
  var cont = document.querySelector('[data-pestanas]');
  if (!cont) return;
  var paneles = [].slice.call(cont.querySelectorAll('.pestanas__panel'));
  var lista = cont.querySelector('.pestanas__lista');
  if (!paneles.length || !lista) return;

  var pestanas = paneles.map(function (panel) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pestana';
    b.id = 'pestana-' + panel.id;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', panel.id);
    b.textContent = panel.getAttribute('data-titulo');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', b.id);
    lista.appendChild(b);
    return b;
  });

  function activar(i, foco) {
    pestanas.forEach(function (p, j) {
      p.setAttribute('aria-selected', j === i ? 'true' : 'false');
      p.tabIndex = j === i ? 0 : -1;
      paneles[j].hidden = j !== i;
    });
    if (foco) pestanas[i].focus();
  }

  pestanas.forEach(function (p, i) {
    p.addEventListener('click', function () { activar(i); });
    p.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % pestanas.length;
      if (e.key === 'ArrowLeft') n = (i - 1 + pestanas.length) % pestanas.length;
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = pestanas.length - 1;
      if (n !== null) { e.preventDefault(); activar(n, true); }
    });
  });

  var inicio = 0;
  var hash = window.location.hash.replace('#', '');
  paneles.forEach(function (p, i) { if (p.id === hash) inicio = i; });
  lista.hidden = false;
  activar(inicio);
})();
