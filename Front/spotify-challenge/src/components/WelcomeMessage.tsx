import React from 'react';
import musica from '../images/musica.jpg';
import podcasts from '../images/podcasts.jpg';
import videos from '../images/videos.jpg';
import 'tailwindcss/tailwind.css';
import '../index.css';

const WelcomeMessage: React.FC = () => {
  return (
    <body>
      <main className='flex flex-col justify-center items-center'>
        <div className="my-20 mx-5 flex justify-center">
          <h1 className="text-6xl font-bold open-sans text-center text-stone-700 hover:text-lime-600 transition duration-700">
            Bienvenidos a{' '}
            <b className="underline underline-offset-8 decoration-black text-lime-600 fontCaprasimo hover:text-stone-800 hover:decoration-white transition duration-700">
              Spotify
            </b>
          </h1>
        </div>

        <hr className="separateLine" />

        <div
          title="servicios Spotify"
          className="mainServicesContainer flex flex-wrap flex-col justify-evenly gap-10 text-lg"
        >
          <div
            title="musica"
            className="servicesContainer flex flex-wrap justify-center items-center gap-x-5"
          >
            <div className="basis-1/3 flex flex-col items-center content gap-5">
              <h3 className="font-bold">Musica</h3>
              <p className="fontGeologica font-medium">
                Accede a miles de canciones al alcance de un click. Spotify
                brinda acceso a canciones, álbumes y listas de reproducción de
                una gran variedad de artistas y géneros musicales. también
                ofrece la opción de descargar canciones para poder escucharlas
                offline en móviles, permite descargar hasta 3.333 canciones en
                tu dispositivo.
              </p>
            </div>
            <div className="basis-1/3">
              <img
                src={musica}
                alt="musica"
                className="servicesImages h-68 w-content rounded-md"
              />
            </div>
          </div>

          <hr className="separateLine shadow-md" />

          <div
            title="podcasts"
            className="servicesContainer flex flex-wrap justify-center items-center gap-x-5"
          >
            <div className="basis-1/3">
              <img
                src={podcasts}
                alt="podcasts"
                className="servicesImages h-68 w-content rounded-md"
              />
            </div>
            <div className="basis-1/3 flex flex-col items-center content gap-5">
              <h3 className="font-bold">Podcasts</h3>
              <p className="fontGeologica font-medium">
                Escucha tus podcasts favoritos y descubre muchos más, incluidos
                programas con música. Explora podcasts y programas destacados, y
                recibe recomendaciones. Guarda los podcasts y programas que te
                gusten. Así, los episodios nuevos se guardarán de forma
                automática.
              </p>
            </div>
          </div>

          <hr className="separateLine shadow-md" />

          <div
            title="videos"
            className="servicesContainer flex flex-wrap justify-center items-center gap-x-5"
          >
            <div className="basis-1/3 flex flex-col items-center content gap-5">
              <h3 className="font-bold">Videos</h3>
              <p className="fontGeologica font-medium">
                Disfruta de videos musicales, documentales y series de video
                exclusivas, todo desde la aplicación de Spotify. Desplázate
                hasta Videos. Explora todos los videos que tenemos disponibles.
              </p>
            </div>
            <div className="basis-1/3">
              <img
                src={videos}
                alt="videos"
                className="servicesImages h-68 w-content rounded-md"
              />
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};

// CHEQUEAR HOVER SPOTIFY

export default WelcomeMessage;
