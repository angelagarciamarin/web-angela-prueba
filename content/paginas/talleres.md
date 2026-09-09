---
title: Talleres infantiles
layout: base.njk
permalink: /talleres/
seo_titulo: "Talleres infantiles | Ángela García"
seo_descripcion: "Talleres mensuales de bienestar emocional para niños en Almagro."
---

# Talleres infantiles

{% for taller in collections.talleres %}
<div class="tarjeta">
<h3>{{ taller.data.titulo }} <small>({{ taller.data.estado }})</small></h3>
<p>{{ taller.data.mes }}{% if taller.data.fecha %} · {{ taller.data.fecha }}{% endif %} — {{ taller.data.edades }}</p>
{% if taller.data.objetivo %}<p>{{ taller.data.objetivo }}</p>{% endif %}
{% if taller.data.precio %}<p>Precio: {{ taller.data.precio }}</p>{% endif %}
{% if taller.data.cartel %}<p><img src="/talleres/{{ taller.data.cartel }}" alt="Cartel del taller" style="max-width:100%;border-radius:8px;"></p>{% endif %}
</div>
{% endfor %}
