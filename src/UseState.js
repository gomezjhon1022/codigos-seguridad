import React from 'react';

const SECURITY_CODE = 'paradigma';
function UseState({name}) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState('');
  console.log(value);
  React.useEffect(() => {
    console.log("Empexando el efecto")
    if (loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion")
        if (value !== SECURITY_CODE) {
          setError(true);
        }
        setLoading(false);
        
        console.log("Terminando la validacion")
      }, 3000);
    }
    console.log("Terminando el efecto")
  }, [loading]);
  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escr  ibe el código de seguridad</p>
      {error && (
        <p>Error: el código es incorrecto</p>
      )}
      {loading && (
        <p>Cargando ...</p>
      )}
      <input 
        placeholder='Código de seguridad'
        value= {value}
        onChange={(event) => {
          setValue(event.target.value);
        }}

      />
      <button
        onClick={() =>{
          setLoading(true);
          setError(false);
        }}
      >Comprobar</button>
    </div>
  )
}

export { UseState };