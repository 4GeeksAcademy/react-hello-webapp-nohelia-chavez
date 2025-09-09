// src/servicios/contactosServicios.js
const API = "https://playground.4geeks.com/contact"; // url API del playground de 4Geeks
const HEADERS = { "Content-Type": "application/json" }; //  POST/PUT
const agendaSlug = "nohelia-agenda";


// normaliza y limpia y agrega agenda-slug
const sanitize = (p = {}) => ({
  name: String(p.name || "").trim(),
  email: String(p.email || "").trim(),
  phone: String(p.phone || "").trim(),
  address: String(p.address || "").trim(),
  agenda_slug: agendaSlug
});

export default {

  //GET
  obtenerContactosDeAgenda(slug = agendaSlug) {
    return fetch(`${API}/agendas/${encodeURIComponent(slug)}/contacts`);
  },

  //POST
  crearContacto(payload) {
    return fetch(`${API}/agendas/${agendaSlug}/contacts`, {
      method: "POST", 
      headers: HEADERS, 
      body: JSON.stringify(sanitize(payload))
    });
  },

  //PUT
  actualizarContacto(id, payload) {
    return fetch(`${API}/agendas/${agendaSlug}/contacts/${id}`, {
      method: "PUT", 
      headers: HEADERS, 
      body: JSON.stringify(sanitize(payload))
    });
  },

  //DELETE
  borrarContacto(id) {
    return fetch(`${API}/agendas/${agendaSlug}/contacts/${id}`, {
      method: "DELETE", 
      headers: HEADERS
    });
  }
};
