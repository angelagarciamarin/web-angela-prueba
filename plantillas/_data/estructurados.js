// Datos estructurados (schema.org) para buscadores. Se generan a partir de "Ajustes de la web".
// La persona profesional se define UNA sola vez (en Inicio) y las demás páginas la referencian por su @id.
const sitio = require("./sitio.json");

const seguro = (objeto) => JSON.stringify(objeto).replace(/</g, "\\u003c");

module.exports = function () {
  const base = String(sitio.url || "").replace(/\/+$/, "");
  const idPersona = `${base}/#persona`;
  const idWeb = `${base}/#web`;

  const persona = {
    "@type": "Person",
    "@id": idPersona,
    name: sitio.nombre_completo,
    jobTitle: sitio.profesion,
    url: `${base}/`,
    image: `${base}${sitio.foto_perfil}`,
    identifier: {
      "@type": "PropertyValue",
      name: "Número de colegiada",
      value: sitio.colegiada,
    },
    memberOf: { "@type": "Organization", name: sitio.colegio },
    workLocation: (sitio.ubicaciones || []).map((u) => ({
      "@type": "Place",
      name: `Ubicación profesional en ${u.nombre}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: u.calle,
        addressLocality: u.municipio,
        addressRegion: u.provincia,
        addressCountry: "ES",
      },
    })),
    sameAs: [sitio.doctoralia_url, sitio.instagram_url],
  };

  const web = {
    "@type": "WebSite",
    "@id": idWeb,
    url: `${base}/`,
    name: `${sitio.marca_nombre} | ${sitio.marca_profesion}`,
    inLanguage: "es",
    publisher: { "@id": idPersona },
  };

  // Inicio: define la persona y la web.
  const inicio = { "@context": "https://schema.org", "@graph": [persona, web] };

  // Sobre mí: NO redefine la persona; solo la referencia por su @id.
  const sobre = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${base}/sobre-mi/#pagina`,
        url: `${base}/sobre-mi/`,
        inLanguage: "es",
        isPartOf: { "@id": idWeb },
        about: { "@id": idPersona },
        mainEntity: { "@id": idPersona },
      },
    ],
  };

  return { inicio: seguro(inicio), sobre: seguro(sobre) };
};
