const fs = require("fs");

// Convierte texto plano en HTML seguro. *palabra* se muestra destacada (cursiva).
const escapar = (texto) =>
  String(texto == null ? "" : texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Categorías de las preguntas frecuentes, en el orden en que se muestran
const CATEGORIAS_FAQ = [
  "Antes de empezar",
  "Primera sesión",
  "Proceso terapéutico",
  "Modalidades",
  "Talleres infantiles",
  "Citas",
  "Tarifas y pagos",
  "Confidencialidad",
];
const enlazable = (texto) =>
  String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ordenar = (a, b) =>
  (a.data.orden == null ? 999 : a.data.orden) - (b.data.orden == null ? 999 : b.data.orden);

module.exports = function (eleventyConfig) {
  // ---- Archivos que se copian tal cual a la web publicada ----
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");

  // ---- Tipografías autoalojadas (se sirven desde tu propio dominio, sin Google Fonts) ----
  const fuentes = [
    ["node_modules/@fontsource-variable/fraunces", "assets/fonts/fraunces"],
    ["node_modules/@fontsource-variable/jost", "assets/fonts/jost"],
  ];
  fuentes.forEach(([origen, destino]) => {
    ["index.css", "wght-italic.css", "files"].forEach((archivo) => {
      if (fs.existsSync(`${origen}/${archivo}`)) {
        eleventyConfig.addPassthroughCopy({ [`${origen}/${archivo}`]: `${destino}/${archivo}` });
      }
    });
  });

  // ---- Filtros de texto ----
  eleventyConfig.addFilter("enfasis", (texto) =>
    escapar(texto).replace(/\*([^*]+)\*/g, "<em>$1</em>")
  );
  eleventyConfig.addFilter("parrafos", (texto) =>
    escapar(texto)
      .split(/\n\s*\n/)
      .map((p) => "<p>" + p.trim().replace(/\n/g, "<br>") + "</p>")
      .join("")
  );

  // ---- Datos globales ----
  eleventyConfig.addGlobalData("anio", () => new Date().getFullYear());

  // ---- Colecciones de contenido ----
  eleventyConfig.addCollection("faq", (api) =>
    api.getFilteredByGlob("./contenido/faq/*.md").sort(ordenar)
  );
  // Preguntas agrupadas por categoría; las categorías sin preguntas no aparecen.
  eleventyConfig.addCollection("faqCategorias", (api) => {
    const preguntas = api.getFilteredByGlob("./contenido/faq/*.md").sort(ordenar);
    const extras = [];
    preguntas.forEach((p) => {
      const c = p.data.categoria;
      if (c && !CATEGORIAS_FAQ.includes(c) && !extras.includes(c)) extras.push(c);
    });
    return CATEGORIAS_FAQ.concat(extras)
      .map((nombre) => ({
        nombre,
        id: enlazable(nombre),
        preguntas: preguntas.filter((p) => p.data.categoria === nombre),
      }))
      .filter((c) => c.preguntas.length > 0);
  });
  eleventyConfig.addCollection("faqInicio", (api) =>
    api
      .getFilteredByGlob("./contenido/faq/*.md")
      .filter((item) => item.data.en_inicio)
      .sort(ordenar)
  );
  eleventyConfig.addCollection("talleres", (api) =>
    api.getFilteredByGlob("./contenido/talleres/*.md").sort(ordenar)
  );
  // Solo puede haber UN taller marcado como "Próximo". Si hay más, la web no se
  // publica y se conserva la versión anterior (así nunca aparecen dos a la vez).
  eleventyConfig.addCollection("proximoTaller", (api) => {
    const proximos = api
      .getFilteredByGlob("./contenido/talleres/*.md")
      .filter((item) => item.data.estado === "Próximo");
    if (proximos.length > 1) {
      const titulos = proximos.map((t) => `"${t.data.titulo}"`).join(", ");
      throw new Error(
        `Hay ${proximos.length} talleres marcados como "Próximo" (${titulos}). ` +
          `Solo puede haber uno: cambia el estado de los demás a "Previsto" o "Realizado".`
      );
    }
    return proximos;
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "plantillas/_includes",
      data: "plantillas/_data",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
};
