export const initialStore = () => ({ //initialStore es una funcion que devuelve elo estado inicial de una funcion
  agendaSlug: "nohelia-agenda", // este es mi identificacion unica de mi agenda API
  contactos: [],                //listas de contactos para cargar con fetch
  loading: false,               // indica si se cargan datos
  error: "",                     //guarda mensajes de error si existe
});


 //storeReducer cambia el estado segun la accion enviada recibe el estado actual(state) y una (action) y devuelve un nuevo estado
export default function storeReducer(state, action) {
  switch (action.type) {
    case "set_loading":    //aqui se actualiza el estado loading con el valor recibido en action.payload
      return { ...state, loading: action.payload };

    case "set_error":      //actualiza el estado de error
      return { ...state, error: action.payload };

    case "set_contactos": //guarda en contactos la lista recibida
      return { ...state, contactos: action.payload };

    case "set_agenda": //cambia el slug de la agenda si quiero trabajar con otra
      return { ...state, agendaSlug: action.payload };
    default:

      return state; //devuelve el estado sin cambios si no reconoce la accion
  }
}
