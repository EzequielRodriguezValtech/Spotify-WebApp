import React from 'react';
import spotifyLogo from '../images/Spotify_Logo_RGB_White.png';
import instagramLogo from '../images/instagram.png';
import twitterLogo from '../images/twitter.png';
import facebookLogo from '../images/facebook.png';
import 'tailwindcss/tailwind.css';
import '../index.css';

const SpotifyFooter: React.FC = () => {
  return (
    <footer className="bg-black text-slate-100 flex flex-col justify-center w-full grow">
      <div className="mainContainer">
        <div
          title="logoSpotify"
          className="logoContainer "
        >
          <a href="/" className="h-16">
            <img src={spotifyLogo} alt="Spotify" className="h-16" />
          </a>
        </div>

        <div className="row">
          <div className="linksContainer flex-2 basis-1/2 space-y-4 flex flex-col justify-center">
            <h4 className="text-zinc-700 font-bold">COMPAÑÍA</h4>
            <p>
              <a
                href="https://github.com/EzequielRodriguezValtech/Spotify-WebApp"
                className="hover:text-emerald-600 font-semibold"
              >
                Acerca de
              </a>
            </p>
            <p>
              <a href="/" className="hover:text-emerald-600 font-semibold">
                Empleo
              </a>
            </p>
            <p>
              <a href="/" className="hover:text-emerald-600 font-semibold">
                For the Record
              </a>
            </p>
          </div>
          <div className="linksContainer flex-2 basis-1/2 space-y-2 flex flex-col align-baseline justify-center">
            <h4 className="text-zinc-700 font-bold">COMUNIDADES</h4>
            <p>
              <a href="/" className="hover:text-emerald-600 font-semibold">
                Para artistas
              </a>
            </p>
            <p>
              <a href="/" className="hover:text-emerald-600 font-semibold">
                Desarrolladores
              </a>
            </p>
            <p>
              <a href="/" className="hover:text-emerald-600 font-semibold">
                Publicidad
              </a>
            </p>
            <p>
              <a href="/" className="hover:text-emerald-600 font-semibold">
                Spotify for Work
              </a>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="linksContainer flex-2 basis-1/2 space-y-4 flex flex-col">
            <h4 className="text-zinc-700 font-bold">ENLACES ÚTILES</h4>
            <p>
              <a
                href="https://support.spotify.com/ar/?_gl=1*1fqcc9c*_gcl_au*NDk2ODE0NjA5LjE2ODYyNTQyOTY."
                className="hover:text-emerald-600 font-semibold"
              >
                Ayuda
              </a>
            </p>
            <p>
              <a
                href="https://open.spotify.com/?_gl=1*1fqcc9c*_gcl_au*NDk2ODE0NjA5LjE2ODYyNTQyOTY."
                className="hover:text-emerald-600 font-semibold"
              >
                Reproductor Web
              </a>
            </p>
            <p>
              <a
                href="https://www.spotify.com/ar/download/windows/."
                className="hover:text-emerald-600 font-semibold"
              >
                App gratis
              </a>
            </p>
          </div>
          <div className="linksContainer socialMediaLogo flex-2 basis-1/2 flex">
            <a
              href="https://www.instagram.com/spotify/"
              className="hover:text-emerald-600"
            >
              <img
                src={instagramLogo}
                alt="instagram"
                className="bg-white rounded-full h-10 m-2"
              />
            </a>
            <a
              href="https://twitter.com/spotify"
              className="hover:text-emerald-600"
            >
              <img
                src={twitterLogo}
                alt="twitter"
                className="bg-white rounded-full h-10 m-2"
              />
            </a>
            <a
              href="https://www.facebook.com/Spotify"
              className="hover:text-emerald-600"
            >
              <img
                src={facebookLogo}
                alt="facebook"
                className="bg-white rounded-full h-10 m-2"
              />
            </a>
          </div>
        </div>
      </div>
      <div
        title="legales"
        className="legalContainer flex flex-row justify-between m-5 text-zinc-700"
      >
        {' '}
        {/* CONTENEDOR LEGALES */}
        <div className='flex flex-wrap w-1/2 gap-x-10 items-center'>
          <p className="hover:text-emerald-600"><a href="/">Legal</a></p>
          <p className="hover:text-emerald-600"><a href="/">Centro de privacidad</a></p>
          <p className="hover:text-emerald-600"><a href="/">Política de Privacidad</a></p>
          <p className="hover:text-emerald-600"><a href="/">Accesibilidad</a></p>
        </div>

        <div>
            <p>© 2023 Spotify WebApp</p>
            <p>Victoria Nadia Gonzalez</p>
            <p>Ezequiel Matias Rodriguez</p>
        </div>
      </div>
    </footer>
  );
};

// CHEQUEAR RESPONSIVE

export default SpotifyFooter;
