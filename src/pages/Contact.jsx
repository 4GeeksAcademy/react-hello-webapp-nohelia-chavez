import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import contactosServicios from "../servicios/contactosServicios";
import ContactCard from "../components/ContactCard";
import ConfirmModal from "../components/ModalConfirm"; // 👈 usa tu modal

export const Contact = () => {
  const { store, dispatch } = useGlobalReducer();
  const { agendaSlug, contactos, loading, error } = store;
  const navigate = useNavigate();

  // 👇 Id del contacto pendiente de borrar (controla el modal)
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const cargar = async () => {
    dispatch({ type: "set_loading", payload: true });
    dispatch({ type: "set_error", payload: "" });
    try {
      const r = await contactosServicios.obtenerContactosDeAgenda(agendaSlug);
      if (!r.ok) throw new Error(`Error ${r.status}`);
      const data = await r.json();
      dispatch({ type: "set_contactos", payload: data.contacts || [] });
    } catch (e) {
      dispatch({ type: "set_error", payload: e.message });
    } finally {
      dispatch({ type: "set_loading", payload: false });
    }
  };

  useEffect(() => { cargar(); }, []); // carga al entrar

  
  const askDelete = (id) => setPendingDeleteId(id);

  const cancelDelete = () => setPendingDeleteId(null);

  const confirmDelete = async () => {
    const id = pendingDeleteId;
    setPendingDeleteId(null);
    try {
      const r = await contactosServicios.borrarContacto(id);
      if (!r.ok && r.status !== 404) throw new Error(`No se pudo eliminar (${r.status})`);
      await cargar(); // recarga lista tras borrar
    } catch (e) {
      dispatch({ type: "set_error", payload: e.message });
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>New Contacts</h1>
        <Link to="/add" className="btn btn-success">+ Add new contact</Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && contactos.length === 0 && (
        <p>"No Contacts yet".</p>
      )}

      <div className="row g-3">
        {contactos.map((c) => (
          <div className="col-md-6 col-lg-4" key={c.id}>
            <ContactCard
              contacto={c}
              onEdit={() => navigate(`/add?id=${c.id}`)}
              onAskDelete={() => askDelete(c.id)} // 👈 abre TU modal
            />
          </div>
        ))}
      </div>

      {/* modal  */}
      <ConfirmModal
        show={pendingDeleteId !== null}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
