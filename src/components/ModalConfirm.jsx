// src/components/ModalConfirm.jsx
import React from "react";



// Componente Modal de confirmación
// Props que recibe:
//  show  booleano (true/false) que indica si el modal se muestra
//  onCancel se ejecuta si el usuario cancela
//  onConfirm se ejecuta si el usuario confirma el borrado
export default function ConfirmModal({ show, onCancel, onConfirm }) {

   // Si show es false, no mostramos nada (null no renderiza nada en React)
  if (!show) return null;

  return (

    //modal estilo boostrap
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Really?!!! Do you want to delete?</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            />
          </div>
          <div className="modal-body">
            <p>If you delete this contact it will be gone forever! 😢</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"  
              className="btn btn-secondary"
              onClick={onCancel}
            >
              No, delete
            </button>
            <button
              type="button"  
              className="btn btn-primary"
              onClick={onConfirm}
            >
              Yes, baby!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
