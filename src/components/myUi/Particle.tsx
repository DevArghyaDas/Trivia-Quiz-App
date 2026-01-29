import { type Container, type ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";

import { loadSlim } from "@tsparticles/slim"; // if you are going to

export const Particle = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = {
    key: "mouseFollow",
    name: "Mouse Follow",
    background: {
      color: "#000000",
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["bubble", "connect"],
        },
      },
      modes: {
        bubble: {
          distance: 200,
          duration: 2,
          opacity: 1,
          size: 30,
          color: {
            value: ["#5bc0eb", "#fde74c", "#9bc53d", "#e55934", "#fa7921"],
          },
        },
        connect: {
          distance: 60,
          links: {
            opacity: 0.2,
          },
          radius: 200,
        },
      },
    },
    particles: {
      color: {
        value: "#000000",
      },
      move: {
        direction: "none",
        enable: true,
        speed: 2,
      },
      number: {
        density: {
          enable: true,
        },
        value: 300,
      },
      opacity: {
        value: 0,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          min: 10,
          max: 15,
        },
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 -z-10"
      />
    );
  }

  return <></>;
};
