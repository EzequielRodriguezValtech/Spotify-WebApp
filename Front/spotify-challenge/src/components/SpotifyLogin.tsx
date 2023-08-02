 const SpotifyLogin = () => {
  const SpotifyLogin = async() =>{
      try {
          window.open('http://localhost:8000/auth/spotify', '_self');
      } catch (error) {
          console.log('Error al obtener la URL de autorización:', error);
          
      }
  }    
  return (
      <>
          <div className="todo">
              <div>
                  <button onClick={SpotifyLogin}>Login</button>
              </div>
              <div className="inicio">

              </div>
              
          </div>
      </>
  )
}


export default SpotifyLogin

