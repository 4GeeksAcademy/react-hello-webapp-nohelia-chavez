// src/servicios/agendasServicios.js
const API = "https://playground.4geeks.com/contact";
export default {
  crearAgenda(slug) {
    return fetch(`${API}/agendas/${encodeURIComponent(slug)}`, { method: "POST" });
    // 201 creada, 409 ya existía → ambos OK
  },
};
