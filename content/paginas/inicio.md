---
title: Inicio
layout: base.njk
permalink: /
seo_titulo: "Ángela García | Psicóloga"
seo_descripcion: "Psicóloga General Sanitaria en Almagro, Puertollano y online. Cuidar tu mente transforma tu vida."
hero_titulo: "Cuidar tu mente transforma tu vida."
hero_subtitulo: "Un espacio seguro para comprender lo que te ocurre y sanar aquello que duele."
hero_linea: "Psicología para niños, adolescentes y adultos · Terapia de pareja y familiar · Almagro, Puertollano y online."
---

# {{ hero_titulo }}

{{ hero_subtitulo }}

*{{ hero_linea }}*

<a class="boton" href="/tarifas/">Ver tarifas</a>

## Próximo taller

{% for taller in collections.talleres %}
{% if taller.data.estado == "Próximo" %}
<div class="tarjeta">
<h3>{{ taller.data.titulo }}</h3>
<p>{{ taller.data.mes }}{% if taller.data.fecha %} · {{ taller.data.fecha }}{% endif %}</p>
{% if taller.data.objetivo %}<p>{{ taller.data.objetivo }}</p>{% endif %}
</div>
{% endif %}
{% endfor %}
