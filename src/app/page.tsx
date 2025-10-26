"use client"
import React from 'react';
import Particles from 'react-tsparticles';
import { loadStarsPreset } from 'tsparticles-preset-stars';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const particlesInit = useCallback(async (engine: any) => {
    await loadStarsPreset(engine);
  }, []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {mounted && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            preset: 'stars',
            background: {
              color: '#0d1b2a',
            },
          }}
          className="absolute inset-0 z-0"
        />
      )}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1
          className="text-white text-3xl md:text-5xl Exo font-extrabold uppercase text-center mb-8 drop-shadow-lg tracking-wide"
          style={{ fontWeight: 900 }}
        >
          BEM VINDO(A) AO CAJU TO-DO LIST!
        </h1>
        <h3
          className="text-white text-3xl md:text-5xl Exo font-extrabold uppercase text-center mb-8 drop-shadow-lg tracking-wide"
          style={{ fontWeight: 900 }}
        >
          NOSSA LISTA DE AVENTURAS
        </h3>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg cursor-pointer hover:scale-105 hover:shadow-xl"
        >
          Começar Jornada!
        </button>
      </div>
    </div>
  );
};

export default Home;