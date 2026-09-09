---
title: Preguntas frecuentes
layout: base.njk
permalink: /faq/
seo_titulo: "Preguntas frecuentes | Ángela García"
seo_descripcion: "Resolvemos las dudas más habituales antes de empezar terapia."
---

# Preguntas frecuentes

{% for item in collections.faq %}
<div class="tarjeta">
<h3>{{ item.data.pregunta }}</h3>
<p>{{ item.data.respuesta }}</p>
</div>
{% endfor %}
