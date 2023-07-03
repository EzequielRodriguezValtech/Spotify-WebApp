import React from 'react';
import musica from '../images/musica.jpg';
import podcasts from '../images/podcasts.jpg';
import videos from '../images/videos.jpg';
import 'tailwindcss/tailwind.css';
import '../index.css';

const WelcomeMessage: React.FC = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="my-20 mx-5 flex justify-center">
        <h1 className="text-6xl font-bold open-sans text-center text-stone-700 hover:text-lime-600 transition duration-700">
          Welcome to{' '}
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
            <h3 className="font-bold">Music</h3>
            <p className="fontGeologica font-medium">
              Access thousands of tracks at the click of a button. Spotify
              provides access to tracks, albums and playlists from a wide range
              of artists and genres. artists and music genres. It also offers
              the option to download tracks for offline to download tracks for
              offline listening on mobile, allows you to download up to 3,333
              songs to your device.
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
              Listen to your favourite podcasts and discover many more,
              including programmes with music. Explore featured podcasts and
              programmes, and get get recommendations. Save the podcasts and
              programmes you like. like. New episodes will be saved
              automatically. automatically.
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
              Enjoy exclusive music videos, documentaries and video series, all
              from the all from the Spotify app. Scroll to Videos. Explore all
              the videos we have available.
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
  );
};

// CHEQUEAR HOVER SPOTIFY

export default WelcomeMessage;
