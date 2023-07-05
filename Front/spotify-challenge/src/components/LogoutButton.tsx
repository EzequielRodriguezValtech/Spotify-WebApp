import React  from 'react';
import 'tailwindcss/tailwind.css';

const LogoutButton = () => {
  const LogoutButton = async() =>{
      try {
          window.open('http://localhost:8000/logout', '_self');
      } catch (error) {
          console.log('Error al obtener la URL:', error);
          
      }
  }    
    return (
        <button
          className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={LogoutButton}
        >
          Cerrar sesión
        </button>
      );
};

export default LogoutButton;