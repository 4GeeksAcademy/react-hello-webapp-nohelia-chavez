// src/components/ContactCard.jsx
import React from "react";


// Tarjeta de un contacto individual
// Recibe props:
// - contacto = objeto con {id, name, email, phone, address, image}
// - onEdit = se ejecuta al pulsar el botón Edit
// - onAskDelete = se ejecuta al pulsar el botón Delete
export default function ContactCard({ contacto, onEdit, onAskDelete }) {

  const { id, name, email, phone, address, image } = contacto; //Desestructuramos 

  return (
    // cada contacto es un li
    <li className="list-group-item contact-card">
      <div className="d-flex align-items-start gap-3">

        
        {/* 📷 Avatar del contacto */}
        <img
          src={image || `https://i.pravatar.cc/80?u=${id || name}`}
          alt={name}
          className="rounded-circle avatar flex-shrink-0"
          width="80" height="80"
          style={{ objectFit: "cover" }}
        />
           {/* ℹ️ Info del contacto */}
        {/* 👇 min-width:0 para los textos largos no se corten */}
        <div className="flex-grow-1 info min-w-0">
          <h5 className="mb-1 name text-truncate">{name || "—"}</h5>
          <div className="text-muted small">
            <div className="mb-1 line text-truncate">
              <i className="fa-solid fa-location-dot me-2" />
              {address || "—"}
            </div>
            <div className="mb-1 line text-truncate">
              <i className="fa-solid fa-phone me-2" />
              {phone || "—"}
            </div>
            <div className="line text-truncate">
              <i className="fa-solid fa-envelope me-2" />
              {email || "—"}
            </div>
          </div>
        </div>

            {/*actions*/}
        <div className="actions d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-light border"
            title="Edit"
            onClick={() => onEdit(id)}
          >
            <i className="fa-solid fa-pen" />
          </button>
          <button
            type="button"
            className="btn btn-light border"
            title="Delete"
            onClick={() => onAskDelete(id)}
          >
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      </div>
    </li>
  );
}
