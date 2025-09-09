// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//👇hook de Context
import useGlobalReducer from "../hooks/useGlobalReducer";

//👇 servicios de la API
import agendasServicios from "../servicios/agendasServicios";
import contactosServicios from "../servicios/contactosServicios";

//UI de la lista y el modal de confirmacion
import ContactCard from "../components/ContactCard.jsx";
import ConfirmModal from "../components/ModalConfirm.jsx";

export const Home = () => {

  // Toma el estado global: slug de la agenda, lista, y error (si hay)
  //    y el dispatch para actualizar el store.
  const { store, dispatch } = useGlobalReducer();
  const { agendaSlug, contactos, error } = store;

  
  const [loadingList, setLoadingList] = useState(false); // loading local
  const [idAEliminar, setIdAEliminar] = useState(null); // contacto a borrar

  //navego entre paginas
  const navigate = useNavigate();

  const lista = Array.isArray(contactos) ? contactos : []; // si contactos no es array se convierte

  useEffect(() => {
    

    const boot = async () => {
      setLoadingList(true); // muestra loading
      dispatch({ type: "set_error", payload: "" }); // limpia errores

      try {
        //  el slug de la agenda (ej: "nohelia-agenda")
        const slug = String(agendaSlug || "").trim();
        if (!slug) {
          dispatch({ type: "set_error", payload: "Define un agendaSlug en el store." });
          setLoadingList(false);
          return; //para si no hay slug
        }

        // Crear/agenda  devuelve 409 si ya existe →OK.
        const rCreate = await agendasServicios.crearAgenda(slug);
        if (![200, 201, 204, 409].includes(rCreate.status)) {
          const txt = await rCreate.text().catch(() => "");
          if (rCreate.status === 400 && txt.includes("already exists")) {
            // agenda ya existe, seguimos
            // console.log("Agenda ya existía, seguimos.");
          } else {
            throw new Error(`No se pudo crear la agenda (${rCreate.status}) ${txt}`.trim());
          }
        }

        // Carga contactos
        const r = await contactosServicios.obtenerContactosDeAgenda(slug);
        let data = { contacts: [] };
        if (r.status !== 404 && r.ok) {
          try { data = await r.json(); } catch {}
        }
        dispatch({
          type: "set_contactos",
          payload: Array.isArray(data?.contacts) ? data.contacts : []
        });
      } catch (e) {

        //se guarda el error en el store
        dispatch({ type: "set_error", payload: e.message });
      } finally {
        setLoadingList(false); // se quita el loading
      }
    };

    boot(); // ejecuta la funcion al entrar la arranca
  }, [agendaSlug]);

  const handleEdit = (id) => navigate(`/add?id=${id}`);

  const onAskDelete = (id) => {// pregunta si se elimina y se abre el modal
  
    setIdAEliminar(id);
  };

  const closeModal = () => setIdAEliminar(null);

  const onConfirmDelete = async () => {
   
    if (idAEliminar == null) return;

    const id = idAEliminar;
    setIdAEliminar(null);

    // snapshot para rollback guarda el estado previo
    const antes = lista;

    // borrado optimista al instante sin esperar al servidor asi el usuario no siente que tarda en desaparecer el contacto
    dispatch({
      type: "set_contactos",
      payload: lista.filter(c => String(c.id) !== String(id))
    });

    try {
      //  DELETE en API
      const r = await contactosServicios.borrarContacto(id);
      if (![200, 204, 404].includes(r.status)) {
        // rollback si falla
        dispatch({ type: "set_contactos", payload: antes });
        throw new Error(`No se pudo eliminar (${r.status})`);
      }

      //  recargamos para sincronizar 
      const r2 = await contactosServicios.obtenerContactosDeAgenda(agendaSlug);
      const data2 = r2.status === 404 ? { contacts: [] } : await r2.json();
      dispatch({
        type: "set_contactos",
        payload: Array.isArray(data2.contacts) ? data2.contacts : []
      });
    } catch (e) {
      dispatch({ type: "set_error", payload: e.message });
    }
  };

  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="m-0">Contacts</h2>
        <Link className="btn btn-success" to="/add">Add new contact</Link>
      </div>
      

      {loadingList && <p>⏳ Loading…</p>}
      {error && <p className="text-danger">❌ {error}</p>}

      {!loadingList && (lista.length === 0 ? (
        <p className="text-muted">No contacts yet. Click “Add new contact”.</p>
      ) : (
        <ul className="list-group">
          {lista.map(c => (
            <ContactCard
              key={c.id}
              contacto={c}
              onEdit={handleEdit}
              onAskDelete={onAskDelete}
            />
          ))}
        </ul>
      ))}

      
        <ConfirmModal
          show={idAEliminar !== null}
          onCancel={closeModal}
          onConfirm={onConfirmDelete}
        />
      
    </div>
  );
};
