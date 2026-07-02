/** Rutas locales con NBSP en el nombre de carpeta (Fotos en iCloud). */
const PHOTOS_DIR = "/Fotos\u00a0en\u00a0iCloud de Alejandro Diez";

export const EDITORIAL_IMAGES = {
  fachadaAmanecer: "/hero-Fachada-Amanecer.JPG",
  fachadaLateral: `${PHOTOS_DIR}/03 Detalle fachada lateral.JPG`,
  tresEspacios: `${PHOTOS_DIR}/06 Tres espacios.JPG`,
  cocina: `${PHOTOS_DIR}/10 General cocina.JPG`,
  fachadaNocturna: `${PHOTOS_DIR}/20 Fachada nocturna.JPG`,
  fachadaAtardecer: `${PHOTOS_DIR}/21 Fachada atardecer.JPG`,
} as const;
