// src/pages/AddContact.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

// Hook global (Context + Reducer)
import useGlobalReducer from "../hooks/useGlobalReducer";

// Servicios que hablan con la API de contactos
import contactosServicios from "../servicios/contactosServicios";


// Página para Crear o Editar un contacto.
// Si viene ?id= en la URL se edita si no se crea.
export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const { contactos } = store;

  const [params] = useSearchParams();
  const idEditar = params.get("id"); //string o null
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", 
    email: "", 
    phone: "", 
    address: ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Precarga si es edición
  useEffect(() => {
    if (idEditar) {
      const c = contactos.find(x => String(x.id) === String(idEditar));
      if (c) setForm({
        name: c.name || "",
        email: c.email || "",
        phone: c.phone || "",
        address: c.address || ""
      });
    }
  }, [idEditar, contactos]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };


   // Submit del formulario:
  //   Si hay id  PUT actualiza
  //   Si no hay id  POST crea
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let r;
      if (idEditar) r = await contactosServicios.actualizarContacto(idEditar, form); //edita el contacto existente
      else r = await contactosServicios.crearContacto(form);                         // crea un nuevo contacto

      if (!r.ok) {
        const t = await r.text().catch(() => "");
        throw new Error(`Error (${r.status}) ${t}`);
      }

      // Refresca lista global
      const r2 = await contactosServicios.obtenerContactosDeAgenda(store.agendaSlug);
      const data2 = r2.status === 404 ? { contacts: [] } : await r2.json();
      dispatch({ type: "set_contactos", payload: Array.isArray(data2.contacts) ? data2.contacts : [] });

      navigate("/contacts"); // vuelve a la lista
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <h2 className="my-3">{idEditar ? "Edit contact" : "Add a new contact"}</h2>

      

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="card p-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input className="form-control" name="name" value={form.name} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" name="email" value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input className="form-control" name="phone" value={form.phone} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input className="form-control" name="address" value={form.address} onChange={onChange} />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <Link to="/contacts" className="btn btn-warning"> back to contacts</Link>
        </div>
      </form>
    </div>
  );
};
