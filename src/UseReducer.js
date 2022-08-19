import React from 'react';

const SECURITY_CODE = 'paradigma';
function UseReducer({name}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    console.log("Empexando el efecto")
    if (state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion")
        if (state.value === SECURITY_CODE) {
          dispatch({type: 'CONFIRM'});
        } else {
          dispatch({type: 'ERROR'});
        }               
        console.log("Terminando la validacion")
      }, 3000);
    }
    console.log("Terminando el efecto")
  }, [state.loading]);
  
  if (!state.delete && !state.confirmed) {
    return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad</p>
      {state.error && (
        <p>Error: el código es incorrecto</p>
      )}
      {state.loading && (
        <p>Cargando ...</p>
      )}
      <input 
        placeholder='Código de seguridad'
        value= {state.value}
        onChange={(event) => {
          dispatch({type: 'WRITE', payload: event.target.value});
        }}
      />
      <button
        onClick={() =>{
          dispatch({type: 'CHECK'});
        }}
      >Comprobar</button>
    </div>
  )
  } else if (state.confirmed && !state.delete) {
    return (
      <React.Fragment>
        <p>Se necesita confirmación. ¿Estás seguro?</p>
        <button
          onClick={() => {
            dispatch({type: 'DELETE'});
          }}
        >
        Sí, eliminar
        </button>
        <button
          onClick={() => {
            dispatch({type: 'RESET'});
          }}
        >
        No, no quiero eliminar
        </button>
      </React.Fragment> 
    );
    } else {
      return (
        <React.Fragment>
          <p>Eliminado con exito</p>
          <button
          onClick={() => {
            dispatch({type: 'RESET'});
          }}
        >
        Resetear, volver atrás
        </button>
        </React.Fragment> 
      );
    }
}



const initialState = {
  value: '',
  error: false,
  loading: false,
  delete: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  'ERROR': {
    ...state,
    error: true,  
    loading:false,
  },
  'CONFIRM': { 
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  'WRITE': {
    ...state,
    value: payload,
  },
  'CHECK': {
    ...state,
    error: false,
    loading: true,
  },
  'DELETE': {
    ...state,
    delete:true,
  },
  'RESET': {
    ...state,
    confirmed: false,
    delete: false,
    value:'',
  },
});
const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

export { UseReducer };