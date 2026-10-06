// Envío del formulario de contacto a través de Web3Forms, sin recargar la página.
(function () {
  var form = document.getElementById('formulario-contacto');
  if (!form) return;

  var btn = form.querySelector('button[type="submit"]');
  var error = form.querySelector('.formulario__estado--error');
  var exito = form.querySelector('.formulario__estado--exito');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Protección antispam: si el campo oculto "botcheck" se ha rellenado, es un robot.
    var trampa = form.querySelector('input[name="botcheck"]');
    if (trampa && trampa.checked) return;

    error.hidden = true;
    btn.disabled = true;
    btn.textContent = btn.getAttribute('data-texto-enviando') || btn.textContent;

    var datos = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: datos,
    })
      .then(function (respuesta) { return respuesta.json(); })
      .then(function (resultado) {
        if (resultado.success) {
          form.classList.add('formulario--enviado');
          exito.hidden = false;
          exito.focus && exito.setAttribute('tabindex', '-1');
          exito.focus();
        } else {
          throw new Error('web3forms');
        }
      })
      .catch(function () {
        error.hidden = false;
        btn.disabled = false;
        btn.textContent = btn.getAttribute('data-texto-normal') || btn.textContent;
      });
  });
})();
