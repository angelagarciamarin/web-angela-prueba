module.exports = function (eleventyConfig) {
  // Copiamos el panel de administración (Sveltia CMS) tal cual, sin procesarlo
  eleventyConfig.addPassthroughCopy("admin");

  // Copiamos las imágenes que se suban desde el CMS (carteles de talleres, etc.)
  eleventyConfig.addPassthroughCopy({ "content/talleres": "talleres" });

  return {
    dir: {
      input: ".",
      includes: "src/_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
