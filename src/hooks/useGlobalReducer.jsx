// Importa los hooks y funciones necesarios de React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // storeReducer cambia el estado
                                                       //initialStore el estado inicial de la aplicacion
// Crea un contexto para mantener el estado global de la aplicación.
// Llamaremos a este estado global "store" para evitar confusión con los estados locales. 
// Context es una caja magica que transporta datos a cualquier parte de la app sin necesidad de props
const StoreContext = createContext()

//Define un componente proveedor que encapsula el store y lo envuelve en un proveedor de contexto
// para difundir la información a través de todas las páginas y componentes de la aplicación.
export function StoreProvider({ children }) {  // crea [store, dispatch] con useReducer y lo provee a todos los componentes.
        // Inicializa el reducer con el estado inicial.
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    // Proporciona el store y el método dispatch a todos los componentes hijos.
    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

// Hook personalizado para acceder al estado global y a la función dispatch.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}





// Contexto = "caja" compartida por todda la app.
// Reducer = funcion pura que dice como cambia el estado segun la acción.
// dispach = "Envio una acción" -> el reducer actualiza el estado.