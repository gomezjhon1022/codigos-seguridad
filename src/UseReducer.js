import React from 'react';

const SECURITY_CODE = 'paradigma';
function UseReducer({name}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const onConfirm = () => dispatch({ type: actionTypes.confirm})
  const onError = () => dispatch({ type: actionTypes.error})
  const onDelete = () => dispatch({ type: actionTypes.delete})
  const onWrite = ({target: {value}}) => {
    dispatch({ type: actionTypes.write, payload: value})
  }
  const onCheck = () => dispatch({ type: actionTypes.check})
  const onReset = () => dispatch({ type: actionTypes.reset})
  React.useEffect(() => {
    console.log("Empexando el efecto")
    if (state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion")
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
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
        onChange={onWrite}
      />
      <button onClick={onCheck}>Comprobar</button>
    </div>
  )
  } else if (state.confirmed && !state.delete) {
    return (
      <React.Fragment>
        <p>Se necesita confirmación. ¿Estás seguro?</p>
        <button onClick={onDelete}>
        Sí, eliminar
        </button>
        <button onClick={onReset}>
        No, no quiero eliminar
        </button>
      </React.Fragment> 
    );
    } else {
      return (
        <React.Fragment>
          <p>Eliminado con exito</p>
          <button onClick={onReset}>
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
const actionTypes = {
  confirm: 'CONFIRM',
  delete: 'DELETE',
  error: 'ERROR',
  check: 'CHECK',
  write: 'WRITE',
  reset: 'RESET',
}

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,  
    loading:false,
  },
  [actionTypes.confirm]: { 
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.check]: {
    ...state,
    error: false,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    delete:true,
  },
  [actionTypes.reset]: {
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